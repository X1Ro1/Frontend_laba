function prepareGraphData(data, keyX, selectedY) {
    const groupObj = d3.group(data, d => d[keyX]);
    let arrGraph = [];
    
    for (let entry of groupObj) {
        let obj = { labelX: entry[0] };
        
        if (selectedY.includes("min_time")) {
            let values = entry[1].map(d => d.min_time);
            obj.min = d3.min(values);
        }
        if (selectedY.includes("max_time")) {
            let values = entry[1].map(d => d.max_time);
            obj.max = d3.max(values);
        }
        if (selectedY.includes("rating")) {
            let values = entry[1].map(d => d.rating);
            obj.mean = d3.mean(values);
        }
        
        arrGraph.push(obj);
    }
    
    if (keyX === "Год") {
        arrGraph.sort((a, b) => +a.labelX - +b.labelX);
    }
    
    return arrGraph;
}

// Создание осей
function createAxisGeneral(svg, data, attr_area, selectedY) {
    let allValues = [];
    data.forEach(d => {
        if (selectedY.includes("min_time") && d.min !== undefined) {
            allValues.push(d.min);
        }
        if (selectedY.includes("max_time") && d.max !== undefined) {
            allValues.push(d.max);
        }
        if (selectedY.includes("rating") && d.mean !== undefined) {
            allValues.push(d.mean);
        }
    });
    
    const [min, max] = d3.extent(allValues);
    
    const scaleX = d3.scaleBand()
        .domain(data.map(d => d.labelX))
        .range([0, attr_area.width - 2 * attr_area.marginX])
        .padding(0.3);
    
    const scaleY = d3.scaleLinear()
        .domain([min * 0.85, max * 1.1])
        .range([attr_area.height - 2 * attr_area.marginY, 0]);
    
    const axisX = d3.axisBottom(scaleX);
    const axisY = d3.axisLeft(scaleY);
    
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");
    
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);
    
    return [scaleX, scaleY];
}

//точечная диаграмма
function createScatter(svg, data, scaleX, scaleY, attr_area, selectedY) {
    const r = 4;
    data.forEach(d => {
        const x = scaleX(d.labelX) + scaleX.bandwidth() / 2;
        const trans = `translate(${attr_area.marginX}, ${attr_area.marginY})`;
        
        if (selectedY.includes("min_time") && d.min !== undefined) {
            svg.append("circle")
                .attr("r", r)
                .attr("cx", x)
                .attr("cy", scaleY(d.min))
                .attr("transform", trans)
                .style("fill", "#457b9d");
        }
        if (selectedY.includes("max_time") && d.max !== undefined) {
            svg.append("circle")
                .attr("r", r)
                .attr("cx", x)
                .attr("cy", scaleY(d.max))
                .attr("transform", trans)
                .style("fill", "#e63939");
        }
        if (selectedY.includes("rating") && d.mean !== undefined) {
            svg.append("circle")
                .attr("r", r)
                .attr("cx", x)
                .attr("cy", scaleY(d.mean))
                .attr("transform", trans)
                .style("fill", "#2a9d8f");
        }
    });
}

//гистограмма
function createHistogram(svg, data, scaleX, scaleY, attr_area, selectedY) {
    const showValues = [];
    if (selectedY.includes("min_time")) showValues.push({key: "min", color: "#457b9d"});
    if (selectedY.includes("max_time")) showValues.push({key: "max", color: "#e63939"});
    if (selectedY.includes("rating")) showValues.push({key: "mean", color: "#2a9d8f"});
    
    if (showValues.length === 0) return;
    
    const barPadding = 2;
    const barWidth = (scaleX.bandwidth() / showValues.length) - barPadding;
    
    data.forEach(d => {
        let currentOffset = 0;
        
        showValues.forEach(val => {
            const yValue = d[val.key];
            if (yValue !== undefined) {
                const yPos = scaleY(yValue);
                const barHeight = attr_area.height - 2 * attr_area.marginY - yPos;
                svg.append("rect")
                    .attr("x", attr_area.marginX + scaleX(d.labelX) + currentOffset)
                    .attr("y", attr_area.marginY + yPos)
                    .attr("width", barWidth)
                    .attr("height", barHeight)
                    .style("fill", val.color);
            }
            currentOffset += barWidth + barPadding;
        });
    });
}

//график
function createLineChart(svg, data, scaleX, scaleY, attr_area, selectedY) {
    const showValues = [];
    if (selectedY.includes("min_time")) showValues.push({key: "min", color: "#457b9d"});
    if (selectedY.includes("max_time")) showValues.push({key: "max", color: "#e63939"});
    if (selectedY.includes("rating")) showValues.push({key: "mean", color: "#2a9d8f"});
    
    showValues.forEach(val => {
        const lineData = data.filter(d => d[val.key] !== undefined);
        
        const lineGenerator = d3.line()
            .x(d => attr_area.marginX + scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .y(d => attr_area.marginY + scaleY(d[val.key]));
        
        svg.append("path")
            .datum(lineData)
            .attr("fill", "none")
            .attr("stroke", val.color)
            .attr("stroke-width", 3)
            .attr("d", lineGenerator);
        
        lineData.forEach(d => {
            svg.append("circle")
                .attr("r", 4)
                .attr("cx", attr_area.marginX + scaleX(d.labelX) + scaleX.bandwidth() / 2)
                .attr("cy", attr_area.marginY + scaleY(d[val.key]))
                .style("fill", val.color);
        });
    });
}


function drawCustomGraph(keyX, selectedY, chartType, data) {
    if (selectedY.length === 0) {
        showErrorMessage("Не выбрано ни одного значения по OY");
        return;
    }
    hideErrorMessage();
    
    const graphData = prepareGraphData(data, keyX, selectedY);
    let svg = d3.select("#chart");
    svg.selectAll('*').remove();
    
    const attr_area = {
        width: parseFloat(svg.attr('width')),
        height: parseFloat(svg.attr('height')),
        marginX: 70,
        marginY: 50
    };
    
    const [scX, scY] = createAxisGeneral(svg, graphData, attr_area, selectedY);
    
    if (chartType === "scatter") {
        createScatter(svg, graphData, scX, scY, attr_area, selectedY);
    } else if (chartType === "bar") {
        createHistogram(svg, graphData, scX, scY, attr_area, selectedY);
    } else if (chartType === "line") {
        createLineChart(svg, graphData, scX, scY, attr_area, selectedY);
    }
}

function showErrorMessage(text) {
    d3.select("#errorMessage").remove();
    
    d3.select("#graphForm")
        .append("p")
        .attr("id", "errorMessage")
        .style("color", "red")
        .style("margin-top", "15px")
        .text(text);
}

function hideErrorMessage() {
    d3.select("#errorMessage").remove();
}