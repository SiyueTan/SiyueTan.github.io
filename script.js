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
        //.translate([width, height])
        //.scale(200)
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


            let iso = d.properties.gu_a3;
            let found = false;
            museumData.forEach(function(fd) {
                if (iso === fd.sov_a3) {

                    found = true;
                    return false; //quite for each

                }
            });

            if (!found) {
                return "#ededed";

            } else {

                return "#c6c6c6";
            }
        });



    var c = svg.selectAll("circle")
        .data(museumData, function(d) { return d.ID; })
        .enter().append("circle")
        .attr("cx", function(d) {
            var proj = projection([d.longtitude, d.latitude]);
            return proj[0];
        }).attr("cy", function(d) {
            var proj = projection([d.longtitude, d.latitude]);
            return proj[1];
        })
        .attr("r", 4)
        .attr("fill-opacity", "0.5")
        .attr("fill", function(d) { return d.Color; })
        .style("stroke", "white")
        .style("stroke-width", "1px");



    svg.selectAll("circle")
        .on("mouseover", function(d) {

            var cx = +d3.select(this).attr("cx") + 10;
            var cy = +d3.select(this).attr("cy");

            tooltip.style("visibility", "visible") // make the tooltip visible
                .style("left", cx + "px") // adjust the left (x) position of the tooltip
                .style("top", cy + "px") // adjust the top (y) position of the tooltip
                .html("<b>" + d.MuseumName + "<br>" + "No." + d.Rank + " in " + d.Country + "</b>" + "<br>" + d.Description);

            // OPTIONALLY, also highlight the circle:
            d3.select(this)
                .attr("r", 10)
                .attr("fill-opacity", "1")
                .attr("fill", function(d) { return d.Color; })



        }).on("mouseout", function() {

            // Make the tooltip invisible when mouse leaves circle
            tooltip.style("visibility", "hidden");

            // OPTIONALLY, reset visual appearance of highlighted circle
            d3.select(this)
                .attr("r", 4)
                .attr("fill-opacity", "0.5")
                .attr("fill", function(d) { return d.Color; })
                .style("stroke", "white")
                .style("stroke-width", "1px");


        })

    var tooltip = d3.select("#chart")
        .append("div")
        .attr("class", "tooltip");


    //sign by me

    /*
    d3.select("#R").on("click", function() {

        var isChecked = d3.select(this).property("checked");

        if (isChecked == true) {
            c.filter(function(d) {
                return d.Me == "1";
            }).attr("opacity", 1);

        } else {
            c.filter(function(d) {
                return d.Me == "1";
            }).attr("opacity", 0);
        }

    });

    d3.select("#C").on("click", function() {

        var isChecked = d3.select(this).property("checked");

        if (isChecked == true) {
            c.filter(function(d) {
                return d.Me == "2";
            }).attr("opacity", 1);

        } else {
            c.filter(function(d) {
                return d.Me == "2";
            }).attr("opacity", 0);
        }

    });*/

    //CHECK everything
    //sign code by continent

    d3.select("#EU").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");

        if (isChecked == true) {
            c.filter(function(d) {
                return d.Continent === "Europe";
            }).classed("hidden", false);

        } else {
            c.filter(function(d) {
                return d.Continent === "Europe";
            }).classed("hidden", true);

        }

    });


    d3.select("#AF").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");

        if (isChecked == true) {
            c.filter(function(d) {
                return d.Continent === "Africa";
            }).classed("hidden", false);


        } else {
            c.filter(function(d) {
                return d.Continent === "Africa";
            }).classed("hidden", true);

        }

    });

    d3.select("#AS").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");
        if (isChecked == true) {
            c.filter(function(d) {
                return d.Continent === "Asia";
            }).classed("hidden", false);

        } else {
            c.filter(function(d) {
                return d.Continent === "Asia";
            }).classed("hidden", true);

        }

    });

    d3.select("#NA").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");
        if (isChecked == true) {
            c.filter(function(d) {
                return d.Continent === "North America";
            }).classed("hidden", false);

        } else {
            c.filter(function(d) {
                return d.Continent === "North America";
            }).classed("hidden", true);

        }

    });

    d3.select("#SA").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");
        if (isChecked == true) {
            c.filter(function(d) {
                return d.Continent === "South America";
            }).classed("hidden", false);

        } else {
            c.filter(function(d) {
                return d.Continent === "South America";
            }).classed("hidden", true);

        }

    });

    d3.select("#OC").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");
        if (isChecked == true) {
            c.filter(function(d) {
                return d.Continent === "Oceania";
            }).classed("hidden", false);

        } else {
            c.filter(function(d) {
                return d.Continent === "Oceania";
            }).classed("hidden", true);

        }

    });

    var filtered_EU = data.filter(function(d) {
        return d.Continent == "Europe";
    });
    var buttons = d3.selectAll("button");

    d3.select("#EU").on("click", function() {

        buttons.classed("selected", false);
        d3.select(this).classed("selected", true);

        var c = svg.selectAll("circle")
            .data(filtered_EU, function(d) { return d.Continent; })
            /*

                    c.enter().append("circle")
                        .attr("cx", function(d) {
                            var proj = projection([d.longtitude, d.latitude]);
                            return proj[0];
                        }).attr("cy", function(d) {
                            var proj = projection([d.longtitude, d.latitude]);
                            return proj[1];
                        })
                        .attr("r", 4)
                        .attr("fill-opacity", "0.5")
                        .attr("fill", function(d) { return d.Color; })
                        .style("stroke", "white")
                        .style("stroke-width", "1px")

                    .merge(c)
                        .transition() // a transition makes the changes visibly apparent...
                        .duration(1500)
                        .attr("cx", function(d) {
                            var proj = projection([d.longtitude, d.latitude]);
                            return proj[0];
                        }).attr("cy", function(d) {
                            var proj = projection([d.longtitude, d.latitude]);
                            return proj[1];
                        }).attr("r", )
                        .attr("fill-opacity", "0.5")
                        .attr("fill", function(d) { return d.Color; })
                        .style("stroke", "white")
                        .style("stroke-width", "1px")


                    c.exit()
                        .transition()
                        .duration(1500)
                        .attr("r", 0)
                        .remove();

                         */
    });


    // DRAW AXIS LABELS

    d3.select("#Choice").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");

        if (isChecked == true) {
            c.filter(function(d) {
                return d.ReviewCount >=5000 && d.Rating >=4.5;
            }).classed("hidden", false);

        } else {
            c.filter(function(d) {
                return d.ReviewCount >=5000 && d.Rating >=4.5;
            }).classed("hidden", true);
        }
        

    });

    


    d3.select("#Art").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");

        if (isChecked == true) {
            c.filter(function(d) {
                return d.MuseumTopic === "Art";
            }).classed("hidden", false);

        } else {
            c.filter(function(d) {
                return d.MuseumTopic === "Art";
            }).classed("hidden", true);
        }

    });

    d3.select("#History").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");

        if (isChecked == true) {
            c.filter(function(d) {
                return d.MuseumTopic === "History";
            }).classed("hidden", false);

        } else {
            c.filter(function(d) {
                return d.MuseumTopic === "History";
            }).classed("hidden", true);
        }


    });

    d3.select("#NHistory").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");

        if (isChecked == true) {
            c.filter(function(d) {
                return d.MuseumTopic === "Natural History";
            }).classed("hidden", false);


        } else {
            c.filter(function(d) {
                return d.MuseumTopic === "Natural History";
            }).classed("hidden", true);

        }


    });

    d3.select("#Science").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");

        if (isChecked == true) {
            c.filter(function(d) {
                return d.MuseumTopic === "Science";
            }).classed("hidden", false);


        } else {
            c.filter(function(d) {
                return d.MuseumTopic === "Science";
            }).classed("hidden", true);

        }


    });

    d3.select("#Specialty").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");

        if (isChecked == true) {
            c.filter(function(d) {
                return d.MuseumTopic === "Specialty Topic ";
            }).classed("hidden", false);

        } else {
            c.filter(function(d) {
                return d.MuseumTopic === "Specialty Topic ";
            }).classed("hidden", true);
        }

    });

    d3.select("#Food").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");

        if (isChecked == true) {
            c.filter(function(d) {
                return d.MuseumTopic === "Food";
            }).classed("hidden", false);

        } else {
            c.filter(function(d) {
                return d.MuseumTopic === "Food";
            }).classed("hidden", true);
        }

    });

    d3.select("#Sport").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");

        if (isChecked == true) {
            c.filter(function(d) {
                return d.MuseumTopic === "Sport";
            }).classed("hidden", false);

        } else {
            c.filter(function(d) {
                return d.MuseumTopic === "Sport";
            }).classed("hidden", true);
        }

    });

    d3.select("#Military").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");

        if (isChecked == true) {
            c.filter(function(d) {
                return d.MuseumTopic === "Military";
            }).classed("hidden", false);

        } else {
            c.filter(function(d) {
                return d.MuseumTopic === "Military";
            }).classed("hidden", true);
        }

    });

    d3.select("#Music").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");

        if (isChecked == true) {
            c.filter(function(d) {
                return d.MuseumTopic === "Music";
            }).classed("hidden", false);

        } else {
            c.filter(function(d) {
                return d.MuseumTopic === "Music";
            }).classed("hidden", true);
        }

    });

    d3.select("#Transportation").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");

        if (isChecked == true) {
            c.filter(function(d) {
                return d.MuseumTopic === "Transportation";
            }).classed("hidden", false);

        } else {
            c.filter(function(d) {
                return d.MuseumTopic === "Transportation";
            }).classed("hidden", true);
        }

    });

    d3.select("#Fun").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");

        if (isChecked == true) {
            c.filter(function(d) {
                return d.MuseumTopic === "Fun & Games";
            }).classed("hidden", false);

        } else {
            c.filter(function(d) {
                return d.MuseumTopic === "Fun & Games";
            }).classed("hidden", true);
        }

    });

    d3.select("#Adult").on("click", function() {
        console.log("testing")
        console.log(c)
        var isChecked = d3.select(this).property("checked");

        if (isChecked == true) {
            c.filter(function(d) {
                return d.MuseumTopic === "Adult";
            }).classed("hidden", false);

        } else {
            c.filter(function(d) {
                return d.MuseumTopic === "Adult";
            }).classed("hidden", true);
        }

    });


    d3.select("#clear").on("click", function() {

        var checkbox = d3.selectAll(".option");

        checkbox.property("checked", false);
        c.classed("hidden", true);

    });

    d3.select("#selectAll").on("click", function() {

        var checkbox = d3.selectAll(".option");

        checkbox.property("checked", true);
        c.classed("hidden", false);

    });

    //create new zoom handole, allow d3 to make svg bigger or smaller

    var zoom = d3.zoom()
        .scaleExtent([1, 8]) //how far in to able be zoom
        .on('zoom', zoomed); //call function named zoomed

    function zoomed() {
        svg.selectAll('path')
            .attr('transform', d3.event.transform);
    }

})