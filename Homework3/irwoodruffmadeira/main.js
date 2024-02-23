let typeFilter = 2
const width = window.innerWidth;
const height = window.innerHeight;

let scatterLeft = 0, scatterTop = 0;
let scatterMargin = {top: 30, right: 30, bottom: 30, left: 60},
    scatterWidth = 600 - scatterMargin.left - scatterMargin.right,
    scatterHeight = 300 - scatterMargin.top - scatterMargin.bottom;

let distrLeft = 400, distrTop = 0;
let distrMargin = {top: 10, right: 30, bottom: 30, left: 60},
    distrWidth = 400 - distrMargin.left - distrMargin.right,
    distrHeight = 350 - distrMargin.top - distrMargin.bottom;

let teamLeft = 0, teamTop = 450;
let teamMargin = {top: 10, right: 30, bottom: 30, left: 60},
    teamWidth = width - teamMargin.left - teamMargin.right,
    teamHeight = height-450 - teamMargin.top - teamMargin.bottom;





d3.csv("./pokemon.csv").then(rawData =>{
    // console.log("rawData", rawData);
    
    rawData.forEach(function(d){
        d.Type = d.Type_1;
        d.HP = Number(d.HP);
        d.speed = Number(d.Speed);
        d.gen = Number(d.Generation);
        d.Attack = Number(d.Attack);
    });
    


    // rawData = rawData.filter(d=>d.Type>typeFilter);
    // console.log(rawData);
    rawData = rawData.map(d=>{
                          return {
                              "Speed":d.speed,
                              "HP":d.HP,
                              "Generation":d.gen,
                              "Attack":d.Attack
                          };
    });
    console.log(rawData);
    
//plot 1
    const svg = d3.select("svg")

    const g1 = svg.append("g")
                .attr("width", scatterWidth + scatterMargin.left + scatterMargin.right)
                .attr("height", scatterHeight + scatterMargin.top + scatterMargin.bottom)
                .attr("transform", `translate(${scatterMargin.left}, ${scatterMargin.top})`)

    // X label
    // g1.append("text")
    // .attr("x", scatterWidth / 2)
    // .attr("y", scatterHeight + 50)
    // .attr("font-size", "20px")
    // .attr("text-anchor", "middle")
    // .text("HP")
    

    // // Y label
    // g1.append("text")
    // .attr("x", -(scatterHeight / 2))
    // .attr("y", -40)
    // .attr("font-size", "20px")
    // .attr("text-anchor", "middle")
    // .attr("transform", "rotate(-90)")
    // .text("Speed")

    // // title 
    // g1.append("text")
    //     .attr("x", (scatterWidth / 2))             
    //     .attr("y", 0 - (scatterMargin / 2))
    //     .attr("text-anchor", "middle")  
    //     .style("font-size", "16px") 
    //     .style("text-decoration", "underline")  
    //     .text("Speed Vs. HP in all Pokemon")

    // X ticks
    const x1 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.HP)])
    .range([0, scatterWidth])

    const xAxisCall = d3.axisBottom(x1)
                        .ticks(7)
    g1.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall)
    .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)")

    // console.log(rawData);
    // Y ticks
    const y1 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.Speed)])
    .range([scatterHeight, 0])

    const yAxisCall = d3.axisLeft(y1)
                        // .ticks(13)
    g1.append("g").call(yAxisCall)

    rawDataG = rawData.filter(d=>d.Generation>=typeFilter);
    console.log(rawDataG)
    const rects = g1.selectAll("circle").data(rawDataG)

    rects.enter().append("circle")
         .attr("cx", function(d){
            //  console.log(d.HP)
             return x1(d.HP);
         })
         .attr("cy", function(d){
            // console.log(d.Speed)
             return y1(d.Speed);
         })
         .attr("r", 1.5)
         .attr("fill", "#69b3a2")

 //color: #69b3a2 
    rawDataF = rawData.filter(d=>d.Generation<typeFilter); 
    console.log(rawDataF)
    const rects3 = g1.selectAll("circle").data(rawDataF)
  //  console.log(rects3)
        rects3.enter().append("circle")
        .attr("cx", function(d){
            //  console.log(d.HP)
            return x1(d.HP);
        })
        .attr("cy", function(d){
            // console.log(d.Speed)
            return y1(d.Speed);
        })
        .attr("r", 1.5)
        .attr("fill", "#69b3a2")
        rects3.transition()
        .duration(2500)
        .style("fill", "blue")
        // .attr('cx', 600)
        // .attr('cy', 300)
        ;

//space
    const g2 = svg.append("g")
                .attr("width", distrWidth + distrMargin.left + distrMargin.right)
                .attr("height", distrHeight + distrMargin.top + distrMargin.bottom)
                .attr("transform", `translate(${distrLeft}, ${distrTop})`)


                brush
                var brush = d3.brush()
                .extent([[0, 0], [scatterWidth, scatterHeight]])
                .on("start", brushed)
                .on("brush", brushed)
                .on("end", endbrushed)
                ;


                function brushed() {
                var extent = d3.event.selection;
                genders = [0,0];
                rects
                .classed("selected", function(d) {
                    selected = x1(d.x) >= extent[0][0] &&
                    g1(d.x) <= extent[1][0] &&
                    g1(d.y) >= extent[0][1] &&
                    g1(d.y) <= extent[1][1];
                    if( selected && d.gender === 1) 
                    genders[0]++;
                    else if(sselected && d.gender === 0) genders[1]++;
                    return selected;
                    })
                rects3
                .classed("selected", function(d) {
                selected = x1(d.x) >= extent[0][0] &&
                g1(d.x) <= extent[1][0] &&
                g1(d.y) >= extent[0][1] &&
                g1(d.y) <= extent[1][1];
                if( selected && d.gender === 1) 
                genders[0]++;
                else if(selected && d.gender === 0) genders[1]++;
                return selected;
                });
                }
                function endbrushed() {
                g1.data("circle").attr("fill", "red")
                // .attr("y", (d, i)=> i*20)
                // .text((d,i) => `${d}`+': '+`${genders[i]}`)
                }


//plot 2
    
    q = rawData.reduce((s, { Generation }) => (s[Generation] = (s[Generation] || 0) + 1, s), {});
    //console.log(q)
    r = Object.keys(q).map((key) => ({ Generation: key, count: q[key] }));
   // console.log(r);

           
    const g3 = svg.append("g")
                .attr("width", teamWidth + teamMargin.left + teamMargin.right)
                .attr("height", teamHeight + teamMargin.top + teamMargin.bottom)
                .attr("transform", `translate(${teamMargin.left}, ${teamTop})`)

    // X label
    g3.append("text")
    .attr("x", teamWidth / 2)
    .attr("y", teamHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Generation")
    

    // Y label
    g3.append("text")
    .attr("x", -(teamHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Number of Pokemon")

    // title - overlapping other title rn
    g3.append("text")
    .attr("x", (teamWidth / 2))             
    .attr("y", 0 - (teamMargin / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("Number of Pokemon per Generation")

    // X ticks
    const x2 = d3.scaleBand()
    .domain(r.map(d => d.Generation))
    .range([0, teamWidth])
    .paddingInner(0.3)
    .paddingOuter(0.2)

    const xAxisCall2 = d3.axisBottom(x2)
    g3.append("g")
    .attr("transform", `translate(0, ${teamHeight})`)
    .call(xAxisCall2)
    .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)")

    // Y ticks
    const y2 = d3.scaleLinear()
    .domain([0, d3.max(r, d => d.count)])
    .range([teamHeight, 0])

    const yAxisCall2 = d3.axisLeft(y2)
                        .ticks(6)
    g3.append("g").call(yAxisCall2)

    const rects2 = g3.selectAll("rect").data(r)

    rects2.enter().append("rect")
    .attr("y", d => y2(d.count))
    .attr("x", (d) => x2(d.Generation))
    .attr("width", x2.bandwidth)
    .attr("height", d => teamHeight - y2(d.count))
    .attr("fill", "grey")


// plot 3 - parallel plot
// plottig HP, speed, attack for generation 1

    rawDataF = rawData.filter(d=>d.Generation<typeFilter);
    console.log(rawData)
   // keys = rawData[0].keys()
   // console.log(rawData.columns) 
    keys = d3.keys(rawData[0]).filter(function(d){
        return d != "Generation";
    })
    console.log(keys)
    // chart dimensions for parallel plot
    let pWidth = 800
    pHeight = keys.length *120;
    pMarginTop = 25;
    pMarginRight = 10;
    pMarginBottom = 30;
    pMarginLeft = 400;

    const x3 = new Map(Array.from(keys, key=> [key, d3.scaleLinear(d3.extent(rawDataF, d=>d[key]),[pMarginLeft, pWidth - pMarginRight])]));
    console.log(x3)
    const y = d3.scalePoint(keys, [pMarginTop, pHeight - pMarginBottom]);

    const g4 = svg.append("g")
    .attr("width", pWidth + pMarginLeft + pMarginRight)
    .attr("height", pHeight + pMarginTop + pMarginBottom)
    .attr("transform", `translate(${pMarginLeft}, ${pMarginTop})`)

      //Title
      g4.append("text")
      .attr("x", 200+ (pWidth /2))             
      .attr("y", 10 - (pMarginTop / 2))
      .attr("text-anchor", "middle")  
      .style("font-size", "16px") 
      .style("text-decoration", "underline")  
      .text("Generation 1: Speed, HP, and Attack")

  // Append the lines.
  const line = d3.line()
    .defined(([, value]) => value != null)
    .x(([key, value]) => x3.get(key)(value))
    .y(([key]) => y(key));

    g4.append("g")
    .attr("fill", "none")
    .attr("stroke-width", 1.5)
    .attr("stroke-opacity", 0.4)
  .selectAll("path")
  .data(rawDataF)
  .join("path")
    .attr("stroke", "green")
    .attr("d", d => line(d3.cross(keys, [d], (key, d) => [key, d[key]])))
  .append("title")
    .text(d => d.name);



      // Append the axis for each key.
  g4.append("g")
  .selectAll("g")
  .data(keys)
  .join("g")
    .attr("transform", d => `translate(0,${y(d)})`)
    .each(function(d) { d3.select(this).call(d3.axisBottom(x3.get(d))); })
    .call(g4 => g4.append("text")
      .attr("x", pMarginLeft)
      .attr("y", -6)
      .attr("text-anchor", "start")
      .attr("fill", "currentColor")
      .text(d => d))
    .call(g4 => g4.selectAll("text")
      .clone(true).lower()
      .attr("fill", "none")
      .attr("stroke-width", 5)
      .attr("stroke-linejoin", "round")
      .attr("stroke", "white"));



      return Object.assign(g4.node());

      

}).catch(function(error){
    console.log(error);
});

