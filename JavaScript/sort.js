const createSortArr = (data) => {
    let sortArr = [];
    const sortSelects = data.getElementsByTagName('select');
    for (const item of sortSelects) {
        const keySort = parseInt(item.value);
        if (keySort === 0) break;

        const desc = document.getElementById(item.id + 'Desc').checked;
        sortArr.push({ column: keySort - 1, direction: desc });
    }
    return sortArr;
};


const sortTable = (idTable, formData) => {
    const sortArr = createSortArr(formData);
    if (sortArr.length === 0) return;

    const table = document.getElementById(idTable);
    let rows = Array.from(table.rows).slice(1);

    rows.sort((a, b) => {
        for (let {column, direction} of sortArr) {
            let valA = a.cells[column].textContent.trim();
            let valB = b.cells[column].textContent.trim();

            let comparison = 0;

            if (column === 4 || column === 5) {
                comparison = parseFloat(valA) - parseFloat(valB);
            } else {
                comparison = valA.localeCompare(valB, 'ru');
            }

            if (comparison !== 0) {
                return direction ? -comparison : comparison;
            }
        }
        return 0;
    });

    const tbody = table.querySelector('tbody') || document.createElement('tbody');
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    if (!table.querySelector('tbody')) table.appendChild(tbody);
};


const sortForm = document.getElementById("sort");
sortForm.querySelector('input[value="Сортировать"]').addEventListener("click", () => {
    sortTable("list", sortForm);
});


sortForm.querySelector('input[value="Сбросить сортировку"]').addEventListener("click", () => {
    const selects = sortForm.getElementsByTagName('select');
    for (let select of selects) {
        select.selectedIndex = 0;
    }
 
    const checkboxes = sortForm.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    setSortSelects(buildings[0], sortForm);
    createTable(buildings, "list");
});