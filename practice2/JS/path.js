function createLemniscatePoints() {
    const svg = d3.select("svg");
    const w = +svg.attr("width");
    const h = +svg.attr("height");
    const cx = w / 2;
    const cy = h / 2;
    const a = Math.min(w, h) * 0.30;

    let points = [];

    for (let i = 0; i <= 400; i++) {
        let t = (-i * 2 * Math.PI / 400) - Math.PI / 2 - 0.3;  //смещение -18 град. для старта
        let sinT = Math.sin(t);
        let cosT = Math.cos(t);
        let denom = 1 + sinT * sinT;

        let x = cx + a * cosT / denom;
        let y = cy + a * sinT * cosT / denom;

        points.push({x, y});
    }
    return points;
}

function drawPath() {
    const points = createLemniscatePoints();
    const line = d3.line().x(d => d.x).y(d => d.y);

    return d3.select("svg")
        .append("path")
        .attr("d", line(points))
        .attr("fill", "none")
        .attr("stroke", "#4682b4")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5 5");
}

function translateAlong(pathNode, sx1, sy1, sx2, sy2, rot1, rot2) {
    const length = pathNode.getTotalLength();
    return function() {
        return function(t) {
            const p = pathNode.getPointAtLength(t * length);
            const sx  = sx1 + (sx2 - sx1) * t;
            const sy  = sy1 + (sy2 - sy1) * t;
            const rot = rot1 + (rot2 - rot1) * t;
            return `translate(${p.x},${p.y}) scale(${sx},${sy}) rotate(${rot})`;
        };
    };
}