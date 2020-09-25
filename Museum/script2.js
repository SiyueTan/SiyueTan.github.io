d3.csv("data/museum.csv").then(function(data) {
    /*
    BOSTON CRIME DATA from the BOSTON POLICE DEPARTMENT, 2018
    Adapted from:
    https://www.kaggle.com/ankkur13/boston-crime-data/
    */
    console.log(data);

    /*
    BEGIN BY DEFINING THE DIMENSIONS OF THE SVG and CREATING THE SVG CANVAS
    */
    var width = document.querySelector("#chart1").clientWidth;
    var height = document.querySelector("#chart1").clientHeight;
    var svg = d3.select("#chart1")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    //data, rollup, entries, sort
    var nested = d3.nest()
        .key(function(d) { return d.MuseumTopic; })
        .rollup(function(d) { return d.length; })
        .entries(data)
        .sort(function(a, b) { return b.value - a.value; });

    var nested2 = d3.nest()
        .key(function(d) { return d.Continent; });




    //how many categories
    var filtered = nested.slice(0, 20);



    var g = svg.append("g")
        .attr("transform", `translate(${width/3},${height/3})`);


    var pie = d3.pie()
        .value(function(d) { return d.value; });

    /*
    We create a color palette to assign each wedge a unique color with d3.scaleOrdinal()
    */
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    /*
    CREATE THE ARC GENERATOR
    This is similar to d3.line(), d3.area(), etc. in that it will help us create `path` elements
    */
    var arc = d3.arc()
        .innerRadius(80)
        // If we set the innerRadius value to 0, we get a pie chart!
        // .innerRadius(0)
        .outerRadius(150);

    /*
    CREATE THE ARCS
    The pie() function (which we defined above, using d3.pie()) will be used to convert our data in `filtered`
    into a data structure that can be used to generate the wedges of the pie.
    Here, we are first creating `g` elements for each wedge...
    */
    var arcs = g.selectAll("arc")
        .data(pie(filtered))
        .enter()
        .append("g")
        .attr("class", "arc")

    /*
    ...and then we are appending new SVG `path` elements to those g elements, one for each wedge
    */
    arcs.append("path")
        .attr("d", function(d) { return arc(d); })
        .attr("fill", function(d, i) {
            return color(i);
        });

    /*
    Optionally, create a tooltip for the chart!
    */

    var tooltip = d3.select("#chart1")
        .append("div")
        .attr("class", "tooltip"); // IMPORTANT! SEE THE CSS PROPERTIES FOR THIS CLASS!

    arcs.on("mousemove", function(d) {


        var mouse = d3.mouse(this);
        var cx = mouse[0] + width / 3;
        var cy = mouse[1] + height / 3;

        tooltip.style("visibility", "visible") // make the tooltip visible
            .style("left", cx + "px") // adjust the left (x) position of the tooltip
            .style("top", cy + "px") // adjust the top (y) position of the tooltip
            .text(d.data.key); // update the text of the tooltip to the `area` property of the object bound to the circle

        // OPTIONALLY, also highlight the circle:
        d3.select(this)
            .attr("stroke", "#F6C900")
            .attr("stroke-width", 5)
            .raise();


    }).on("mouseout", function() {
        tooltip.style("visibility", "hidden");

        d3.select(this)
            .attr("stroke", "none")
            .attr("stroke-width", 0);
    })



});