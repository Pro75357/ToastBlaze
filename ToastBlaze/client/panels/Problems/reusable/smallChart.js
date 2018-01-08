import Chart from "chart.js";
import {Observations} from "../../../../collections/observations";

Template.smallChart.onRendered( function(){
    // See the documentation at: http://www.chartjs.org/docs/latest/

    let canvas = document.getElementById(this.data.measure+'canvas').getContext("2d");



    // now, get the data to populate the dataset.

    // Let's go ahead and define an empty dataset array
    let datasets = [];

    // Now lets make a default dataset object. Essentially a template object we can re-use. Pretty colors included.
    //http://www.chartjs.org/docs/latest/charts/line.html#dataset-properties

    let chartData = [] ;

    let obs = Observations.find({name: this.data.measure}, {sort: {date: -1}}).fetch();
    for (let x in obs){
        let value = {
            t: obs[x].date,
            y: obs[x].value
        };
        chartData.push(value);
        //console.log(value)
    }

    let datasetObject = {
       // label: 'Weights',
        backgroundColor: 'transparent',
        borderColor: 'blue',
        borderWidth: 1,
      // pointBackgroundColor: 'black',
        pointStyle: 'cross',
        data: chartData // from above
    };


    // Almost there- we need to insert this object into our datasets array. The array method push lets us easily do that.
    datasets.push(datasetObject);

    // Now that we have labels, and datasets we can build the top-level data object
    let data = {
        // labels,
        datasets
    };

    //define some max and min so it better fits our data
    let maxTick = Math.floor(parseFloat(Observations.findOne({name: this.data.measure}, {sort: {value: -1}}).value)+0.5); // will result in rounding up
    let minTick = parseInt(Observations.findOne({name: this.data.measure}, {sort: {value: 1}}).value); // will by default round down

    let tick = Math.floor((maxTick-minTick)/2);

    let myUnit = Observations.findOne({name: this.data.measure}).unit

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
