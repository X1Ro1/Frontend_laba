const clearTable = (idTable) => {
    const table = document.getElementById(idTable);
    if (!table) return;

    const tbody = table.querySelector('tbody');
    if (tbody) {
        tbody.innerHTML = '';
    }
};

const createHeaderRow = (headers) => {
    const thead = document.getElementById('tableHeader');
    if (!thead) return;
    
    thead.innerHTML = '';
    const tr = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        th.setAttribute('width', header === 'Название' ? '300' : '150');
        tr.appendChild(th);
    });
    thead.appendChild(tr);
};

const createBodyRows = (data) => {
    const tbody = document.getElementById('tableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    data.forEach(item => {
        const tr = document.createElement('tr');
        Object.values(item).forEach(value => {
            const td = document.createElement('td');
            td.textContent = (value !== null && value !== undefined) ? value : '';
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
};

const createTable = (data, idTable) => {
    if (!data || data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    createHeaderRow(headers);
    
    createBodyRows(data);
};