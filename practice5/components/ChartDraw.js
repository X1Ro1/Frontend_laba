import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

const ChartDraw = (props) => {
    const chartRef = useRef(null);
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        if (!props.data || props.data.length === 0 || (!props.oy[0] && !props.oy[1])) {
            svg.selectAll("*").remove();
            svg.append("rect")
                .attr("x", margin.left)
                .attr("y", margin.top)
                .attr("width", boundsWidth)
                .attr("height", boundsHeight)
                .style("fill", "lightgrey");
            return;
        }
        setWidth(parseFloat(svg.style('width')));
        setHeight(parseFloat(svg.style('height')));
    });

    const margin = { 
        top: 10, 
        bottom: 60, 
        left: 60, 
        right: 10 
    };
    const boundsWidth = width - margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

    useEffect(() => {
        if (!props.data || props.data.length === 0) return;
        if (!props.oy[0] && !props.oy[1]) return;

        const activeIndexes = [];
        if (props.oy[0]) activeIndexes.push(1);
        if (props.oy[1]) activeIndexes.push(0);

        let allValues = [];
        props.data.forEach(d => {
            activeIndexes.forEach(idx => allValues.push(d.values[idx]));
        });
        const [minVal, maxVal] = d3.extent(allValues);

        const scaleX = d3.scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0, boundsWidth])
            .padding(0.2);

        const scaleY = d3.scaleLinear()
            .domain([minVal * 0.85, maxVal * 1.1])
            .range([boundsHeight, 0]);

        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();

        svg.append("rect")
            .attr("x", margin.left)
            .attr("y", margin.top)
            .attr("width", boundsWidth)
            .attr("height", boundsHeight)
            .style("fill", "lightgrey");

        const xAxis = d3.axisBottom(scaleX);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY).tickFormat(d => {
            const mins = Math.floor(d / 60);
            const secs = d % 60;
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        });
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);

        const chartGroup = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const colors = ["red", "blue"];

        if (props.chartType === "histogram") {
            activeIndexes.forEach((oyIndex, seriesIdx) => {
                chartGroup.selectAll(`.bar-${oyIndex}`)
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("x", d => {
                        const baseX = scaleX(d.labelX);
                        const barWidth = scaleX.bandwidth() / activeIndexes.length;
                        return baseX + seriesIdx * barWidth;
                    })
                    .attr("y", d => scaleY(d.values[oyIndex]))
                    .attr("width", scaleX.bandwidth() / activeIndexes.length)
                    .attr("height", d => boundsHeight - scaleY(d.values[oyIndex]))
                    .style("fill", colors[seriesIdx % colors.length]);
            });
        } else {
            activeIndexes.forEach((oyIndex, seriesIdx) => {
                chartGroup.selectAll(`.dot-${oyIndex}`)
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.values[oyIndex]))
                    .style("fill", colors[seriesIdx % colors.length]);
            });
        }
    }, [props.data, props.oy, props.chartType, boundsWidth, boundsHeight, height, margin]);

    return (
        <svg ref={chartRef}></svg>
    );
};

export default ChartDraw;