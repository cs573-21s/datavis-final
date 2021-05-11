
soilTestData = async function getCsvSoilTset() {
    var response = await d3.csv('https://raw.githubusercontent.com/zihao777/datavis-final/main/data/soilTest.csv');
    return response
}

soilTestData().then(function (data) {
    console.log(data);
    width = 800;
    height = 400;
    margin = { top: 50, right: 40, bottom: 50, left: 20 };

    var board = document.querySelector('.board');
    console.log(board)

    shortAttributeNames = new Map(
        Object.entries({
            "Available Water Capacity": "AWC",
            "Aggregate Stability": "AS",
            "Organic Matter": "OM",
            "ACE Soil Protein Index": "ASPI",
            "Soil Respiration": "SP",
            "Active Carbon": "AC",
            "Soil pH": "PH",
            "Extractable Potassium": "EP",
            "Minor Elements": "ME",
            "Overall Quality Score": "SCORE"
        })
    );

    var attributes = data.columns.filter(d => d !== "area");
    var areas = [];

    data.forEach(function (d) {
        areas.push(d["area"]);
    });
    x = d3.scalePoint(attributes, [margin.left, width - margin.right])

    let scales = new Map();

    // TODO: create a suitable scale for each attribute and add it to the map
    attributes.forEach(function (attribute) {
        scales.set(
            attribute,
            d3.scaleLinear().range([height - margin.bottom, margin.top])
                .domain([20, 100]));
    });

    let y = scales;

    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height]);

    const polylines = svg
        .append("g")
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("stroke-opacity", 0.4)
        .selectAll("path")
        .data(data)
        .join("path")
        // TODO: create the polylines
        .attr("stroke", function (d, i) {
            return d3.interpolateTurbo(i / 12);
        })    // use color black for drawing polylines without the color scale (before task 3)
        .attr("d", d => {
            return d3.line()
                .x(([key]) => x(key))                        // x is the attribute
                .y(([key, value]) => y.get(key)(value))     // use y to get the value of the attribute
                (d3.cross(attributes, [d],                     //call the line generator function
                    function (key, d) {
                        return [key, d[key]]
                    }
                ))
        })
        .attr('class', function (d) {
            return d["area"];
        })
        .attr('num', function (d, i) {
            return i;
        })
        .on('mouseover', mouseovered)
        .on('mouseout', mouseouted);

    //add check boxes
    var selectbox = document.querySelector(".select");
    let elementul = document.createElement("ul");
    let showbox = [];
    for (let i = 0; i < 12; i++) {
        showbox[i] = i;
        let elementli = document.createElement("li");
        let elementinput = document.createElement("input");
        elementinput.setAttribute("type", "checkbox");
        elementinput.setAttribute("num", i);
        elementinput.setAttribute("status", 1);
        elementinput.setAttribute("checked", "ckecked");

        elementinput.addEventListener("click", function (e) {
            // console.log(e);
            if (this.getAttribute("status") == 0) {
                this.setAttribute("status", 1);
                showbox[this.getAttribute("num")] = +this.getAttribute("num");
            } else {
                this.setAttribute("status", 0);
                showbox[this.getAttribute("num")] = undefined;
            }
            polylines.attr("stroke", function (d, i) {
                if (showbox.indexOf(i) == -1) {
                    return "none"
                } else {
                    return d3.interpolateTurbo(i / 12);
                }
            }
            )
        })
        elementli.appendChild(elementinput);
        elementspan = document.createElement("span");
        elementspan.innerHTML = areas[i];
        var basic = d3.interpolateTurbo(i / 12).substr(0, d3.interpolateTurbo(i / 12).length - 1);
        basic = basic + ",0.6)"
        console.log(basic)
        elementspan.style.color = basic;
        elementli.appendChild(elementspan);
        elementul.appendChild(elementli);
    }
    selectbox.appendChild(elementul);

    function mouseovered(e) {
        var num = this.getAttribute("num");
        console.log(e.pageX)
        console.log(board)
        board.innerHTML = this.className.animVal;
        board.style.left = (e.pageX + 10) + "px";
        board.style.top = (e.pageY + 10) + "px";
        board.style.display = "block";
        polylines
            .attr("stroke", function (d, i) {
                if (showbox.indexOf(i) == -1) {
                    return "none"
                } else {
                    return 'rgba(192,192,192,0.2)'
                }
            })
            .attr("stroke-opacity", 1)


        this.setAttribute("stroke", d3.interpolateTurbo(num / 12)
        )
    }

    function mouseouted() {
        board.style.display = "none";
        polylines
            .attr("stroke-opacity", 0.4)
            .attr("stroke", function (d, i) {
                if (showbox.indexOf(i) == -1) {
                    return "none"
                } else {
                    return d3.interpolateTurbo(i / 12);
                }
            })
    }

    const axes = svg
        .append("g")
        .selectAll("g")
        .data(attributes)
        .join("g")
        .attr("transform", d => `translate(${x(d)},0)`);

    axes.append("g")
        // match axes to function y to get the scales
        .each(function (d) { d3.select(this).call(d3.axisRight(y.get(d))); })
        // add label for each axis with shortAttributeNames
        .call(b => {
            return b.append("text")
                .attr("x", margin.left - 20)
                .attr("y", 7.5)
                .attr("text-anchor", "start")
                .attr("fill", "currentColor")
                .attr("class", function (d) {
                    return d;
                })
                .text(function (d) {
                    return shortAttributeNames.get(d);
                })
                .attr('transform', 'translate(0,20)')
                .on('mouseover', function (e) {
                    board.innerHTML = this.className.animVal;
                    board.style.left = (e.pageX + 10) + "px";
                    board.style.top = (e.pageY - 10) + "px";
                    board.style.display = "block";
                })
                .on('mouseout', function (e) {
                    board.style.display = "none";
                })
        })
        .call(g => g
            .selectAll("text")
            .clone(true)
            .lower()
            .attr("fill", "none")
            .attr("stroke-with", 5)
            .attr("stroke-linejoin", "round")
            .attr("stroke", "gray"));

    var box = document.querySelector('.box');
    box.appendChild(svg.node())
})
