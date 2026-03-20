document.addEventListener("DOMContentLoaded", () => {
    const svg = d3.select("svg")
        .attr("width", 600)
        .attr("height", 600);

    const form = document.getElementById("setting");

    function clearSVG() {
        svg.selectAll("*").remove();
    }

    document.getElementById("clearBtn").onclick = clearSVG;

    document.getElementById("animateBtn").onclick = () => {
        clearSVG();

        const dur = +form.duration.value || 10000;

        const sx1 = +form.sx_start.value || 1;
        const sy1 = +form.sy_start.value || 1;
        const sx2 = +form.sx_end.value || 1;
        const sy2 = +form.sy_end.value || 1;
        const rot1 = +form.rot_start.value || 0;
        const rot2 = +form.rot_end.value || 0;

        const g = drawShuriken(svg);

        const path = drawPath();

        g.transition()
            .duration(dur)
            .ease(d3.easeLinear)
            .attrTween("transform", translateAlong(path.node(), sx1, sy1, sx2, sy2, rot1, rot2))
            .on("end", () => path.remove());
    };
});