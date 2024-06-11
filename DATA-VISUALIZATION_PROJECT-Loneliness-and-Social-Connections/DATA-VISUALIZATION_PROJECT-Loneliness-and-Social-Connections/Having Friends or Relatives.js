document.addEventListener("DOMContentLoaded", () => {
    d3.csv("people-who-report-having-friends-or-relatives-they-can-count-on.csv").then(data => {
        // Format the data
        data.forEach(d => {
            d["People who report having friends or relatives they can count on"] = +d["People who report having friends or relatives they can count on"];
        });

        // Set the dimensions and margins of the graph
        const margin = {top: 20, right: 30, bottom: 40, left: 200},
              width = 960 - margin.left - margin.right,
              height = 800 - margin.top - margin.bottom;

        // Clear existing SVG content if any
        d3.select("#chart-container").select("svg").selectAll("*").remove();

        // Append the svg object to the body of the page
        const svg = d3.select("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Color scale
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // Y axis
        const y = d3.scaleBand()
            .range([0, height])
            .domain(data.map(d => d.Entity))
            .padding(0.2); // Increased padding for larger bars
        const yAxis = svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y).tickSize(0))
            .selectAll("text")
            .attr("class", "axis-label")
            .style("fill", "black");

        // Add X axis
        const x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, width]);

        // Bars
        let bars = svg.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", x(0))
            .attr("y", d => y(d.Entity))
            .attr("width", d => x(d["People who report having friends or relatives they can count on"]))
            .attr("height", y.bandwidth())
            .attr("fill", d => color(d.Entity));

        // Labels
        let labels = svg.selectAll(".label")
            .data(data)
          .enter().append("text")
            .attr("class", "label")
            .attr("x", d => x(d["People who report having friends or relatives they can count on"]) + 5)
            .attr("y", d => y(d.Entity) + y.bandwidth() / 2 + 5)
            .attr("text-anchor", "start")
            .text(d => d["People who report having friends or relatives they can count on"] + '%');

        // Add checkboxes
        const checkboxContainer = d3.select("#checkbox-container");
        checkboxContainer.selectAll("*").remove(); // Clear existing checkboxes
        data.forEach(d => {
            checkboxContainer.append("label")
                .text(d.Entity)
                .append("input")
                .attr("type", "checkbox")
                .attr("checked", true)
                .attr("value", d.Entity)
                .on("change", updateChart);
        });

        // Toggle checkbox visibility
        d3.select("#edit-button").on("click", () => {
            const container = d3.select("#checkbox-container");
            container.style("display", container.style("display") === "none" ? "block" : "none");
        });

        // Update chart based on checkbox selection
        function updateChart() {
            const selectedCountries = checkboxContainer.selectAll("input:checked").nodes().map(d => d.value);

            const filteredData = data.filter(d => selectedCountries.includes(d.Entity));

            y.domain(filteredData.map(d => d.Entity));

            yAxis.transition().call(d3.axisLeft(y).tickSize(0))
                .selectAll("text")
                .attr("class", "axis-label")
                .style("fill", "black");

            bars = svg.selectAll(".bar")
                .data(filteredData, d => d.Entity);

            bars.exit().transition().attr("y", height).attr("height", 0).remove();

            bars.enter().append("rect")
                .attr("class", "bar")
                .attr("x", x(0))
                .attr("y", d => y(d.Entity))
                .attr("width", d => x(d["People who report having friends or relatives they can count on"]))
                .attr("height", y.bandwidth())
                .attr("fill", d => color(d.Entity))
              .merge(bars)
                .transition()
                .attr("y", d => y(d.Entity))
                .attr("height", y.bandwidth());

            labels = svg.selectAll(".label")
                .data(filteredData, d => d.Entity);

            labels.exit().transition().attr("y", height).remove();

            labels.enter().append("text")
                .attr("class", "label")
                .attr("x", d => x(d["People who report having friends or relatives they can count on"]) + 5)
                .attr("y", d => y(d.Entity) + y.bandwidth() / 2 + 5)
                .attr("text-anchor", "start")
                .text(d => d["People who report having friends or relatives they can count on"] + '%')
              .merge(labels)
                .transition()
                .attr("x", d => x(d["People who report having friends or relatives they can count on"]) + 5)
                .attr("y", d => y(d.Entity) + y.bandwidth() / 2 + 5)
                .text(d => d["People who report having friends or relatives they can count on"] + '%');
        }
    });
});







