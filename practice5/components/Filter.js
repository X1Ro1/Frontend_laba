import { useState } from 'react';

const Filter = ({ fullData, onFilter }) => {
  const [filters, setFilters] = useState({
    name: '',
    type: 'Не выбрано',
    yearFrom: '',
    yearTo: '',
    episodesFrom: '',
    episodesTo: '',
    studio: 'Не выбрано',
    country: 'Не выбрано'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      name: '', type: 'Не выбрано', yearFrom: '', yearTo: '',
      episodesFrom: '', episodesTo: '', studio: 'Не выбрано', country: 'Не выбрано'
    });
    onFilter(fullData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let filtered = [...fullData];

    if (filters.name.trim()) {
      const s = filters.name.trim().toLowerCase();
      filtered = filtered.filter(item => item['Название'].toLowerCase().includes(s));
    }
    if (filters.type !== 'Не выбрано') {
      filtered = filtered.filter(item => item['Тип'] === filters.type);
    }
    if (filters.studio !== 'Не выбрано') {
      filtered = filtered.filter(item => item['Студия'] === filters.studio);
    }
    if (filters.country !== 'Не выбрано') {
      filtered = filtered.filter(item => item['Страна издатель'] === filters.country);
    }

    const yearFrom = filters.yearFrom ? parseInt(filters.yearFrom, 10) : null;
    const yearTo = filters.yearTo ? parseInt(filters.yearTo, 10) : null;
    if (yearFrom !== null || yearTo !== null) {
      filtered = filtered.filter(item => {
        const y = item['Год выпуска'];
        if (yearFrom !== null && y < yearFrom) return false;
        if (yearTo !== null && y > yearTo) return false;
        return true;
      });
    }

    const epFrom = filters.episodesFrom ? parseInt(filters.episodesFrom, 10) : null;
    const epTo = filters.episodesTo ? parseInt(filters.episodesTo, 10) : null;
    if (epFrom !== null || epTo !== null) {
      filtered = filtered.filter(item => {
        const ep = item['Количество серий'];
        if (epFrom !== null && ep < epFrom) return false;
        if (epTo !== null && ep > epTo) return false;
        return true;
      });
    }

    onFilter(filtered);
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <div className="filter-row">
        <label>Название:</label>
        <input name="name" type="text" value={filters.name} onChange={handleChange} />
      </div>
      <div className="filter-row">
        <label>Тип аниме:</label>
        <select name="type" value={filters.type} onChange={handleChange}>
          <option>Не выбрано</option>
          <option>Фильм</option>
          <option>Сериал</option>
        </select>
      </div>
      <div className="filter-row">
        <label>Год выпуска: от</label>
        <input name="yearFrom" type="number" value={filters.yearFrom} onChange={handleChange} />
        <label> до</label>
        <input name="yearTo" type="number" value={filters.yearTo} onChange={handleChange} />
      </div>
      <div className="filter-row">
        <label>Количество серий: от</label>
        <input name="episodesFrom" type="number" value={filters.episodesFrom} onChange={handleChange} />
        <label> до</label>
        <input name="episodesTo" type="number" value={filters.episodesTo} onChange={handleChange} />
      </div>
      <div className="filter-row">
        <label>Студия:</label>
        <select name="studio" value={filters.studio} onChange={handleChange}>
          <option>Не выбрано</option>
          <option>Mappa</option>
          <option>WitStudio</option>
          <option>Studio Ghibli</option>
          <option>Madhouse</option>
          <option>LAN Studio</option>
          <option>Studio Pierrot</option>
          <option>B.CMAY PICTURES</option>
        </select>
      </div>
      <div className="filter-row">
        <label>Страна издатель:</label>
        <select name="country" value={filters.country} onChange={handleChange}>
          <option>Не выбрано</option>
          <option>Япония</option>
          <option>Китай</option>
        </select>
      </div>
      <button type="submit">Найти</button>
      <button type="reset">Очистить фильтры</button>
    </form>
  );
};

export default Filter;