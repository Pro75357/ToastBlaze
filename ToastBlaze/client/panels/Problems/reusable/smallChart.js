import Chart from "chart.js";
import {Observations} from "../../../../collections/observations";

Template.smallChart.onRendered( function(){
    // See the documentation at: http://www.chartjs.org/docs/latest/

    //this will render single-value measures along a time axis
    // the data is obtained through the template "this.data"
    // which is the measure name we pass to the template creator in the html file

    // we also prefix the canvas ID in the HTML template with the measure name so it is unique.
    let canvas = document.getElementById(this.data.measure+'canvas').getContext("2d");


    // To build the chart, we just basically build a config object, then do MyChart = new Chart(canvas, config)
    //http://www.chartjs.org/docs/latest/charts/line.html#dataset-properties


    // the chart accepts multiple datasets, though for now we will only use one. Let's go ahead and define an empty dataset array
    let datasets = [];

    //And inside this dataset we need an array to actually store our data
    let chartData = [] ;

    // Now, we want to populate our chartData array with coordinate pairs. Since we are doing a time-based
    // axis, we want t: , y: pairs.
    // we get the data from the observations collection
    let obs = Observations.find({name: this.data.measure}, {sort: {date: -1}}).fetch();
    for (let x in obs){
        let value = {
            t: obs[x].date,
            y: obs[x].value
        };
        // for each observation that matches, arrange it as above, and push it into our data array.
        chartData.push(value);
        //console.log(value)
    }

    // now that we have our data, we can build the object that defines the dataset (includes colors and such)
    let datasetObject = {
       // label: 'Weights',
        backgroundColor: 'transparent',
        borderColor: 'blue',
        borderWidth: 1,
      // pointBackgroundColor: 'black',
        pointStyle: 'cross',
        data: chartData // from above
    };

    // Almost there- we need to insert this object into our datasets array.
    datasets.push(datasetObject);

    // Now that we have labels, and datasets we can build the top-level data object
    let data = {
        // labels,
        datasets
    };

    // Now we are ready to build the options object.
    // I mostly do this in one big object, since it's mostly static for this particular chart.

    // One thing that is not static is the min and max Y value, and unfortunately for us the defaults are a bit too generous with padding
    // and since our chart is very short (almost like a sparkline), this  results in a squished chart.
    // So, we need to define better max and min values so our data can fill the whole chart.
    // we can get the max and min values by sorting our data by value, then using parseInt to round
    let maxTick = parseInt(Observations.findOne({name: this.data.measure}, {sort: {value: -1}}).value)+1; // will result in rounding up
    let minTick = parseInt(Observations.findOne({name: this.data.measure}, {sort: {value: 1}}).value); // will by default round down

    // we can also help define the "ticks" - where our chart will have guidelines and unit labels - as the defaults are not pretty
    let tick = Math.floor((maxTick-minTick)/2);

    //console.log("min: "+minTick+', max: '+maxTick+', tick: '+tick);

    // we can also use the options to set a unit on the Axes. A time axis will have dates, so we just need to set the Y axis unit.
    let myUnit = Observations.findOne({name: this.data.measure}).unit;

    // set this X-axis scale to be based on time
    let options = {
        responsive: false,
        legend: {
            display: false // takes up too much space, and there is plenty of context to understand the chart
        },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    displayFormats: { // these formats are just like moment.js
                        // I don't try to specify the date range- chart.js just gets that from the data.
                        // it then intelligently scopes the axis to fit
                        'quarter': 'MMM YY', // this is what is displayed if the chart is scoped into quarters
                        'year': "'YY", // and if the chart is scoped into years
                    },
                    tooltipFormat: 'DD-MM-YY' // format of the tooltip
                },
                scaleLabel: {
                    display: false // again takes too much space
                }

            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: myUnit
                },
                ticks: { // here is where we set our ticks from above
                    max: maxTick,
                    min: minTick,
                    stepSize: tick,
                }
            }]
        },
        tooltips: { // some special code for the tooltips to be a little more concise
            enabled: true,
            displayColors: false, // big colored box- useful if you have multiple datasets, but not here.
            mode: 'single',
            callbacks: { // this is a special function that lets us define exactly what the label says. Had to do this to add the unit!
                label: function(tooltipItems, data){
                    return tooltipItems.yLabel+' '+myUnit
                }
            }
        }
    };


    // finally, we build the top-level config object, which is where we actually specify the chart type
    let config = {
        type: 'line',
        data: data,
        options: options
    };

    // and now we can actually build the chart!

    const MyChart = new Chart(canvas, config)

});
