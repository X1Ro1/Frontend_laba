const createSortArr = (data) => {
    let sortArr = [];
    const sortSelects = data.getElementsByTagName('select');
    
    for (const item of sortSelects) {
        const keySort = parseInt(item.value);
        if (keySort === 0) continue;

        const descId = item.id + 'Desc';
        const descCheckbox = document.getElementById(descId);
        const direction = descCheckbox ? descCheckbox.checked : false;
        
        sortArr.push({ column: keySort - 1, direction: direction });
    }
    return sortArr;
};

const sortTable = (idTable, formData) => {
    const sortArr = createSortArr(formData);
    if (sortArr.length === 0) {
        alert('Выберите поле для сортировки');
        return;
    }

    const table = document.getElementById(idTable);
    if (!table) return;

    let dataToSort;
    if (window.currentFilteredData) {
        dataToSort = [...window.currentFilteredData];
    } else {
        dataToSort = [];
        const rows = Array.from(table.rows).slice(1);
        const headers = Object.keys(buildings[0]);
        
        rows.forEach(row => {
            let item = {};
            Array.from(row.cells).forEach((cell, index) => {
                item[headers[index]] = cell.textContent;
            });
            dataToSort.push(item);
        });
    }

    dataToSort.sort((a, b) => {
        const aValues = Object.values(a);
        const bValues = Object.values(b);
        
        for (let {column, direction} of sortArr) {
            let valA = aValues[column];
            let valB = bValues[column];

            let comparison = 0;

            if (column === 4 || column === 6) {
                valA = parseFloat(valA) || 0;
                valB = parseFloat(valB) || 0;
                comparison = valA - valB;
            } else {
                valA = String(valA).toLowerCase();
                valB = String(valB).toLowerCase();
                comparison = valA.localeCompare(valB, 'ru');
            }

            if (comparison !== 0) {
                return direction ? -comparison : comparison;
            }
        }
        return 0;
    });

    createTable(dataToSort, idTable);
};

document.addEventListener("DOMContentLoaded", () => {
    const sortForm = document.getElementById("sort");
    if (!sortForm) return;

    const fieldsFirst = document.getElementById('fieldsFirst');
    const fieldsSecond = document.getElementById('fieldsSecond');
    const fieldsThird = document.getElementById('fieldsThird');

    if (fieldsFirst && fieldsSecond) {
        const options = fieldsFirst.innerHTML;
        fieldsSecond.innerHTML = options;
    }
    
    if (fieldsFirst && fieldsThird) {
        const options = fieldsFirst.innerHTML;
        fieldsThird.innerHTML = options;
    }
    
    if (fieldsFirst) {
        fieldsFirst.addEventListener('change', function() {
            if (fieldsSecond) {
                fieldsSecond.value = "0";
                fieldsSecond.disabled = this.value === "0";
                
                const descSecond = document.getElementById('fieldsSecondDesc');
                if (descSecond) descSecond.checked = false;
            }
            
            if (fieldsThird) {
                fieldsThird.value = "0";
                fieldsThird.disabled = true;
                
                const descThird = document.getElementById('fieldsThirdDesc');
                if (descThird) descThird.checked = false;
            }
        });
    }
    
    if (fieldsSecond) {
        fieldsSecond.addEventListener('change', function() {
            if (fieldsThird) {
                fieldsThird.value = "0";
                fieldsThird.disabled = this.value === "0";
                
                const descThird = document.getElementById('fieldsThirdDesc');
                if (descThird) descThird.checked = false;
            }
        });
    }

    const buttons = sortForm.getElementsByTagName('input');
    for (let btn of buttons) {
        if (btn.value === "Сортировать") {
            btn.addEventListener("click", () => {
                sortTable("list", sortForm);
            });
        }
        if (btn.value === "Сбросить сортировку") {
            btn.addEventListener("click", () => {
                const selects = sortForm.getElementsByTagName('select');
                for (let select of selects) {
                    select.value = "0";
                    if (select.id !== 'fieldsFirst') {
                        select.disabled = true;
                    }
                }
                
                const checkboxes = sortForm.getElementsByTagName('input');
                for (let cb of checkboxes) {
                    if (cb.type === 'checkbox') {
                        cb.checked = false;
                    }
                }
                
                let dataToShow = buildings;
                if (window.currentFilteredData) {
                    dataToShow = [...window.currentFilteredData];
                }
                
                createTable(dataToShow, "list");
            });
        }
    }
});