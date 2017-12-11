import {Metrics} from "../../../collections/metrics";

Template.acuereMetrics.helpers({
    metricsRed(){
        return Metrics.find({Status: "Red"}).fetch()
    },
    metricsYellow(){
        return Metrics.find({Status: "Yellow"}).fetch()
    },
    metricsGreen(){
        return Metrics.find({Status: "Green"}).fetch()
    },
    metricsGrey(){
        return Metrics.find({Status: "Grey"}).fetch()
    },
    metricsVomit(){
        return JSON.stringify(Metrics.find().fetch(), null, 2)
    },
});

Template.acuereMetrics.events({

});
