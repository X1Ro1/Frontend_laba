const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
};

const setSortSelect = (arr, sortSelect) => {
    sortSelect.innerHTML = '';
    sortSelect.append(createOption('Не выбрано', 0));
    arr.forEach((item, index) => {
        sortSelect.append(createOption(item, index + 1));
    });
};

const setSortSelects = (data, dataForm) => {
    if (!data || data.length === 0) return;
    
    const head = Object.keys(data[0]);
    const selects = dataForm.getElementsByTagName('select');
    
    for (let i = 0; i < selects.length; i++) {
        setSortSelect(head, selects[i]);
        if (i > 0) selects[i].disabled = true;
    }
};

const changeNextSelect = (curSelect, nextSelectId) => {
    const nextSelect = document.getElementById(nextSelectId);
    if (!nextSelect) return;
    
    const options = Array.from(curSelect.options);
    nextSelect.innerHTML = '';

    nextSelect.append(createOption('Не выбрано', 0));

    options.forEach((opt, index) => {
        if (index > 0 && opt.value !== curSelect.value) {
            nextSelect.append(createOption(opt.text, opt.value));
        }
    });

    if (curSelect.value != "0") {
        nextSelect.disabled = false;
    } else {
        nextSelect.disabled = true;
        if (nextSelectId === 'fieldsSecond') {
            const thirdSelect = document.getElementById('fieldsThird');
            if (thirdSelect) {
                thirdSelect.disabled = true;
                thirdSelect.innerHTML = '<option value="0">Не выбрано</option>';
            }
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    createTable(buildings, "list");

    const sortForm = document.getElementById("sort");
    if (sortForm) {
        setSortSelects(buildings, sortForm);
    }

    const fieldsFirst = document.getElementById("fieldsFirst");
    if (fieldsFirst) {
        fieldsFirst.addEventListener("change", function() {
            changeNextSelect(this, "fieldsSecond");
        });
    }

    const fieldsSecond = document.getElementById("fieldsSecond");
    if (fieldsSecond) {
        fieldsSecond.addEventListener("change", function() {
            changeNextSelect(this, "fieldsThird");
        });
    }
});