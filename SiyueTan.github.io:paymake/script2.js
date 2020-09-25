d3.csv("data/Data.csv").then(function(data) {

    var left = {};
    var right = {};

    data = data.sort(function(a, b) {
        return b.rent - a.rent;
    });

    var data = data.filter(function(d) {
        return d.type == "Public";
    });

    left.width = document.querySelector("#left").clientWidth;
    left.height = document.querySelector("#left").clientHeight;
    left.margin = { top: 50, left: 150, right: 50, bottom: 150 };

    left.svg = d3.select("#left")
        .append("svg")
        .attr("width", left.width)
        .attr("height", left.height);

    /*
    DEFINE SCALES
    */
    left.xScale = d3.scaleLinear()
        .domain([30000, 80000])
        .range([left.margin.left, left.width - left.margin.right]);

    left.yScale = d3.scaleLinear()
        .domain([0, 60000])
        .range([left.height - left.margin.bottom, left.margin.top]);

    /*
    DRAW AXES
    */
    left.xAxis = left.svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${left.height-left.margin.bottom})`)
        .call(d3.axisBottom().scale(left.xScale).tickFormat(d3.format("$")).ticks(5));

    left.yAxis = left.svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${left.margin.left},0)`)
        .call(d3.axisLeft().scale(left.yScale).tickFormat(d3.format("$")).ticks(5));



    /*
    DRAW AXES
    */

    /*
    DRAW AXIS LABELS
    */
    left.xAxisLabel = left.svg.append("text")
        .attr("class", "ax")
        .attr("x", left.width / 2)
        .attr("y", left.height - left.margin.bottom / 2)
        .attr("text-anchor", "middle")
        .text("Make?");

    left.yAxisLabel = left.svg.append("text")
        .attr("class", "ax")
        .attr("transform", "rotate(-90)")
        .attr("x", -left.height / 2)
        .attr("y", left.margin.left / 2)
        .attr("text-anchor", "middle")
        .text("In State");

    /*
    DRAW POINTS FOR left PLOT WITH THE INITIAL DATASET `spring2019`
    */


    left.circles = left.svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return left.xScale(d.early_career_pay) })
        .attr("cy", function(d) { return left.yScale(d.in_state_total); })
        .attr("r", 3)
        .attr("stroke", function(d) { return d.Color; })
        .attr("fill", "none")
        .attr("stroke-width", 1.25);




    right.width = document.querySelector("#right").clientWidth;
    right.height = document.querySelector("#right").clientHeight;
    right.margin = { top: 50, left: 150, right: 50, bottom: 150 };

    right.svg = d3.select("#right")
        .append("svg")
        .attr("width", right.width)
        .attr("height", right.height);


    right.state = data.map(function(d) { return d.name; });

    right.xScale = d3.scaleLinear()
        .domain([30000, 80000])
        .range([right.margin.left, right.width - right.margin.right]);

    right.yScale = d3.scaleLinear()
        .domain([0, 60000])
        .range([right.height - right.margin.bottom, right.margin.top]);

    right.xAxis = right.svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${right.height-right.margin.bottom})`)
        .call(d3.axisBottom().scale(right.xScale).tickFormat(d3.format("$")).ticks(5));

    right.yAxis = right.svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${right.margin.left},0)`)
        .call(d3.axisLeft().scale(right.yScale).tickFormat(d3.format("$")).ticks(5));

    right.xAxisLabel = right.svg.append("text")
        .attr("class", "ax")
        .attr("x", right.width / 2)
        .attr("y", right.height - right.margin.bottom / 2)
        .attr("text-anchor", "middle")
        .text("Make?");

    right.yAxisLabel = right.svg.append("text")
        .attr("class", "ax")
        .attr("transform", "rotate(-90)")
        .attr("x", -right.height / 2)
        .attr("y", right.margin.left / 2)
        .attr("text-anchor", "middle")
        .text("Out of State");

    /*
    DRAW POINTS FOR left PLOT WITH THE INITIAL DATASET `spring2019`
    */


    right.circles = right.svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return right.xScale(d.early_career_pay); })
        .attr("cy", function(d) { return right.yScale(d.out_of_state_total); })
        .attr("r", 3)
        .attr("stroke", function(d) { return d.Color; })
        .attr("fill", "none")
        .attr("stroke-width", 1.25);


    var tooltip2_1 = d3.select("#right")
        .append("div")
        .attr("class", "tooltip2_1");


    right.circles.on("mouseover", function(d) {
        var name = d.name;
        var cx = +d3.select(this).attr("cx") + 10;
        var cy = +d3.select(this).attr("cy");

        d3.select(this)
            .attr("stroke-width", 3)
            .attr("r", 10)
            .attr("fill", "#323232");

        tooltip2_1.style("visibility", "visible") // make the tooltip visible
            .style("left", cx + "px") // adjust the left (x) position of the tooltip
            .style("top", cy + "px") // adjust the top (y) position of the tooltip
            .html("<b>" + d.name + "</b>" + "<br>" + "Out of Stat Tuition: " + d.out_of_state_total + "$" + "<br>" + "￪ " + d.tuition_increase + " then in state");

        left.circles.attr("opacity", 0.2);

        left.circles.filter(function(e) {
                return e.name === name;
            }).attr("opacity", 1)
            .attr("stroke-width", 3)
            .attr("fill", "#323232")
            .attr("r", 10);

        right.circles.attr("opacity", 0.2);

        d3.select(this).attr("opacity", 1);

    }).on("mouseout", function() {

        left.circles.attr("opacity", 1)
            .attr("r", 3)
            .attr("stroke-width", 1.25)
            .attr("fill", "none");


        right.circles.attr("opacity", 1);

        // Make the tooltip invisible when mouse leaves circle
        tooltip2_1.style("visibility", "hidden");

        // OPTIONALLY, reset visual appearance of highlighted circle
        d3.select(this)
            .attr("r", 3)
            .attr("stroke-width", 1.25)
            .attr("fill", none);


    });

    var tooltip2_2 = d3.select("#left")
        .append("div")
        .attr("class", "tooltip2_2");


    left.circles.on("mouseover", function(d) {
        var name = d.name;
        var cx = +d3.select(this).attr("cx") + 10;
        var cy = +d3.select(this).attr("cy");

        d3.select(this)
            .attr("stroke-width", 3)
            .attr("r", 10)
            .attr("fill", "#323232");

        tooltip2_2.style("visibility", "visible") // make the tooltip visible
            .style("left", cx + "px") // adjust the left (x) position of the tooltip
            .style("top", cy + "px") // adjust the top (y) position of the tooltip
            .html("<b>" + d.name + "</b>" + "<br>" + "In Stat Tuition: " + d.in_state_total + "$" + "<br>" + "￬ " + d.tuition_increase + " then out of state");

        right.circles.attr("opacity", 0.2);

        right.circles.filter(function(e) {
                return e.name === name;
            }).attr("opacity", 1)
            .attr("stroke-width", 3)
            .attr("fill", "#323232")
            .attr("r", 10);

        left.circles.attr("opacity", 0.2);

        d3.select(this).attr("opacity", 1);

    }).on("mouseout", function() {

        right.circles.attr("opacity", 1)
            .attr("r", 3)
            .attr("stroke-width", 1.25)
            .attr("fill", "none");


        left.circles.attr("opacity", 1);

        // Make the tooltip invisible when mouse leaves circle
        tooltip2_2.style("visibility", "hidden");

        // OPTIONALLY, reset visual appearance of highlighted circle
        d3.select(this)
            .attr("r", 3)
            .attr("stroke-width", 1.25)
            .attr("fill", none);


    });
    /*
        var tooltip2 = d3.select("#right")
            .append("div")
            .attr("class", "tooltip");

        right.circle.on("mouseover", function(d) {
            var state = d.state_name;

            var x = +d3.select(this).attr("x") + 20;
            var y = +d3.select(this).attr("y");

            d3.select(this)
                .attr("stroke", "black")
                .attr("fill", "black")
                .attr("stroke-width", 4);

            console.log(x, y);

            tooltip2.style("visibility", "visible") // make the tooltip visible
                .style("left", x + "px") // adjust the left (x) position of the tooltip
                .style("top", y + "px") // adjust the top (y) position of the tooltip
                .html(d.state_name + "<br>" + "Mind Career Income: " + d.average_mid_career + " USD" + "<br>" + "Increased: " + ((d.average_mid_career - d.average_early_career)) + " USD");

            left.circles.attr("opacity", 0.2);

            left.circles.filter(function(e) {
                    return e.state_name === state;
                }).attr("opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 4)
                .attr("r", 15); //d3 selections,

                right.circles.attr("opacity", 0.2);
            d3.select(this).attr("opacity", 1);

        }).on("mouseout", function() {

            left.circles.attr("opacity", 1);
            left.circles.attr("fill", function(d) { return d.color; });
            left.circles.attr("stroke", "none");
            left.circles.attr("r", 7)

            bar.bars.attr("opacity", 1)
            bar.bars.attr("fill", function(d) { return d.color; });

            tooltip2.style("visibility", "hidden");

            d3.select(this)
                .attr("stroke", "none");





        }); */

});