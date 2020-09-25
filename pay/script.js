d3.csv("data/Data.csv").then(function(data) {
    /*
    BOSTON CRIME DATA from the BOSTON POLICE DEPARTMENT, 2018
    Adapted from:
    https://www.kaggle.com/ankkur13/boston-crime-data/
    */
    console.log(data);

    var width = document.querySelector("#scatterplot").clientWidth;
    var height = document.querySelector("#scatterplot").clientHeight;
    var margin = { top: 50, left: 150, right: 50, bottom: 100 };





    var svg = d3.select("#scatterplot")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    var averageDebt = 32731;

    var publicSchool = data.filter(function(d) {
        return d.type == "Public";
    });

    var average = data.filter(function(d) {
        return d.rank == 0;
    });

    console.log(average)

    var allSchool = data.filter(function(d) {
        return d.name;
    });

    var Debt = data.filter(function(d) {
        return d.rank == "Debt";
    });


    var xScale = d3.scaleLinear()
        .domain([0, 80000])
        .range([margin.left, width - margin.right]);

    var yScale = d3.scaleLinear()
        .domain([30000, 170000])
        .range([height - margin.bottom, margin.top]);

    /*
    DRAW AXES
    */
    var xAxis = svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale).tickFormat(d3.format("$")).ticks(5));

    var yAxis = svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale).tickFormat(d3.format("$")).ticks(5));

    /*
    DRAW AXIS LABELS
    */
    var xAxisLabel = svg.append("text")
        .attr("class", "axisLabel")
        .attr("x", width / 2)
        .attr("y", height - 30)
        .attr("text-anchor", "middle")
        .text("Pay?");

    var yAxisLabel = svg.append("text")
        .attr("class", "axisLabel")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", margin.left / 2)
        .attr("text-anchor", "middle")
        .text("Make?");

    console.log(yAxisLabel)

    var Debt = svg.selectAll("Debt.line")
        .data(Debt, function(d) { return d.rank; })
        .enter()
        .append("line")
        .attr("class", "Debt")
        .attr("y1", function(d) { return yScale(d.out_of_state_total); })
        .attr("y2", function(d) { return yScale(d.out_of_state_total); })
        .attr("x1", margin.left)
        .attr("x2", width - margin.right)
        .attr("stroke", "white")
        .attr("opacity", 0.8)
        .attr("stroke-width", 0);

    var Debtlabel = svg.append("text")
        .attr("class", "DebtT")
        .attr("y", function(d) { return yScale(averageDebt); })
        .attr("x", margin.left)
        .text(averageDebt)
        .attr("fill", "white")
        .attr("font-size", "8")
        .attr("transform", "translate(20 0)")
        .attr("opacity", 0);


    var earycareer = svg.selectAll("average.line")
        .data(average, function(d) { return d.rank; })
        .enter()
        .append("line")
        .attr("class", "earlyCareer")
        .attr("y1", function(d) { return yScale(d.early_career_pay); })
        .attr("y2", function(d) { return yScale(d.early_career_pay); })
        .attr("x1", margin.left)
        .attr("x2", width - margin.right)
        .attr("stroke", function(d) { return d.Color; })
        .attr("stroke-width", 0);

    var eclabel = svg.selectAll("average.text")
        .data(average, function(d) { return d.rank; })
        .enter()
        .append("text")
        .attr("class", "earlyCareerT")
        .attr("y", function(d) { return yScale(d.early_career_pay); })
        .attr("x", margin.left)
        .text(function(d) { return d.early_career_pay; })
        .attr("fill", "white")
        .attr("font-size", "8")
        .attr("transform", "translate(20 0)")
        .attr("opacity", 0);

    var tuitionout = svg.selectAll("average.line")
        .data(average, function(d) { return d.rank; })
        .enter()
        .append("line")
        .attr("class", "averageTuition")
        .attr("x1", function(d) { return xScale(d.out_of_state_total); })
        .attr("x2", function(d) { return xScale(d.out_of_state_total); })
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom)
        .attr("stroke", function(d) { return d.Color; })
        .attr("stroke", function(d) { return d.Color; })
        .attr("stroke-width", 0);

    var atlabel = svg.selectAll("average.text")
        .data(average, function(d) { return d.rank; })
        .enter()
        .append("text")
        .attr("class", "averageTuitionT")
        .attr("y", margin.top)
        .attr("x", function(d) { return xScale(d.out_of_state_total); })
        .text(function(d) { return d.out_of_state_total; })
        .attr("fill", "white")
        .attr("font-size", "8")
        .attr("transform", "translate(10 20)")
        .attr("opacity", 0);

    var midcareer = svg.selectAll("average.line")
        .data(average, function(d) { return d.rank; })
        .enter()
        .append("line")
        .attr("class", "midCareer")
        .attr("y1", function(d) { return yScale(d.mid_career_pay); })
        .attr("y2", function(d) { return yScale(d.mid_career_pay); })
        .attr("x1", margin.left)
        .attr("x2", width - margin.right)
        .attr("stroke", function(d) { return d.Color; })
        .attr("stroke-width", 0);

    var mclabel = svg.selectAll("average.text")
        .data(average, function(d) { return d.rank; })
        .enter()
        .append("text")
        .attr("class", "midCareerT")
        .attr("y", function(d) { return yScale(d.mid_career_pay); })
        .attr("x", margin.left)
        .text(function(d) { return d.mid_career_pay; })
        .attr("fill", "white")
        .attr("font-size", "8")
        .attr("transform", "translate(20 0)")
        .attr("opacity", 0);


    var line1 = svg.selectAll("allSchool.line")
        .data(allSchool, function(d) { return d.name; })
        .enter()
        .append("line")
        .attr("class", "connection")
        .attr("x1", function(d) { return xScale(d.out_of_state_total); })
        .attr("x2", function(d) { return xScale(d.out_of_state_total); })
        .attr("y1", function(d) { return yScale(d.early_career_pay); })
        .attr("y2", function(d) { return yScale(d.mid_career_pay); })
        .attr("stroke", function(d) { return d.Color; })
        .attr("stroke-width", 1.5)
        .attr("opacity", 0.2);


    /*var circles = svg.selectAll("publicSchool.circle")
        .data(publicSchool, function(d) { return d.name; })
        .enter()
        .append("circle")
        .attr("cx", function(d) { return xScale(d.in_state_total); })
        .attr("cy", function(d) { return yScale(d.early_career_pay); })
        .attr("r", 3)
        .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("stroke", function(d) { return d.Color; });*/


    var circles1 = svg.selectAll("allSchool.circle")
        .data(allSchool, function(d) { return d.name; })
        .enter()
        .append("circle")
        .attr("cx", function(d) { return xScale(d.out_of_state_total); })
        .attr("cy", function(d) { return yScale(d.early_career_pay); })
        .attr("r", 3)
        .attr("fill", "none")
        .attr("stroke-width", 1.25)
        .attr("stroke", function(d) { return d.Color; });

    var circles2 = svg.selectAll("allSchool.circle")
        .data(allSchool, function(d) { return d.name; })
        .enter()
        .append("circle")
        .attr("cx", function(d) { return xScale(d.out_of_state_total); })
        .attr("cy", function(d) { return yScale(d.mid_career_pay); })
        .attr("r", 3)
        .attr("fill", function(d) { return d.Color; });

    /*var rect = svg.selectAll("allSchool.rect")
        .data(allSchool, function(d) { return d.name; })
        .enter()
        .append("rect")
        .attr("x", function(d) { return xScale(d.out_of_state_total) - 3; })
        .attr("y", function(d) { return yScale(d.mid_career_pay) - 3; })
        .attr("width", 6)
        .attr("height", 6)
        .attr("fill", function(d) { return d.Color; });*/




    // tooltip on1
    var tooltip = d3.select("#scatterplot")
        .append("div")
        .attr("class", "tooltip");


    circles1.on("mouseover", function(d) {
        var name = d.name;

        var cx = +d3.select(this).attr("cx") + 10;
        var cy = +d3.select(this).attr("cy");

        d3.select(this)
            .attr("stroke-width", 3)
            .attr("fill", "#323232")
            .attr("r", 9);

        tooltip.style("visibility", "visible") // make the tooltip visible
            .style("left", cx + "px") // adjust the left (x) position of the tooltip
            .style("top", cy + "px") // adjust the top (y) position of the tooltip
            .html("<b>" + d.name + "</b>" + "<br>" + "Tuition: " + d.out_of_state_total + "$" + "<br>" + "Early Career Salary: " + d.early_career_pay + "$");

        circles2.attr("opacity", 0.1);
        circles1.attr("opacity", 0.1);
        line1.attr("opacity", 0.1);


        d3.select(this).attr("opacity", 1);



        circles2.filter(function(e) {
            return e.name === name;
        }).attr("opacity", 1)


        line1.filter(function(e) {
            return e.name === name;
        }).attr("opacity", 1)



    }).on("mouseout", function() {

        line1.attr("opacity", 0.2);

        circles2.attr("opacity", 1);


        // Make the tooltip invisible when mouse leaves circle
        tooltip.style("visibility", "hidden");

        // OPTIONALLY, reset visual appearance of highlighted circle
        d3.select(this)
            .attr("stroke-width", 1.25)
            .attr("fill", "none")
            .attr("r", 3);

        circles1.attr("opacity", 1);




    });

    //tooltip to2

    var tooltip2 = d3.select("#scatterplot")
        .append("div")
        .attr("class", "tooltip2");


    circles2.on("mouseover", function(d) {
        var name = d.name;

        var cx = +d3.select(this).attr("cx") + 10;
        var cy = +d3.select(this).attr("cy");

        d3.select(this)
            .attr("r", 10);

        tooltip2.style("visibility", "visible") // make the tooltip visible
            .style("left", cx + "px") // adjust the left (x) position of the tooltip
            .style("top", cy + "px") // adjust the top (y) position of the tooltip
            .html("<b>" + d.name + "</b>" + "<br>" + "Tuition: " + d.out_of_state_total + "$" + "<br>" +
                "Mid Career Salary: " + d.mid_career_pay + "<br>" + "Compare to Early Career: ↑ " + d.salary_increase);

        circles2.attr("opacity", 0.1);
        circles1.attr("opacity", 0.1);
        line1.attr("opacity", 0.1);


        d3.select(this).attr("opacity", 1);


        circles1.filter(function(e) {
            return e.name === name;
        }).attr("opacity", 1);

        line1.filter(function(e) {
            return e.name === name;
        }).attr("opacity", 1);


    }).on("mouseout", function() {

        line1.attr("opacity", 0.2);

        circles1.attr("opacity", 1);


        // Make the tooltip invisible when mouse leaves circle
        tooltip2.style("visibility", "hidden");

        // OPTIONALLY, reset visual appearance of highlighted circle
        d3.select(this)
            .attr("r", 3);

        circles2.attr("opacity", 1);

    });




    var filters = { public: 1, private: 1, tuition: 1, earlyCareer: 1, midCareer: 1, debt: 1 };

    d3.select("#average4").on("click", function() {
        if (filters.public == 1) {

            var c = svg.selectAll("circle").filter(function(d) {
                return d.type === "Public";
            }).attr("r", 0);

            var l = svg.selectAll(".connection").filter(function(d) {
                return d.type === "Public";
            }).attr("stroke-width", 0);


            filters.public = 0;

        } else if (filters.public == 0) {

            var c = svg.selectAll("circle").filter(function(d) {
                return d.type === "Public";
            }).attr("r", 3);

            var l = svg.selectAll(".connection").filter(function(d) {
                return d.type === "Public";
            }).attr("stroke-width", 1);


            filters.public = 1;


        }


    });


    d3.select("#average5").on("click", function() {
        if (filters.private == 1) {

            var c = svg.selectAll("circle").filter(function(d) {
                return d.type === "Private";
            }).attr("r", 0);

            var l = svg.selectAll(".connection").filter(function(d) {
                return d.type === "Private";
            }).attr("stroke-width", 0);




            filters.private = 0;

        } else if (filters.private == 0) {

            var c = svg.selectAll("circle").filter(function(d) {
                return d.type === "Private";
            }).attr("r", 3);

            var l = svg.selectAll(".connection").filter(function(d) {
                return d.type === "Private";
            }).attr("stroke-width", 1);



            filters.private = 1;


        }


    });


    d3.select("#average2").on("click", function() {
        if (filters.earlyCareer == 1) {

            var ec = svg.selectAll(".earlyCareer").filter(function(d) {
                return d.rank === "0";
            }).attr("stroke-width", 2);

            var ect = svg.selectAll(".earlyCareerT").filter(function(d) {
                return d.rank === "0";
            }).attr("opacity", 1);

            filters.earlyCareer = 0;

        } else if (filters.earlyCareer == 0) {

            var ec = svg.selectAll(".earlyCareer").filter(function(d) {
                return d.rank === "0";
            }).attr("stroke-width", 0);

            var ect = svg.selectAll(".earlyCareerT").filter(function(d) {
                return d.rank === "0";
            }).attr("opacity", 0);

            filters.earlyCareer = 1;

        }
    });

    d3.select("#average25").on("click", function() {
        if (filters.midCareer == 1) {

            var ec = svg.selectAll(".midCareer").filter(function(d) {
                return d.rank === "0";
            }).attr("stroke-width", 2);

            var ect = svg.selectAll(".midCareerT").filter(function(d) {
                return d.rank === "0";
            }).attr("opacity", 1);

            filters.midCareer = 0;

        } else if (filters.midCareer == 0) {

            var ec = svg.selectAll(".midCareer").filter(function(d) {
                return d.rank === "0";
            }).attr("stroke-width", 0);

            var ect = svg.selectAll(".midCareerT").filter(function(d) {
                return d.rank === "0";
            }).attr("opacity", 0);

            filters.midCareer = 1;

        }
    });


    d3.select("#average1").on("click", function() {
        if (filters.tuition == 1) {

            var at = svg.selectAll(".averageTuition").filter(function(d) {
                return d.rank === "0";
            }).attr("stroke-width", 2);

            var att = svg.selectAll(".averageTuitionT").filter(function(d) {
                return d.rank === "0";
            }).attr("opacity", 1);

            filters.tuition = 0;

        } else if (filters.tuition == 0) {

            var at = svg.selectAll(".averageTuition").filter(function(d) {
                return d.rank === "0";
            }).attr("stroke-width", 0);

            var att = svg.selectAll(".averageTuitionT").filter(function(d) {
                return d.rank === "0";
            }).attr("opacity", 0);

            filters.tuition = 1;

        }


    });


    d3.select("#average3").on("click", function() {
        if (filters.debt == 1) {

            var d = svg.selectAll(".Debt").filter(function(d) {
                return d.rank === "Debt";
            }).attr("stroke-width", 2);

            var dt = svg.selectAll(".DebtT")
                .attr("opacity", 1);

            filters.debt = 0;

        } else if (filters.debt == 0) {

            var d = svg.selectAll(".Debt").filter(function(d) {
                return d.rank === "Debt";
            }).attr("stroke-width", 0);

            var dt = svg.selectAll(".DebtT")
                .attr("opacity", 0);

            filters.debt = 1;

        }


    });





});