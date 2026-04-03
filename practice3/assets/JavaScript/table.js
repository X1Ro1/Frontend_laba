function showAnimeTable(data) {
    const table = d3.select("#animeTable");
    table.selectAll("*").remove();

    const headers = [
        "Название", 
        "Тип", 
        "Жанр", 
        "Студия", 
        "Год выпуска", 
        "Страна издатель", 
        "Количество серий", 
        "Мин. время серии", 
        "Макс. время серии"
    ];

    const thead = table.append("tr");
    headers.forEach(header => {
        thead.append("th")
             .attr("height", "40")
             .attr("align", "center")
             .text(header);
    });

    //заполнение строк данными
    const rows = table.selectAll("tr.data-row")
        .data(data)
        .enter()
        .append("tr")
        .classed("data-row", true);

    rows.selectAll("td")
        .data(d => [
            d.Название,
            d.Тип,
            d.Жанр,
            d.Студия,
            d.Год,
            d.Страна,
            d.Серий,
            d.min_time + " мин",
            d.max_time + " мин"
        ])
        .enter()
        .append("td")
        .attr("height", "40")
        .text(d => d);
}