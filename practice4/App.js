import './CSS/App.css';
import animeData from './data';
import Table from './components/Table';

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Самые популярные аниме 2025 года</h1>
        <a href="index.html">Главная</a>
        <a href="page_anime.html">Аниме страница</a>
        <a href="table_form.html">Таблица</a>
      </div>

      <Table data={animeData} />

      <div className="footer" align="center">
        <h2>Егоров Артем Б9123-09.03.04</h2>
      </div>
    </div>
  );
}

export default App;