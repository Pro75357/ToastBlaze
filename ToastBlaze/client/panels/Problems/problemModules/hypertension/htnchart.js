import Chart from "chart.js";
import {Observations} from "../../../../../collections/observations";

// This is a special template for rendering the blood pressure chart, since it chart two values (SBP and DBP) instead of one.
// It is mostly copy-paste from smallchart.

Template.htnChart.onRendered( function(){
    // See the documentation at: http://www.chartjs.org/docs/latest/

    let canvas = document.getElementById('htnCanvas').getContext("2d");

    // now, get the data to populate the dataset.

    // Let's go ahead and define an empty dataset array
    let datasets = [];

    // Now lets make a default dataset object. Essentially a template object we can re-use. Pretty colors included.
    //http://www.chartjs.org/docs/latest/charts/line.html#dataset-properties



    // instead of one generic datasetObject, we are going to build an object for SBP and an object for DBP

    //SBP object
    let sbpData = [] ;

    let SbpObs = Observations.find({name: "Systolic Blood Pressure"}, {sort: {date: -1}}).fetch();
    for (let x in SbpObs){
        let value = {
            t: SbpObs[x].date,
            y: SbpObs[x].value
        };
        sbpData.push(value);
        //console.log(value)
    }

    let sbpObject = {
        // label: 'Weights',
        backgroundColor: 'transparent',
        borderColor: 'blue',
        borderWidth: 1,
        // pointBackgroundColor: 'black',
        pointStyle: 'cross',
        data: sbpData // from above
    };

    // Almost there- we need to insert this object into our datasets array. The array method push lets us easily do that.
    datasets.push(sbpObject);

    // Copy-paste and change to dbp:
    //SBP object
    let dbpData = [] ;

    let DbpObs = Observations.find({name: "Diastolic Blood Pressure"}, {sort: {date: -1}}).fetch();
    for (let x in DbpObs){
        let value = {
            t: DbpObs[x].date,
            y: DbpObs[x].value
        };
        dbpData.push(value);
        //console.log(value)
    }

    let dbpObject = {
        // label: 'Weights',
        backgroundColor: 'transparent',
            // use a different color
        borderColor: 'orange',
        borderWidth: 1,
        // pointBackgroundColor: 'black',
        pointStyle: 'cross',
        data: dbpData // from above
    };

    // Almost there- we need to insert this object into our datasets array. The array method push lets us easily do that.
    datasets.push(dbpObject);

    // We could also build datasets to represent categorical values (i.e. a line to mark what is normal, above normal, etc.)

    // Now that we have labels, and datasets we can build the top-level data object
    let data = {
        // labels,
        datasets
    };
   // console.log(data)
    //define some max and min so it better fits our data
    let maxTick = Math.floor(parseFloat(Observations.findOne({name: "Systolic Blood Pressure"}, {sort: {value: -1}}).value)+0.5); // will result in rounding up
    let minTick = 40// parseInt(Observations.findOne({name: "Diastolic Blood Pressure"}, {sort: {value: 1}}).value); // will by default round down
    //console.log(maxTick+" "+minTick)
    let tick = Math.floor((maxTick-minTick)/2);

    let myUnit = Observations.findOne({name: "Systolic Blood Pressure"}).unit;

    // set this X-axis scale to be based on time
    let options = {
        responsive: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    displayFormats: {
                        'quarter': 'MMM YY',
                        'year': "'YY",
                    },
                    tooltipFormat: 'YY-M-D'
                },
                scaleLabel: {
                    display: false
                }

            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: myUnit
                },
                ticks: {
                    max: maxTick,
                    min: minTick,
                    stepSize: tick,
                }
            }]
        },
        tooltips: {
            enabled: true,
            displayColors: false,
            mode: 'single',
            callbacks: {
                label: function(tooltipItems, data){
                    return tooltipItems.yLabel+' '+myUnit
                }
            }
        }
    };


    let config = {
        type: 'line',
        data: data,
        options: options
    };

    //console.dir(config);

    const MyChart = new Chart(canvas, config)

});
