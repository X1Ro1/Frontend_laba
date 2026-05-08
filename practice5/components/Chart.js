import { useState } from "react";
import * as d3 from "d3";
import ChartDraw from './ChartDraw.js';

const Chart = (props) => {
    const [ox, setOx] = useState("Тип");
    const [oy, setOy] = useState([true, false]);
    const [chartType, setChartType] = useState("scatter");
    const [error, setError] = useState("");

    const timeMinut = (timeStr) => {
        const parts = timeStr.split(':');
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    };

    const createArrGraph = (data, key) => {
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph = [];
        for (let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => timeMinut(d['Время'])));
            arrGraph.push({ labelX: entry[0], values: minMax });
        }
        if (key === "Год выпуска") {
            arrGraph.sort((a, b) => a.labelX - b.labelX);
        }
        return arrGraph;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setOx(event.target["ox"].value);
        const maxChecked = event.target["oy"]["0"].checked;
        const minChecked = event.target["oy"]["1"].checked;
        if (!maxChecked && !minChecked) {
            setError("Выберите хотя бы одно значение по оси ОУ");
            setOy([false]);
            return;
        }
        setError("");
        setOy([maxChecked, minChecked]);
        setChartType(event.target["chartType"].value);
    };

    return (
        <>
            <h4>Визуализация</h4>
            <form onSubmit={handleSubmit}>
                <p>Значение по оси ОХ:</p>
                <div>
                    <input type="radio" name="ox" value="Тип" defaultChecked={ox === "Тип"} />
                    Тип
                    <br />
                    <input type="radio" name="ox" value="Год выпуска" defaultChecked={ox === "Год выпуска"} />
                    Год
                    <br />
                    <input type="radio" name="ox" value="Жанр" defaultChecked={ox === "Жанр"} />
                    Жанр
                </div>
                <p>Значение по оси ОУ:</p>
                <div>
                    <input type="checkbox" name="oy" defaultChecked={oy[0] === true} />
                    Максимальное время серии
                    <br />
                    <input type="checkbox" name="oy" defaultChecked={oy[1] === true} />
                    Минимальное время серии
                </div>
                <p>
                    <label>Тип диаграммы: </label>
                    <select name="chartType" defaultValue={chartType}>
                        <option value="scatter">Точечная диаграмма</option>
                        <option value="histogram">Гистограмма</option>
                    </select>
                </p>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <p>
                    <button type="submit">Построить</button>
                </p>
            </form>
            <ChartDraw data={createArrGraph(props.data, ox)} oy={oy} chartType={chartType} />
        </>
    );
};

export default Chart;