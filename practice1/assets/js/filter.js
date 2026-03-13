const correspond = {
    "Название": "structure",
    "Тип": "category",
    "Жанр": "genre",
    "Студия": "studio",
    "Страна издатель": "country",
    "Год выпуска": ["yearFrom", "yearTo"],
    "Количество серий": ["episodesFrom", "episodesTo"]
};

const dataFilter = (dataForm) => {
    let dictFilter = {};
    for (const item of dataForm.elements) {
        if (!item.id) continue;
        let valInput = item.value.trim();

        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        } else if (item.type === "number") {
            if (valInput !== "") {
                valInput = parseFloat(valInput);
            } else {
                valInput = item.id.includes("From") ? -Infinity : Infinity;
            }
        }

        dictFilter[item.id] = valInput;
    }
    return dictFilter;
};

const filterTable = (data, idTable, dataForm) => {
    const datafilter = dataFilter(dataForm);

    console.log('Фильтры:', datafilter);

    let tableFilter = data.filter(item => {
        let result = true;
   
        for (const [key, val] of Object.entries(item)) {
            const filterKey = correspond[key];
            if (!filterKey) continue;

            if (Array.isArray(filterKey)) {
                const [fromId, toId] = filterKey;
                const fromVal = datafilter[fromId];
                const toVal = datafilter[toId];

                if (fromVal === '' && toVal === '') continue;

                if (fromVal !== '' && val < parseFloat(fromVal)) {
                    result = false;
                    break;
                }
                if (toVal !== '' && val > parseFloat(toVal)) {
                    result = false;
                    break;
                }
            } 

            else {
                const filterValue = datafilter[filterKey];
                if (!filterValue) continue;
                
                // if (typeof val === 'string') {
                //     if (!val.toLowerCase().includes(filterValue.toLowerCase())) {
                //         result = false;
                //         break;
                //     }
                // }
            }
        }
        return result;
    });

    console.log('Отфильтровано записей:', tableFilter.length);
    
    clearTable(idTable);
    createTable(tableFilter, idTable);
    return tableFilter;
};

const clearFilter = (idTable, originalData, dataForm) => {
    dataForm.reset();
    clearTable(idTable);
    createTable(originalData, idTable);

    const sortForm = document.getElementById("sort");
    if (sortForm && buildings) {
        setSortSelects(buildings, sortForm);
    }
};


document.addEventListener("DOMContentLoaded", () => {
    const filterForm = document.getElementById("filter");
    if (!filterForm) return;

    const buttons = filterForm.getElementsByTagName('input');
    for (let btn of buttons) {
        if (btn.value === "Найти") {
            btn.addEventListener("click", () => {
                const filtered = filterTable(buildings, "list", filterForm);
                window.currentFilteredData = filtered;
            });
        }
        if (btn.value === "Очистить фильтры") {
            btn.addEventListener("click", () => {
                clearFilter("list", buildings, filterForm);
                window.currentFilteredData = buildings;
            });
        }
    }
});