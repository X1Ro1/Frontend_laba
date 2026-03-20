document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;
    d3.select("svg")
        .attr("width", width)
        .attr("height", height);

    const form = document.getElementById("setting");

    //обновление видимости блоков
    function updateForm() {
        const animChecked = document.getElementById("animationCheck").checked;
        const pathChecked = document.getElementById("pathCheck").checked;


        document.getElementById("drawBtn").style.display = (!animChecked && !pathChecked) ? "inline-block" : "none";
        document.getElementById("animateBtn").style.display = (animChecked || pathChecked) ? "inline-block" : "none";


        document.getElementById("animation-block").style.display = (animChecked && !pathChecked) ? "block" : "none";
        document.getElementById("path-block").style.display = pathChecked ? "block" : "none";
        document.getElementById("coords-block").style.display = !pathChecked ? "block" : "none";
        document.getElementById("scale-block").style.display = !pathChecked ? "block" : "none";
        document.getElementById("rotate-block").style.display = !pathChecked ? "block" : "none";
    }

    document.getElementById("animationCheck").addEventListener("change", updateForm);
    document.getElementById("pathCheck").addEventListener("change", updateForm);
    updateForm(); //начальное состояние

    //функция простого рисования
    const draw = (dataForm) => {
        const svg = d3.select("svg");
        let pict = drawSmile(svg);

        const tx = dataForm.cx.value;
        const ty = dataForm.cy.value;
        const sx = dataForm.sx.value;
        const sy = dataForm.sy.value;
        const rot = dataForm.rotate.value;

        const transformStr = `translate(${tx}, ${ty}) scale(${sx}, ${sy}) rotate(${rot})`;
        pict.attr("transform", transformStr);
    };

    //функция анимации
    const runAnimation = (dataForm) => {
        const svg = d3.select("svg");
        let pict = drawSmile(svg);
        const isPath = document.getElementById("pathCheck").checked;

        if (!isPath) {
            //обычная анимация
            const tx = +dataForm.cx.value;
            const ty = +dataForm.cy.value;
            const sx = +dataForm.sx.value;
            const sy = +dataForm.sy.value;
            const rot = +dataForm.rotate.value;

            const tx_f = +dataForm.cx_finish.value;
            const ty_f = +dataForm.cy_finish.value;
            const sx_f = +dataForm.sx_finish.value;
            const sy_f = +dataForm.sy_finish.value;
            const rot_f = +dataForm.rotate_finish.value;

            const startTransform = `translate(${tx}, ${ty}) scale(${sx}, ${sy}) rotate(${rot})`;
            const endTransform = `translate(${tx_f}, ${ty_f}) scale(${sx_f}, ${sy_f}) rotate(${rot_f})`;

            const easeType = document.getElementById("easeSelect").value;
            let easeFunc;
            
            switch (easeType) {
                case "linear": 
                    easeFunc = d3.easeLinear; 
                    break;
                case "elastic": 
                    easeFunc = d3.easeElastic; 
                    break;
                case "bounce": 
                    easeFunc = d3.easeBounce; 
                    break;
                default: 
                    easeFunc = d3.easeLinear;
            }

            pict.attr("transform", startTransform)
                .transition()
                .duration(6000)
                .ease(easeFunc)
                .attr("transform", endTransform);
        } else {
            //анимация вдоль пути
            const pathType = document.getElementById("pathSelect").value;
            let pathEl = drawPath(pathType);

            pict.transition()
                .ease(d3.easeLinear)
                .duration(6000)
                .attrTween("transform", translateAlong(pathEl.node()));
        }
    };

    //обработчики кнопок
    document.getElementById("drawBtn").addEventListener("click", () => {
        draw(form);
    });

    document.getElementById("animateBtn").addEventListener("click", () => {
        runAnimation(form);
    });

    document.getElementById("pathBtn").addEventListener("click", () => {
        runAnimation(form);
    });

    document.getElementById("clearBtn").addEventListener("click", () => {
        d3.select("svg").selectAll("*").remove();
    });
});