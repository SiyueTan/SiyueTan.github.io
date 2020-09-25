var promises = [
    d3.csv("./data/museum.csv"),
    d3.json("./geojson/custom.geo.json")
];


Promise.all(promises).then(function(data) {


    var museumData = data[0];
    console.log(museumData);


    var world = data[1];
    console.log(world)


    var width = document.querySelector("#chart").clientWidth;
    var height = document.querySelector("#chart").clientHeight;
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


    //const maxValue = d3.max(data, function(d) {
    // return +d.value;
    //});
    var projection = d3.geoMercator()
        .translate([width / 2, height / 2])
        .scale(300)
        .fitSize([width, height], world);


    var path = d3.geoPath()
        .projection(projection);

    svg.selectAll("path")
        .data(world.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "state")
        .attr("fill", function(d) {
            let iso = d.properties.sov_a3;
            let found = false;
            console.log(iso);
            data.forEach(function(fd) {
                console.log(“fd”, fd.sov_a3);
                if (iso === fd.sov_a3) {
                    console.log(“FOUND”);
                    found = true;
                }
            });
            console.log(“foundvalue”, found);
            if (!found) {
                return " gray";
            } else {
                return "orange";
            }
            /*let iso = d.properties.sov_a3;
            let found = false;

            //let value;
            // console.log(iso);
            // console.log(found)
            data.forEach(function(fd) {
                if (iso === fd.sov_a3) {
                    //console.log(found)
                    found = true;

                }
            });

            console.log(found)
            if (!found) {
                console.log(found)
                return "orange";
            } else {
                return "grey";
            }*/
        });






    var c = svg.selectAll("circle")
        .data(museumData, function(d) { return d.ID; })

    //console.log(museumData)


    c.enter().append("circle")
        .attr("cx", function(d) {
            var proj = projection([d.longtitude, d.latitude]);
            return proj[0];
        }).attr("cy", function(d) {
            var proj = projection([d.longtitude, d.latitude]);
            return proj[1];
        }).attr("r", 3)
        //.attr("opacity", 0)
        .attr("fill", "#CC0000")



    svg.selectAll("circle")
        .on("mouseover", function(d) {

            var cx = +d3.select(this).attr("cx");
            var cy = +d3.select(this).attr("cy");

            tooltip.style("visibility", "visible") // make the tooltip visible
                .style("left", cx + "px") // adjust the left (x) position of the tooltip
                .style("top", cy + "px") // adjust the top (y) position of the tooltip
                .html(d.MuseumName + "<br>" + "Rank:" + d.Rank + "<br>");

            // OPTIONALLY, also highlight the circle:
            d3.select(this)
                .attr("stroke", "white")

            .attr("stroke-width", 3);

        }).on("mouseout", function() {

            // Make the tooltip invisible when mouse leaves circle
            tooltip.style("visibility", "hidden");

            // OPTIONALLY, reset visual appearance of highlighted circle
            d3.select(this)

            .attr("stroke", "none");


        })



    var tooltip = d3.select("#chart")
        .append("div")
        .attr("class", "tooltip");







});