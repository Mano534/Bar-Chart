let url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json',
    xml = new XMLHttpRequest(),
    data,
    values;
    
    
let ALLChartFunction = (data)=>{
    values = data.data;
    // console.log(values);

    let h = 500 ; 
    let w = 750 ;
    let padding = 50 ;
    let dates = values.map(d=>new Date(d[0]))
    // console.log(dataes)

    let svg =  d3.select('body')
      .append('svg')
      .attr('width',w)
      .attr('height',h)
      .style("class",'svg') ; 

    let tooltip = d3.select('.tooltip')
      .attr('id','tooltip')
    

    let title = svg.append('text')
      .text('United States GDP')
      .attr('x',w/2-100)
      .attr("y",5/100*h)
      .attr('id','title')
      .style('font-size',"1.5rem")



    let xScale = d3.scaleLinear()
      .domain([0,values.length-1])
      .range([padding,w-padding])




    let heightScale = d3.scaleLinear()
      .domain([0,d3.max(values,d=>d[1])])
      .range([0,h-padding*2])


    

    let xAxisScale = d3.scaleTime()
      .domain([d3.min(dates),d3.max(dates)])
      .range([padding,w-padding]);




    let yAxisScale = d3.scaleLinear()
      .domain([0,d3.max(values,d=>d[1])])
      .range([h-padding,padding])



    svg.append('g')
    .attr('transform',`translate(0,${h-padding})`)
    .call(d3.axisBottom(xAxisScale))
    .attr('id',"x-axis")


    svg.append('g')
    .attr('transform',`translate(${padding},0)`)
    .call(d3.axisLeft(yAxisScale))
    .attr('id',"y-axis");


    svg.selectAll('rect')
    .data(values)
    .enter()
    .append('rect')
    .attr('width',(w-(padding*2))/(values.length))
    .attr('height',(d)=>heightScale(d[1]))
    .attr('x',(d,i)=>xScale(i))
    .attr('y',d=>(h-padding)-heightScale(d[1]))
    .attr('class','bar')
    .attr('data-date',d=>d[0])
    .attr("data-gdp",d=>d[1])
    .on('mouseover',(d)=>{
        tooltip.style('visibility','visible')
            .text(`${d[0]}`)
        window.addEventListener('mousemove',(e)=>{

            document.querySelector('.tooltip').style.left = e.clientX+30+'px'; 
            document.querySelector('.tooltip').style.top = e.clientY-20+"px"; 
            // console.log(e.x)
        })
        document.querySelector('.tooltip').setAttribute('data-date',d[0])
    })
    .on('mouseout',(d)=>{
        tooltip.style('visibility','hidden')
    })

















}
// console.log(window.MouseEvent.x);





















xml.open('GET',url,true);
xml.onreadystatechange = ()=>{
    if(xml.readyState == 4 && xml.status == 200){
        data = JSON.parse(xml.response);
        ALLChartFunction(data);

    }
}
xml.send();