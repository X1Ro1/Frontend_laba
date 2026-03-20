function drawShuriken(svg) {
    let g = svg.append("g")
        .attr("transform", "translate(0,0)")
        .style("stroke", "#111")
        .style("stroke-width", 2.5)
        .style("fill", "none");

    const points = [];
    for (let i = 0; i < 8; i++) {
        const angle = (i * 45 + 22.5) * Math.PI / 180;  // 22.5 градуса
        const rOuter = (i % 2 === 0) ? 75 : 28; // чередование точек
        const x = rOuter * Math.cos(angle);
        const y = rOuter * Math.sin(angle);
        points.push({x, y});
    }

    //многоугольник
    const starPath = "M" + points.map(p => `${p.x},${p.y}`).join(" L ") + " Z";

    g.append("path")
        .attr("d", starPath)
        .style("fill", "#1a1a1a")
        .style("stroke", "#0d0d0d")
        .style("stroke-linejoin", "round");

    //грани
    g.append("path")
        .attr("d", starPath)
        .style("fill", "none")
        .style("stroke", "#444")
        .style("stroke-width", 1.5)
        .style("opacity", 0.6);

    //центральное отверстие
    g.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 12)
        .style("fill", "#000")
        .style("stroke", "#222")
        .style("stroke-width", 1);

    //внутренняя фигня
    g.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 14)
        .style("fill", "none")
        .style("stroke", "#333")
        .style("stroke-width", 2);

    return g;
}