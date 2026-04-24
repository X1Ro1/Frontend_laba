import { useState, useMemo } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import Filter from './Filter';
import SortPanel from './SortPanel';

const Table = ({data}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [sortLevels, setSortLevels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;
  const headers = Object.keys(data[0]);

  const sortedData = useMemo(() => {
    if (!sortLevels.length) return filteredData;

    return [...filteredData].sort((a, b) => {
      for (let {column, direction} of sortLevels) {
        const valA = Object.values(a)[column];
        const valB = Object.values(b)[column];
        let comparison = 0;

        if (column === 4 || column === 6) {
          const numA = parseFloat(valA) || 0;
          const numB = parseFloat(valB) || 0;
          comparison = numA - numB;
        } else {
          comparison = String(valA).toLowerCase().localeCompare(String(valB).toLowerCase(), 'ru');
        }

        if (comparison !== 0) return direction ? -comparison : comparison;
      }
      return 0;
    });
  }, [filteredData, sortLevels]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);


  useMemo(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [sortedData.length, totalPages]);

  const goToPage = (page) => setCurrentPage(page, totalPages);

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <span key={i} className={`page-number ${i === currentPage ? 'active' : ''}`} onClick={() => goToPage(i)}>
          {i}
        </span>
      );
    }
    return <div className="pagination">{pages}</div>;
  };

  return (
    <div className="main">
      <details>
        <summary>График</summary>
        <h4>Значение по оси X:</h4>
        <p><input type="radio" name="x"/> Тип</p>
        <p><input type="radio" name="x"/> Год</p>
        <p><input type="radio" name="x"/> Жанр</p>
        <h4>Значение по оси Y:</h4>
        <p><input type="radio" name="y"/> Минимальное время серии</p>
        <p><input type="radio" name="y"/> Максимальное время серии</p>
        <p><input type="radio" name="y"/> Средняя оценка аниме</p>
        <button type="button">Построить</button>
        <p>График: </p>
      </details>

      <details open>
        <summary>Фильтр</summary>
        <Filter fullData={data} onFilter={setFilteredData} />
      </details>

      <details open>
        <summary>Сортировка</summary>
        <SortPanel headers={headers} onSort={setSortLevels} onReset={() => setSortLevels([])} />
      </details>

      <div className="table">
        <table border="1">
          <TableHead head={headers} />
          <TableBody body={sortedData} amountRows={rowsPerPage} numPage={currentPage} />
        </table>
        {renderPagination()}
      </div>
    </div>
  );
};

export default Table;