document.addEventListener("DOMContentLoaded", function() {
  showTable('build', buildings);

  drawCustomGraph("Страна", ["Максимальная высота"], "Точечная", buildings);

  const yCheckboxes = document.querySelectorAll('input[name="yValues"]');
  yCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const anyChecked = Array.from(yCheckboxes).some(cb => cb.checked);
      if (anyChecked) {
        hideErrorMessage();
      }
    });
  });

  const toggleBtn = document.getElementById("toggleTable");
  let tableVisible = true;

  toggleBtn.addEventListener("click", function() {
    const table = d3.select("#build");
    if (tableVisible) {
      table.selectAll("tr").remove();
      toggleBtn.textContent = "Показать таблицу";
      tableVisible = false;
    } else {
      showTable('build', buildings);
      toggleBtn.textContent = "Скрыть таблицу";
      tableVisible = true;
    }
  });

  //кнопка Построить
  const buildBtn = document.getElementById("buildGraph");
  buildBtn.addEventListener("click", function() {
    const xRadios = document.querySelectorAll('input[name="xAxis"]');
    let keyX = "";
    xRadios.forEach(r => { if (r.checked) keyX = r.value; });

    const yChecks = document.querySelectorAll('input[name="yValues"]');
    let selectedY = [];
    yChecks.forEach(c => { if (c.checked) selectedY.push(c.value); });

    const chartType = document.getElementById("chartType").value;

    drawCustomGraph(keyX, selectedY, chartType, buildings);
  });
});