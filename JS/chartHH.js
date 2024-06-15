d3.csv("../DATA/one-person-households.csv")
  .then(function(data) {
    
    // Create the chart
    const width = 900;
    const height = 600;
    const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Create the scales
    const x = d3.scaleLinear()
      .range([50, width - 50])
      .domain(d3.extent(data, d => +d.Year));
    const y = d3.scaleLinear()
      .range([height - 100, 50])
      .domain([0, 50]);

    // Add the axes
    svg.append("g")
      .attr("transform", `translate(0, ${height - 100})`)
      .call(d3.axisBottom(x));
    svg.append("g")
      .attr("transform", "translate(50, 0)")
      .call(d3.axisLeft(y));

    // Add the labels
    svg.append("text")
      .attr("x", width - 25)
      .attr("y", height - 90)
      .attr("text-anchor", "middle")
      .text("Year");
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height/15)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .text("%");

    // Parse the data
    function parseData(data, selectedCountries) {
      return data.filter(d => selectedCountries.includes(d.Entity)).map(d => ({
        Year: +d.Year,
        "Share of one person households": +d["Share of one person households"],
        Entity: d.Entity
      }));
    }

    // Update the chart
    function updateChart() {
      const selectedCountries = [];
      document.querySelectorAll('.list input[type="checkbox"]:checked').forEach(checkbox => {
        selectedCountries.push(checkbox.id);
      });

      const parsedData = parseData(data, selectedCountries);
      const countries = Array.from(new Set(parsedData.map(d => d.Entity)));

      // Create the line generator
      const line = d3.line()
        .x(d => x(d.Year))
        .y(d => y(d["Share of one person households"]));

      // Add tooltip
      const tooltip = d3.select("#chart")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      // Draw the lines
      svg.selectAll(".line").remove();
      countries.forEach((country, i) => {
        const selectedData = parsedData.filter(d => d.Entity === country);
        const path = svg.append("g")
          .attr("class", `line line-${i}`)
          .append("path")
          .datum(selectedData)
          .attr("d", line)
          .attr("stroke", getRandomColor())
          .attr("fill", "none")
          .on("mouseover", function(d, i) {
            d3.selectAll(".line").style("stroke-opacity", 0.2);
            d3.select(this).style("stroke-opacity", 1);
            tooltip.transition()
              .duration(200)
              .style("opacity", 1);
          })
          .on("mouseout", function(d) {
            d3.selectAll(".line").style("stroke-opacity", 1);
            d3.selectAll(".line").attr("transform", "translate(0,0)");
            tooltip.transition()
              .duration(500)
              .style("opacity", 0);
          })
          .on("click", function() {
            d3.select(this).classed("hidden", !d3.select(this).classed("hidden"));
          });
      });
      addMarkers(svg, x, y, parsedData);


    }
    function addMarkers(svg, x, y, data) {
      // Tạo group cho các mốc
      const markers = svg.append("g")
        .attr("class", "markers");
    
      // Tạo các mốc
      markers.selectAll(".marker")
        .data(data)
        .enter().append("circle")
        .attr("class", "marker")
        .attr("cx", d => x(d.Year))
        .attr("cy", d => y(d["Share of one person households"]))
        .attr("r", 1.5)
        .attr("fill", "black")
        .on("mouseover", function(d) {
          // Hiển thị thông tin mốc khi di chuột vào
          const markerData = [
            `Year: ${d.Year}`,
            `Entity: ${d.Entity}`,
            `Share of one person households: ${d["Share of one person households"]}%`
          ];
          console.log(markerData)
          showMarkerTooltip(d3.select(this), markerData);
          
        })
        .on("mouseout", function() {
          // Ẩn thông tin mốc khi di chuột ra
          hideMarkerTooltip();
          resetMarkerData();
        });
    }
    
    function showMarkerTooltip(marker, data) {
      // Hiển thị thông tin mốc
      const tooltip = d3.select("#chart")
        .append("div")
        .attr("class", "marker-tooltip")
        .style("opacity", 1);
    
      tooltip.html(data.join("<br>"))
        .style("left", (marker.node().getBoundingClientRect().left + window.pageXOffset + 10) + "px")
        .style("top", (marker.node().getBoundingClientRect().top + window.pageYOffset - 30) + "px");
    }
    
    function hideMarkerTooltip() {
      // Ẩn thông tin mốc
      d3.select(".marker-tooltip").remove();
    }
    function resetMarkerData() {
      // Reset the markerData array
      markerData = [];
    }
    
    // Add the clear button and functionality
    const clearButtonContainer = d3.select(".Clear-Button-Container");
    const clearButton = clearButtonContainer.append("g")
      .attr("class", "clear-button")
      .attr("transform", `translate(0, 0)`);

    clearButton.append("rect")
      .attr("width", 80)
      .attr("height", 30)
      .attr("fill", "#ddd")
      .attr("stroke", "#999")
      .attr("rx", 5)
      .attr("ry", 5);

    clearButton.append("text")
      .attr("x", 40)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .text("Clear")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("cursor", "pointer")
      .on("click", () => {
        // Uncheck all checkboxes
        document.querySelectorAll('.list input[type="checkbox"]').forEach(checkbox => {
          checkbox.checked = false;
        });

        // Redraw the chart
        updateChart();
      });

    document.querySelectorAll('.list input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', updateChart);
    });

    updateChart();
  });

  

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}