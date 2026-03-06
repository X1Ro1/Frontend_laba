const createHeaderRow = (headers) => {
    const tr = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.innerHTML = header;
        tr.appendChild(th);
    });
    return tr;
};

const createBodyRows = (data) => {
    const tbody = document.createElement('tbody');
    data.forEach(item => {
        const tr = document.createElement('tr');
        Object.values(item).forEach(value => {
            const td = document.createElement('td');
            td.innerHTML = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    return tbody;
};

const clearTable = (idTable) => {
    const table = document.getElementById(idTable);
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
};

const createTable = (data, idTable) => {
    const table = document.getElementById(idTable);
    if (!table) return;
    
    clearTable(idTable);
    
    if (!data || data.length === 0) {
        return;
    }
    
    const headers = Object.keys(data[0]);
    const headerRow = createHeaderRow(headers);
    table.appendChild(headerRow);
    
    const bodyRows = createBodyRows(data);
    table.appendChild(bodyRows);
};