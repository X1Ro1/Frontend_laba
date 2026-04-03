function createArrGraph(data, key) {   
    groupObj = d3.group(data, d => d[key]); 
    let arrGraph =[]; 
    for(let entry of groupObj) { 
        let minMax = d3.extent(entry[1].map(d => d['Высота'])); 
        arrGraph.push({labelX : entry[0], values : minMax}); 
     } 
     return arrGraph; 
} 

function drawGraph(data) { 
    const keyX = "Страна";  
    const arrGraph = createArrGraph(data, keyX); 
    let svg = d3.select("svg");   
    svg.selectAll('*').remove(); 
 
    const attr_area = { 
        width: parseFloat(svg.style('width')), 
        height: parseFloat(svg.style('height')), 
        marginX: 50, 
        marginY: 50 
    }; 
        
    const [scX, scY] = createAxis(svg, arrGraph, attr_area); 
    createChart(svg, arrGraph, scX, scY, attr_area, "red");         
} 

function createAxis(svg, data, attr_area){ 
    const [min, max] = d3.extent(data.map(d => d.values[1])); 
    const scaleX = d3.scaleBand() 
                    .domain(data.map(d => d.labelX)) 
                    .range([0, attr_area.width - 2 * attr_area.marginX]); 
                     
    const scaleY = d3.scaleLinear() 
                    .domain([min * 0.85, max * 1.1 ]) 
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

function createChart(svg, data, scaleX, scaleY, attr_area, color) { 
    const r = 4; 
    svg.selectAll(".dot") 
       .data(data) 
       .enter() 
       .append("circle") 
       .attr("r", r) 
       .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2) 
       .attr("cy", d => scaleY(d.values[1])) 
       .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`) 
       .style("fill", color); 
} 


function prepareGraphData(data, keyX, showMin, showMax) {
  const groupObj = d3.group(data, d => d[keyX]);
  let arrGraph = [];
  for (let entry of groupObj) {
    let heights = entry[1].map(d => Number(d['Высота']));
    let obj = { labelX: entry[0] };
    if (showMin) obj.min = d3.min(heights);
    if (showMax) obj.max = d3.max(heights);
    arrGraph.push(obj);
  }
  if (keyX === "Год") {
    arrGraph.sort((a, b) => a.labelX - b.labelX);
  }
  return arrGraph;
}


function createAxisGeneral(svg, data, attr_area, hasMin, hasMax) {
  let allHeights = [];
  data.forEach(d => {
    if (hasMin && d.min !== undefined) allHeights.push(d.min);
    if (hasMax && d.max !== undefined) allHeights.push(d.max);
  });
  const [min, max] = d3.extent(allHeights);

  const scaleX = d3.scaleBand()
    .domain(data.map(d => d.labelX))
    .range([0, attr_area.width - 2 * attr_area.marginX]);

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

// Точечная диаграмма
function createScatter(svg, data, scaleX, scaleY, attr_area) {
  const r = 4;
  data.forEach(d => {
    const x = scaleX(d.labelX) + scaleX.bandwidth() / 2;
    const trans = `translate(${attr_area.marginX}, ${attr_area.marginY})`;
    if (d.max !== undefined) {
      svg.append("circle")
        .attr("r", r)
        .attr("cx", x)
        .attr("cy", scaleY(d.max))
        .attr("transform", trans)
        .style("fill", "red");
    }
    if (d.min !== undefined) {
      svg.append("circle")
        .attr("r", r)
        .attr("cx", x)
        .attr("cy", scaleY(d.min))
        .attr("transform", trans)
        .style("fill", "blue");
    }
  });
}

// Гистограмма
function createHistogram(svg, data, scaleX, scaleY, attr_area) {
  const hasMin = data[0] && 'min' in data[0];
  const hasMax = data[0] && 'max' in data[0];
  const numSeries = (hasMin ? 1 : 0) + (hasMax ? 1 : 0);
  if (numSeries === 0) return;

  const barPadding = 2;
  const barWidth = (scaleX.bandwidth() / numSeries) - barPadding;

  data.forEach(d => {
    let currentOffset = 0;

    if (hasMin) {
      const yPos = scaleY(d.min);
      const barHeight = attr_area.height - 2 * attr_area.marginY - yPos;
      svg.append("rect")
        .attr("x", attr_area.marginX + scaleX(d.labelX) + currentOffset)
        .attr("y", attr_area.marginY + yPos)
        .attr("width", barWidth)
        .attr("height", barHeight)
        .style("fill", "blue");
      currentOffset += barWidth + barPadding;
    }

    if (hasMax) {
      const yPos = scaleY(d.max);
      const barHeight = attr_area.height - 2 * attr_area.marginY - yPos;
      svg.append("rect")
        .attr("x", attr_area.marginX + scaleX(d.labelX) + currentOffset)
        .attr("y", attr_area.marginY + yPos)
        .attr("width", barWidth)
        .attr("height", barHeight)
        .style("fill", "red");
    }
  });
}


function drawCustomGraph(keyX, yValues, chartType, data) {
  
  const showMin = yValues.includes("Минимальная высота");
  const showMax = yValues.includes("Максимальная высота");

  if (!showMin && !showMax) {
    showErrorMessage("Не выбрано ни одного знач. по OY!");
    return;
  }
  hideErrorMessage();

  const graphData = prepareGraphData(data, keyX, showMin, showMax);
  let svg = d3.select("svg");
  svg.selectAll('*').remove();

  const attr_area = {
    width: parseFloat(svg.style('width')),
    height: parseFloat(svg.style('height')),
    marginX: 50,
    marginY: 50
  };

  const [scX, scY] = createAxisGeneral(svg, graphData, attr_area, showMin, showMax);

  if (chartType === "Точечная") {
    createScatter(svg, graphData, scX, scY, attr_area);
  } else if (chartType === "Гистограмма") {
    createHistogram(svg, graphData, scX, scY, attr_area);
  }
}

function showErrorMessage(text) {
  d3.select("#errorMessage").remove();

  d3.select("form#graphForm")
    .append("p")
    .attr("id", "errorMessage")
    .style("color", "red")
    .style("margin-top", "15px")
    .text(text);
}

function hideErrorMessage() {
  d3.select("#errorMessage").remove();
}