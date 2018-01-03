import {Observations} from "../../../../collections/observations";
import Chart from 'chart.js'

const metricCategory='Heart Failure';
Template.heartFailureTemplate.helpers({
    HFObservations(){
        let Obs = Observations.find({category: 'problems', metricCategory: metricCategory});
        if(Obs.count() > 0){
            return Obs.fetch()
        }
    },
    HFDxCount(){
        let Obs = Observations.find({category: 'problems', metricCategory: metricCategory});
        if(Obs.count()>0){
            return Obs.count()
        }
    },
});

Template.heartFailureTemplate.onRendered( function(){
    // See the documentation at: http://www.chartjs.org/docs/latest/

    // The Chart object builds from two main variables. One, the canvas object, which we will get and define here
    let canvas = document.getElementById("HFChart").getContext("2d");

    let options = {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    displayFormats: {
                        quarter: 'MMM YYYY'
                    }
                }

            }]
        }
    };

     // Let's go ahead and define an empty dataset array
    let datasets = [];

    // Now lets make a default dataset object. Essentially a template object we can re-use. Pretty colors included.
    //http://www.chartjs.org/docs/latest/charts/line.html#dataset-properties
    let datasetobject = {
        label: 'Weights',
        backgroundColor: 'transparent',
        borderColor: 'blue',
        pointBackgroundColor: 'black',
        data: [0,1,2,3] // from the call - todo: get weights here
    };


    // Almost there- we need to insert this object into our datasets array. The array method push lets us easily do that.
    datasets.push(datasetobject);

    // Now that we have labels, and datasets we can build the top-level data object
    let data = {
        // labels,
        datasets
    };

    let config = {
        type: 'line',
            data: data,
            options: options
    }

    const HFChart = new Chart(canvas, config)

});
