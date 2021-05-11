console.log(d3);

radialTreeData = async function getCsvRadialTree() {
    var response = await d3.csv('data/FarmOS.csv');
    return response
}

radialTreeData().then(function (csv) {
    console.log(csv);
    var radialTree = document.querySelector('.radialTree');

    var color = d3.scaleOrdinal()
        .domain(["Logs", "Assets", "People", "Plans"])
        .range(d3.schemeDark2);

    function setColor(d) {
        var name = d.data.name;
        d.color = color.domain().indexOf(name) >= 0 ? color(name) : d.parent ? d.parent.color : null;
        if (d.children) d.children.forEach(setColor);
    }

    let stratify = d3.stratify()
        .id(function (d) { return d.name; })
        .parentId(function (d) { return d.parent; });

    let data = stratify(csv);

    var width = 954;
    var radius = width / 2;

    let tree = d3.tree()
        .size([2 * Math.PI, radius])
        .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

    const root = tree(data);
    setColor(root);
    const svg = d3.create("svg");
    const g = svg.append('g');

    //lines
    g.append("g")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(root.links())
        .join("path")
        .attr("stroke", "#555")
        .attr("d", d3.linkRadial()
            .angle(d => d.x)
            .radius(d => d.y))
        .each(function (d) { d.target.linkNode = this; })
        //.attr("d", linkConstant)
        .attr("stroke", d => d.target.color);

    //circles
    g.append("g")
        .selectAll("circle")
        .data(root.descendants())
        .join("circle")
        .attr("transform", d => `
                    rotate(${d.x * 180 / Math.PI - 90})
                    translate(${d.y},0)
                  `)
        .attr("fill", d => d.children ? "#555" : "#999")
        .attr("r", 2.5);

    //text
    var text = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .selectAll("text")
        .data(root.descendants())
        .join("text")
        .on('click', clicked, false)
        .attr("transform", d => `
                    rotate(${d.x * 180 / Math.PI - 90}) 
                    translate(${d.y},0) 
                    rotate(${d.x >= Math.PI ? 180 : 0})
                `)
        .attr("dy", "0.15em")
        .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
        .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
        .attr('fill', 'white')
        .text(d => d.data.name);


    var BBox;

    svg
        .attr('width', 800)
        .attr('height', 800)
        .attr("viewBox", autoBox)
        .on('click', rest);

    //zoom interaction
    var radialZoom = d3.zoom()
        .scaleExtent([1, 4])
        .on('zoom', zoomed);

    g.call(radialZoom);

    function autoBox() {
        radialTree.appendChild(this);
        BBox = this.getBBox();
        const { x, y, width, height } = this.getBBox();
        return [x, y, width, height];
    }

    function zoomed({ transform }) {
        g.attr("transform", transform);
    }

    function clicked(e, d) {
        text.attr('fill', 'white');
        g.transition().duration(750).call(radialZoom.transform,
            d3.zoomIdentity
                .scale(4)
                .translate(-d.y * (Math.cos((Math.PI) * (d.x * 180 / Math.PI - 90) / 180).toFixed(6)),
                    -d.y * (Math.sin((Math.PI) * (d.x * 180 / Math.PI - 90) / 180).toFixed(6)))
        );
        d3.select(this).attr('fill', '#66FF00');
    }


    function rest(e) {
        if (e.target.nodeName != 'text') {
            console.log('rest is running');
            g.transition().duration(750).call(
                radialZoom.transform,
                d3.zoomIdentity,
                d3.zoomTransform(svg.node()).invert([0, 0])
            );
        }
    }

    console.log(123)
});

