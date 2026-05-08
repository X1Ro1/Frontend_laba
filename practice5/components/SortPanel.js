import { useState } from 'react';

const SortPanel = ({ headers, onSort, onReset }) => {
  const [levels, setLevels] = useState([
    { column: -1, direction: false },
    { column: -1, direction: false },
    { column: -1, direction: false }
  ]);

  const getAvailableOptions = (currentIndex) => {
    const usedColumns = levels
      .filter((_, i) => i !== currentIndex)
      .map(l => l.column)
      .filter(col => col !== -1);
    return [
      { value: 0, label: 'Не выбрано' },
      ...headers
        .map((h, idx) => ({ value: idx + 1, label: h }))
        .filter(opt => !usedColumns.includes(opt.value - 1))
    ];
  };

  const handleChange = (index, field, value) => {
    const newLevels = levels.map((lvl, i) => {
      if (i === index) {
        if (field === 'column') {
          const col = parseInt(value, 10);
          return { ...lvl, column: col === 0 ? -1 : col - 1 };
        }
        return { ...lvl, direction: value };
      }
      if (i > index) {
        return { column: -1, direction: false };
      }
      return lvl;
    });
    setLevels(newLevels);
  };

  const handleSort = () => {
    const activeLevels = levels.filter(l => l.column !== -1);
    if (activeLevels.length === 0) {
      alert('Выберите поле для сортировки');
      return;
    }
    onSort(activeLevels);
  };

  const handleReset = () => {
    setLevels([
      { column: -1, direction: false },
      { column: -1, direction: false },
      { column: -1, direction: false }
    ]);
    onReset();
  };

  const levelNames = ['Первый уровень', 'Второй уровень', 'Третий уровень'];

  return (
    <div>
      {levels.map((level, i) => {
        const options = getAvailableOptions(i);
        const isDisabled = i > 0 && levels[i - 1].column === -1;

        return (
          <div className="sort-row" key={i}>
            <label>{levelNames[i]}:</label>
            <select
              value={level.column === -1 ? 0 : level.column + 1}
              onChange={(e) => handleChange(i, 'column', e.target.value)}
              disabled={isDisabled}
            >
              {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <label> по убыванию?</label>
            <input
              type="checkbox"
              checked={level.direction}
              onChange={(e) => handleChange(i, 'direction', e.target.checked)}
              disabled={level.column === -1}
            />
          </div>
        );
      })}
      <button onClick={handleSort}>Сортировать</button>
      <button className="reset" onClick={handleReset}>Сбросить сортировку</button>
    </div>
  );
};

export default SortPanel;