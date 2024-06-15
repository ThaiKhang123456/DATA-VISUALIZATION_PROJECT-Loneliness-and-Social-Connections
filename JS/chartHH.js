d3.csv("../DATA/one-person-households.csv")
  .then(
    function(data) {

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
        .domain(d3.extent(data, d => d.Year));
      const y = d3.scaleLinear()
        .range([height - 100, 50])
        .domain([0, d3.max(data, d => d["Share of one person households"])]);

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

/////////////////////////////////////////////////////////////////////////////////////////////////
    function updateChart() {
      const selectedCountries = [];
      document.querySelectorAll('.list input[type="checkbox"]:checked').forEach(checkbox => {
          selectedCountries.push(checkbox.id);
      });

    // Parse the data
    selectedCountries.forEach(function(d) {
      d.Year = +d.Year;
      d["Share of one person households"] = +d["Share of one person households"];
    });
    
    
    // Get the unique countries
    const countries = Array.from(new Set(selectedCountries.map(d => d.Entity)));
    
    const line = d3.line()
      .x(d => x(d.Year))
      .y(d => y(d["Share of one person households"]));

    // Add tooltip
    const tooltip = d3.select("#chart")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Draw the lines
    countries.forEach((country, i) => {
      const selectedData = data.filter(d => selectedCountries.includes(d.Entity));
      const path = svg.append("g")
          .attr("class", `line line-${i}`)
          .append("path")
          .datum(selectedData.filter(d => d.Entity === country))
          .attr("d", line)
          .attr("stroke", getRandomColor())
          .attr("fill", "none")

    .on("mouseover", function(d, i) {
      
      
    d3.selectAll(".line").style("stroke-opacity", 0.2);
    d3.select(this).style("stroke-opacity", 1);
      
    tooltip.transition()
      .duration(200)
      .style("opacity", 0.9);
    tooltip.html(`${data[i].Entity}<br>${data[i]["Share of one person households"]}`)
      .style("left", (d3.event.pageX + 10) + "px")
      .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
      d3.selectAll(".line").style("stroke-opacity", 1);
      tooltip.transition()
      .duration(500)
      .style("opacity", 0.3);
    })
    .on("click", function() {
      d3.select(this).classed("hidden", !d3.select(this).classed("hidden"));
    });
  });

  };

      // Create the chart

      

      // Create the line generator
      

    
    document.querySelectorAll('.list input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', updateChart);
  });
  updateChart();

  
});
  

//Random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}