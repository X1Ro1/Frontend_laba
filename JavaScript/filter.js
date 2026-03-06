const correspond = {
    "Название": "structure",
    "Тип": "category",
    "Страна": "country",
    "Город": "city",
    "Год": ["yearFrom", "yearTo"],
    "Высота": ["heightFrom", "heightTo"]
};

const dataFilter = (dataForm) => {
    let dictFilter = {};
    
    for (const item of dataForm.elements) {
        if (!item.id) continue;
        
        let valInput = item.value;
        
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
    
    let tableFilter = data.filter(item => {
        let result = true;
        
        for (const [key, val] of Object.entries(item)) {
            const filterKey = correspond[key];
            if (!filterKey) continue;
            
            if (Array.isArray(filterKey)) {
                const [fromId, toId] = filterKey;
                const fromVal = datafilter[fromId];
                const toVal = datafilter[toId];
                
                if (val < fromVal || val > toVal) {
                    result = false;
                    break;
                }
            } else if (typeof val === 'string') {
                if (datafilter[filterKey] && !val.toLowerCase().includes(datafilter[filterKey])) {
                    result = false;
                    break;
                }
            }
        }
        return result;
    });
    
    clearTable(idTable);
    createTable(tableFilter, idTable);
};

const clearFilter = (idTable, originalData, dataForm) => {
    dataForm.reset();
    clearTable(idTable);
    createTable(originalData, idTable);
    
    setSortSelects(originalData[0], document.getElementById("sort"));
};

const filterForm = document.getElementById("filter");
filterForm.querySelector('input[value="Найти"]').addEventListener("click", () => {
    filterTable(buildings, "list", filterForm);
    setSortSelects(buildings[0], document.getElementById("sort"));
});


filterForm.querySelector('input[value="Очистить фильтры"]').addEventListener("click", () => {
    clearFilter("list", buildings, filterForm);
});