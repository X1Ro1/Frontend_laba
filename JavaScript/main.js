const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
};

const setSortSelect = (arr, sortSelect) => {
    sortSelect.appendChild(createOption('Нет', 0));
    arr.forEach((item, index) => {
        sortSelect.appendChild(createOption(item, index + 1));
    });
};

const setSortSelects = (data, dataForm) => {
    const head = Object.keys(data);
    const allSelect = dataForm.getElementsByTagName('select');
    
    for (let i = 0; i < allSelect.length; i++) {
        const select = allSelect[i];
        setSortSelect(head, select);
        if (i > 0) {
            select.disabled = true;
        }
    }
};

const changeNextSelect = (curSelect, nextSelectId) => {
    let nextSelect = document.getElementById(nextSelectId);
    nextSelect.disabled = false;
    nextSelect.innerHTML = curSelect.innerHTML;
    
    if (curSelect.value != 0) {
        nextSelect.remove(curSelect.value);
    } else {
        nextSelect.disabled = true;
    }
};

document.addEventListener('DOMContentLoaded', function() {
    createTable(buildings, 'list');
    setSortSelects(buildings[0], document.getElementById('sort'));
    
    document.getElementById('fieldsFirst').addEventListener('change', function() {
        changeNextSelect(this, 'fieldsSecond');
    });
});