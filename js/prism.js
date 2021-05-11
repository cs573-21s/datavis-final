function tooltipHtml(d) {	/* function to create html content string in tooltip div. */
    var tooltip = "<table><h4>" + d.name + "</h4>";

    if (d.Activity > 0) tooltip += "<tr><td>Activities</td><td>" + (d.Activity) + "</td></tr>"
    if (d.Observation > 0) tooltip += "<tr><td>Observations</td><td>" + (d.Observation) + "</td></tr>"
    if (d.Seeding > 0) tooltip += "<tr><td>Seedings</td><td>" + (d.Seeding) + "</td></tr>"
    if (d.Transplanting > 0) tooltip += "<tr><td>Tansplantings</td><td>" + (d.Transplanting) + "</td></tr>"
    if (d.Harvest > 0) tooltip += "<tr><td>Harvests</td><td>" + (d.Harvest) + "</td></tr>"
    if (d.Input > 0) tooltip += "<tr><td>Inputs</td><td>" + (d.Input) + "</td></tr>"
    if (d.Soil > 0) tooltip += "<tr><td>Soil Tests</td><td>" + (d.Soil) + "</td></tr>"
    tooltip += "<tr><td>Total Logs</td><td>" + (d.Logs) + "</td></tr>"
    "</table>";
    return tooltip;
}


console.log(d5);

d5.json("https://raw.githubusercontent.com/zihao777/datavis-final/main/data/farm3.json").then(function (geo) {
    d5.csv('https://raw.githubusercontent.com/zihao777/datavis-final/main/data/farm_logs.csv').then(function (flogs) {


        var color_scale = d5.scaleQuantize([1, 120], d5.schemeYlGn[9]);

        var farm_logs = flogs;
        console.log(farm_logs);

        var log_id = d5.map(flogs, d => d.id);
        console.log(log_id);

        var test = log_id.get(2);
        console.log(test);
        console.log(tooltipHtml(test));

        var fixed = geo.features.map(function (feature) {
            return turf.rewind(feature, { reverse: true });
        })
        geo.features = fixed;

        var scale = 720058;
        var x = 881084.6;
        var y = 551059.9;
        var projection = d5.geoEquirectangular()
            .translate([x, y])
            .scale(scale);

        var geoGenerator = d5.geoPath()
            .projection(projection);

        // Join the FeatureCollection's features array to path elements
        var svg = d5.select('#prism')
            .append('svg')
            .attr('width', 960)
            .attr('height', 600)
            .selectAll('path')
            .data(geo.features);

        // create a tooltip
        var Tooltip = d5.select("#prism")
            .append("div")
            .attr("class", "tooltip")


        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function (d) {
            Tooltip
                .style("opacity", 1)
            d5.select(this)
                .style("stroke-width", "2")
                .attr("fill", "#90ee90")
        }
        var mousemove = function (d) {
            var logs = log_id.get(this.id)
            Tooltip
                .html(tooltipHtml(logs))
                .style("left", (d5.mouse(this)[0] + 5) + "px")
                .style("top", (d5.mouse(this)[1]) + "px")
        }
        var mouseleave = function (d) {
            Tooltip
                .style("opacity", 0)
            d5.select(this)
                .style("stroke-width", "1")
                .attr('fill', d => color_scale(log_id.get(d.id).Logs))
        }




        function getLogNum(d) {
            return log_id.get(d.id).Logs;
        }



        // Create path elements and update the d attribute using the geo generator
        svg.enter()
            .append('path')
            .attr('d', geoGenerator)
            .attr('fill', d => color_scale(log_id.get(d.id).Logs))
            .attr('stroke', '#000')
            .attr("id", d => d.id)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);

        // console.log("zoom"+121212+d5.zoom)


        // var mapZoom = d5.zoom()
        //     .on('zoom', zoomed);

        // var zoomSettings = d5.zoomIdentity
        //     .translate(881084.6, 551059.9)
        //     .scale(720058);

        // d5.select('#prism')
        //     .call(mapZoom)
        //     .call(mapZoom.transform, zoomSettings)


        // function zoomed(event, d) {
        //     console.log("zoom",event,d)
        //     svg.attr("transform", event.transform);


        //     d5.selectAll('path')
        //         .attr('d', geoGenerator);

        // }
    })

});
