// Store the URL to a constant
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//  Variable stores resesarch data
let samples_data = [];
let meta_data = [];

// Convert json to object data from URL
d3.json(url).then(function(microbes){
    console.log(microbes)
    setSelectTag(microbes);   
    
});


// Function to populate SELECT tag
function setSelectTag(data){
    samples_data = data.samples;
    meta_data = data.metadata;
    let selectTag = d3.select('#selDataset');
    // Populate select tag with IDs
    for (i=0;i<samples_data.length;i++){
        option = selectTag.append('option').text(samples_data[i].id);
        option = option.attr('value',samples_data[i].id);
    }
    // Variable to store first person data
    let first_person = [];
    let first_person_otu = [];
    // Populate first person data
    for (var j in samples_data[0].otu_ids){
        first_person_otu.push([samples_data[0].otu_ids[j],samples_data[0].otu_labels[j],samples_data[0].sample_values[j]]);
        first_person.push(['OTU '+samples_data[0].otu_ids[j],samples_data[0].otu_labels[j],samples_data[0].sample_values[j]]);
    }
    // Call function to build graph
    buildDemographic(meta_data[0],0);
    buildBar(first_person,0);
    buildBubble(first_person_otu,0);
    //buildGauage(meta_data[0],0)

    
}

// Function to build bar graph
function buildBar(graphdata,status){
    
    let samples = [];
    let otu_ids = [];
    let labels = [];
    for (i=0;i<(graphdata.slice(0,10)).length;i++){
        otu_ids.push(graphdata[i][0]);
        labels.push(graphdata[i][1]);
        samples.push(graphdata[i][2]);
    }
    if (status == 0){
        var bar_prop = [{
            type:'bar',
            x: samples,
            y:otu_ids,
            text:labels,
            orientation:'h',
            transforms: [{
                type: 'sort',
                target: 'x',
                order: 'ascending'
              }]
        }];
        
        var layout = {
            title:'Top 10 OTUs',
            // barmode:'stack'
        }
        Plotly.newPlot('bar',bar_prop,layout);
        
    }
    if (status == 1){
        Plotly.restyle('bar','x',[samples]);
        Plotly.restyle('bar','y',[otu_ids]);
    }
}

// Function to caputre the selected person id and show their OTU's data
function optionChanged(value){
    let id = parseInt(value);
    let individual_data = [];
    let otu_data = [];
    for (i=0;i<samples_data.length;i++){
        if (id == samples_data[i].id){
            this_meta = meta_data[i]
            for (var j in samples_data[i].otu_ids){
                otu_data.push([samples_data[i].otu_ids[j],samples_data[i].otu_labels[j],samples_data[i].sample_values[j]]);
                individual_data.push(['OTU '+samples_data[i].otu_ids[j],samples_data[i].otu_labels[j],samples_data[i].sample_values[j]]);
            }
        }
    }
    buildDemographic(this_meta,1);
    buildBar(individual_data,1);
    buildBubble(otu_data,1);
    //buildGauage(this_meta,1)

}

function buildBubble(bubbledata,status){

    let samples = [];
    let otu_ids = [];
    let labels = [];
    for (i=0;i<bubbledata.length;i++){
        otu_ids.push(bubbledata[i][0]);
        labels.push(bubbledata[i][1]);
        samples.push(bubbledata[i][2]);
    }

    if (status == 0){
        var bubble_prop = [{
            type:'scatter',
            mode:'markers',
            marker:{
                size:samples,
                color:otu_ids,
                //sizemode:'area'
            },
            x:otu_ids,
            y:samples, 
        }];
        var layout = {
            title:'All OTUs',
            // barmode:'stack'
        }
        Plotly.newPlot('bubble',bubble_prop,layout);
    }
    if(status == 1){
        Plotly.restyle('bubble','x',[otu_ids]);
        Plotly.restyle('bubble','y',[samples]);

    }    
}

function buildDemographic(demodata,status){

        let meta = d3.select('#sample-metadata');
        meta.html("");
        meta.append('p').text("id: "+demodata.id);
        meta.append('p').text("Ethnicity: "+demodata.ethnicity);
        meta.append('p').text("Gender: "+demodata.gender);
        meta.append('p').text("Age: "+demodata.age);
        meta.append('p').text("Location: "+demodata.location);
        meta.append('p').text("bbtype: "+demodata.bbtype);
        meta.append('p').text("wfreq: "+demodata.wfreq);


}

// function buildGauage(demodata,status){
    
//     if (status == 0){
//         var trace = [
//             {
//             //set the values and labels and marker colors
//             "values": [9,1,1,1,1,1,1,1,1,1],
//             "labels": [' ','0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
//             'marker':{
//                 'colors':[
//                     'rgb(255, 255, 255)',
//                     'rgb(232, 226, 202)',
//                     'rgb(216, 212, 174)',
//                     'rgb(198, 198, 147)',
//                     'rgb(177, 186, 121)',
//                     'rgb(154, 173, 97)',
//                     'rgb(129, 162, 74)',
//                     'rgb(101, 150, 51)',
//                     'rgb(68, 139, 29)',
//                     'rgb(14, 127, 0)'
//                 ]
//             },

//             "name": "Gauge",
//             "hole": .4,
//             "type": "pie",
//             "direction": "clockwise",
//             "rotation": 90,
//             "showlegend": false,
//             "textinfo": "label",
//             "textposition": "inside",
//             "hoverinfo": "label"
//         }]
          
//           var layout = {
//             shapes:[{
//                 type: 'path',
//                 path:path,
//                 fillcolor:'red',
//                 line:{
//                     color:'red'
//                 }
//               }],
//             title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
//             height: 600,
//             width: 600,
//           };
//           //var data = [traceA];
//           Plotly.newplot('gauge', trace, layout);
        

//     }
//     if (status == 1){
//         var data = [
//             {
//                 domain: { x: [0, 1], y: [0, 1] },
//                 value: demodata.wfreq,
//                 title: { text: "Scrubs per week" },
//                 type: "indicator",
//                 mode: "gauge+number"
//             }
//         ];
//     }
//     var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
//         Plotly.newPlot('gauge', data, layout); 
// }