// Store the URL to a constant
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//  Variable stores resesarch data
let samples = [];

// Convert json to object data from URL
d3.json(url).then(function(microbes){
    setSelectTag(microbes.samples);    
});


// Function to populate SELECT tag
function setSelectTag(data){
    samples = data;
    let selectTag = d3.select('#selDataset');

    // Populate select tag with IDs
    for (i=0;i<data.length;i++){
        option = selectTag.append('option').text(data[i].id);
        option = option.attr('value',data[i].id);
    }

    // Variable to store first person data
    let first_person = [];

    // Populate first person data
    for (var j in samples[0].otu_ids){
        
        first_person.push(['OTU '+samples[0].otu_ids[j],samples[0].otu_labels[j],samples[0].sample_values[j]]);
    }
    // Sort the OTU samples count in descending order
    first_person.push(function(a,b){
        return b[2]-a[2];
        });
    //console.log("after sort",first_person);
    // Call function to build graph
    buildGraph(first_person,0);
}

// Function to build bar graph
function buildGraph(graphdata,status){
    
    let samples = [];
    let otu_ids = [];
    let labels = [];
    let x = 10;
    // console.log(graphdata.slice(0,10));
    if(graphdata.length < 10){
        x = graphdata.length;
    }
    for (i=0;i<x;i++){
        otu_ids.push(graphdata[i][0]);
        labels.push(graphdata[i][1]);
        samples.push(graphdata[i][2]);

    }
    var layout = {
        title:'Top 10 OTUs',
        barmode:'stack'
    }
    if (status == 0){
        var data = [{
            type:'bar',
            x: samples,
            y: otu_ids,
            text: labels,
            orientation: 'h'
        }];
        Plotly.newPlot('bar',data,layout);
    }else{
    
    Plotly.restyle('bar','x',[samples]);
    Plotly.restyle('bar','y',[otu_ids]);
    
    }
}

// Function to caputre the selected person id and show their OTU's data
function optionChanged(value){

    let id = parseInt(value);
    for (i=0;i<samples.length;i++){
        if (id == samples[i].id){
            // console.log(samples[i]);
            otu_ids = samples[i].otu_ids;
            otu_lables = samples[i].otu_labels;
            sample_values = samples[i].sample_values;
            let individual_data = [];
            for (var j in samples[i].otu_ids){
                // individual_data.push(['OTU '+otu_ids[j],otu_lables[j],sample_values[j]]);
                individual_data.push(['OTU '+samples[i].otu_ids[j],samples[i].otu_labels[j],samples[i].sample_values[j]]);
            }
            console.log('person is',id);
            buildGraph(individual_data,1);
        }

    }
}
