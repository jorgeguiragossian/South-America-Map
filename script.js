// Load and display the map
d3.json("south-america.geo.json").then(function(data) {
    const svg = d3.select("#map").append("svg")
                  .attr("width", 960)
                  .attr("height", 600);

    const projection = d3.geoMercator();
    const pathGenerator = d3.geoPath().projection(projection);

    svg.selectAll("path")
       .data(data.features)
       .enter().append("path")
       .attr("d", pathGenerator)
       .attr("fill", "#ccc")
       .attr("stroke", "#333")
       .on("mouseover", function(event, d) {
           d3.select(this).attr("fill", "blue");
           // Show tooltip (you can use a library or create a custom tooltip)
       })
       .on("mouseout", function() {
           d3.select(this).attr("fill", "#ccc");
           // Hide tooltip
       })
       .on("click", function(event, d) {
           // Open modal and display country info
           document.getElementById("myModal").style.display = "block";
           document.getElementById("countryInfo").innerText = "Information about " + d.properties.name; // Replace with actual info
       });

    // Modal logic
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

