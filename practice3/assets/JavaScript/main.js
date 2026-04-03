document.addEventListener("DOMContentLoaded", function() {
    showAnimeTable(animeData);

    drawCustomGraph("Год", ["max_time"], "scatter", animeData);
    
    const yCheckboxes = document.querySelectorAll('input[name="yAxis"]');
    yCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const anyChecked = Array.from(yCheckboxes).some(cb => cb.checked);
            if (anyChecked) {
                hideErrorMessage();
            }
        });
    });
    
    //кнопка построить
    const buildBtn = document.getElementById("buildGraph");
    buildBtn.addEventListener("click", function() {
        const xRadios = document.querySelectorAll('input[name="xAxis"]');
        let keyX = "";
        xRadios.forEach(r => { if (r.checked) keyX = r.value; });
        
        const yChecks = document.querySelectorAll('input[name="yAxis"]');
        let selectedY = [];
        yChecks.forEach(c => { if (c.checked) selectedY.push(c.value); });
        
        const chartType = document.getElementById("chartType").value;
        
        drawCustomGraph(keyX, selectedY, chartType, animeData);
    });
});