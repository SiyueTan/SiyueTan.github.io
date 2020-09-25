d3.csv("./data/Other.csv").then(function(data) {

    /*
    DEFINE DIMENSIONS OF SVG + CREATE SVG CANVAS
    */
    var width = 550;
    var height = 400;
    var margin = { top: 50, left: 150, right: 50, bottom: 150 };

    var svg = d3.select("#Pointchart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


    var filtered_data = data.filter(function(d) {
        return d.YEAR;

        console.log(d.YEAR);


    });

    console.log(filtered_data);





    var PERCENTAGE = {

        min: d3.min(filtered_data, function(d) { return +d.PERCENTAGE; }),
        max: d3.max(filtered_data, function(d) { return +d.PERCENTAGE; })
    };


    var year = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];
    var xScale = d3.scaleBand()
        .domain(year)
        .rangeRound([margin.left, width - margin.right])
        .padding(0.5);

    var yScale = d3.scaleLinear()
        .domain([10, 13])
        .range([height - margin.bottom, margin.top]);




    var xAxis = svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    var yAxis = svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

    var xAxisLabel = svg.append("text")
        .attr("class", "axisLabel")
        .attr("x", width / 2)
        .attr("y", height - margin.bottom / 2)
        .text("Year");

    var yAxisLabel = svg.append("text")
        .attr("class", "axisLabel")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", margin.left / 2)
        .text("Mortality Rate");

    var area = d3.area()
        .x(function(d) { return xScale(d.YEAR); })
        .y0(height - margin.bottom)
        .y1(function(d) { return yScale(d.PERCENTAGE); })
        .curve(d3.curveLinear);

    var line = d3.line()
        .x(function(d) { return xScale(d.YEAR); })
        .y(function(d) { return yScale(d.PERCENTAGE); })
        .curve(d3.curveLinear);

    var area = svg.append("path")
        .datum(filtered_data)
        .attr("d", function(d) { return area(d); }) //change line(d)to area(d)

    .attr("fill", "none")


    var path = svg.append("path")
        .datum(filtered_data)
        .attr("d", function(d) { return line(d); }) //change line(d)to area(d)
        .attr("stroke", "darkgrey")
        .attr("fill", "none")
        .attr("stroke-width", 2);

    var c = svg.selectAll("circle")
        .data(filtered_data, function(d) { return d.YEAR; })
        .enter()
        .append("circle")
        .attr("cx", function(d) { return xScale(d.YEAR); })
        .attr("cy", function(d) { return yScale(d.PERCENTAGE); })
        .attr("r", 5)
        .attr("opacity", 0.7)
        .attr("fill", "#CC0000");





    var tooltip = d3.select("#Pointchart")
        .append("div")
        .attr("class", "tooltip");

    c.on("mouseover", function(d) {

        var x = +d3.select(this).attr("cx") + 20;
        var y = +d3.select(this).attr("cy");

        tooltip.style("visibility", "visible")
            .style("left", x + "px")
            .style("top", y + "px")
            .text(d.PERCENTAGE + " %");


        d3.select(this)
            .attr("stroke", "black")
            .attr("stroke-width", 3)


    }).on("mouseout", function() {

        tooltip.style("visibility", "hidden");

        d3.select(this)

        .attr("stroke", "none")




    });



});