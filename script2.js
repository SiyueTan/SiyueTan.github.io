d3.csv("data/museum.csv").then(function(data) {
    /*
    BOSTON CRIME DATA from the BOSTON POLICE DEPARTMENT, 2018
    Adapted from:
    https://www.kaggle.com/ankkur13/boston-crime-data/
    */
    /*
    BEGIN BY DEFINING THE DIMENSIONS OF THE SVG and CREATING THE SVG CANVAS
    */


    /*museumtTopic*/
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


    var filtered = nested.slice(0, 20);



    var g = svg.append("g")
        .attr("transform", `translate(${width/2},${height/2})`);


    var pie = d3.pie()
        .value(function(d) { return d.value; });

    var color = d3.scaleOrdinal(d3.schemeDark2);

    var arc = d3.arc()
        .innerRadius(65)
        .outerRadius(100);

    var arcs = g.selectAll("arc")
        .data(pie(filtered))
        .enter()
        .append("g")
        .attr("class", "arc")

    arcs.append("path")
        .attr("d", function(d) { return arc(d); })
        .attr("opacity", 0.8)
        .attr("fill", function(d, i) {
            return color(i);
        });


    var tooltip1 = d3.select("#chart1")
        .append("div")
        .attr("class", "tooltip1"); // IMPORTANT! SEE THE CSS PROPERTIES FOR THIS CLASS!

    arcs.on("mousemove", function(d) {


        var mouse = d3.mouse(this);
        var cx = mouse[0] + width / 2 + 10;
        var cy = mouse[1] + height / 2;

        tooltip1.style("visibility", "visible") // make the tooltip visible
            .style("left", cx + "px") // adjust the left (x) position of the tooltip
            .style("top", cy + "px") // adjust the top (y) position of the tooltip
            .html(d.data.key + "<br>" + d.data.value + " Museums" + "<br>" + Math.round(d.data.value / 871 * 100) + "%");

        // OPTIONALLY, also highlight the circle:
        d3.select(this)
            .attr("stroke", "white")
            .attr("stroke-width", 4)
            .raise();


    }).on("mouseout", function() {
        tooltip1.style("visibility", "hidden");

        d3.select(this)
            .attr("stroke", "none")
            .attr("stroke-width", 0);
    })




    /*Continent*/

    var width = document.querySelector("#chart2").clientWidth;
    var height = document.querySelector("#chart2").clientHeight;
    var svg = d3.select("#chart2")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    //data, rollup, entries, sort
    var nested = d3.nest()
        .key(function(d) { return d.Continent; })
        .rollup(function(d) { return d.length; })
        .entries(data)
        .sort(function(a, b) { return b.value - a.value; });

    var filtered = nested.slice(0, 20);



    var g = svg.append("g")
        .attr("transform", `translate(${width/2},${height/2})`);

    var pie = d3.pie()
        .value(function(d) { return d.value; });

    var color = d3.scaleOrdinal(d3.schemeDark2);

    var arc = d3.arc()
        .innerRadius(65)
        .outerRadius(100);

    var arcs = g.selectAll("arc")
        .data(pie(filtered))
        .enter()
        .append("g")
        .attr("class", "arc")

    arcs.append("path")
        .attr("d", function(d) { return arc(d); })
        .attr("opacity", 0.8)
        .attr("fill", function(d, i) {
            return color(i);
        });

    var tooltip2 = d3.select("#chart2")
        .append("div")
        .attr("class", "tooltip2"); // IMPORTANT! SEE THE CSS PROPERTIES FOR THIS CLASS!

    arcs.on("mousemove", function(d) {
        console.log(d);

        var mouse = d3.mouse(this);
        var cx = mouse[0] + width / 2 + 10;
        var cy = mouse[1] + height / 2;

        tooltip2.style("visibility", "visible") // make the tooltip visible
            .style("left", cx + "px") // adjust the left (x) position of the tooltip
            .style("top", cy + "px") // adjust the top (y) position of the tooltip
            .html(d.data.key + "<br>" + d.data.value + " Museums" + "<br>" + Math.round(d.data.value / 871 * 100) + "%");

        /*update the text of the tooltip to the `area`
        property of the object bound to the circle*/
        console.log(d.C)
            // OPTIONALLY, also highlight the circle:
        d3.select(this)
            .attr("stroke", "white")
            .attr("stroke-width", 4)
            .raise();


    }).on("mouseout", function() {
        tooltip2.style("visibility", "hidden");

        d3.select(this)
            .attr("stroke", "none")
            .attr("stroke-width", 0);
    })




    /*chart3*/

    var data = data.filter(function(d) {
        return d.Continent == "Europe";


    });

    var width = document.querySelector("#chart3").clientWidth;
    var height = document.querySelector("#chart3").clientHeight;
    var svg = d3.select("#chart3")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


    //data, rollup, entries, sort
    var nested = d3.nest()
        .key(function(d) { return d.Country; })
        .rollup(function(d) { return d.length; })
        .entries(data)
        .sort(function(a, b) { return b.value - a.value; });


    var filtered = nested.slice(0, 20);



    var g = svg.append("g")
        .attr("transform", `translate(${width/2},${height/2})`);


    var pie = d3.pie()
        .value(function(d) { return d.value; });


    var color = d3.scaleOrdinal(d3.schemeDark2);


    var arc = d3.arc()
        .innerRadius(65)
        .outerRadius(100);

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
        .attr("opacity", 0.8)
        .attr("fill", function(d, i) {
            return color(i);
        });

    /*
    Optionally, create a tooltip for the chart!
    */

    var tooltip3 = d3.select("#chart3")
        .append("div")
        .attr("class", "tooltip3"); // IMPORTANT! SEE THE CSS PROPERTIES FOR THIS CLASS!

    arcs.on("mousemove", function(d) {


        var mouse = d3.mouse(this);
        var cx = mouse[0] + width / 2 + 10;
        var cy = mouse[1] + height / 2;

        tooltip3.style("visibility", "visible") // make the tooltip visible
            .style("left", cx + "px") // adjust the left (x) position of the tooltip
            .style("top", cy + "px") // adjust the top (y) position of the tooltip
            .html(d.data.key + "<br>" + d.data.value + " Museums" + "<br>" + Math.round(d.data.value / 871 * 100) + "%");

        // OPTIONALLY, also highlight the circle:
        d3.select(this)
            .attr("stroke", "white")
            .attr("stroke-width", 4)
            .raise();


    }).on("mouseout", function() {
        tooltip3.style("visibility", "hidden");

        d3.select(this)
            .attr("stroke", "none")
            .attr("stroke-width", 0);
    })




});