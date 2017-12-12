import {Metrics} from "../../../collections/metrics";
import {Obs} from "../../../collections/observations";


Template.acuereMetrics.helpers({

    Reds(){
        if (Metrics.find({status: "Red"}).count() > 0 ) {
            return true
        }
    },
    metricsRed(){
        return Metrics.find({status: "Red"}).fetch()
    },
    Yellows(){
        if (Metrics.find({status: "Yellow"}).count() > 0 ) {
            return true
        }
    },
    metricsYellow(){
        return Metrics.find({status: "Yellow"}).fetch()
    },
    Greens(){
        if (Metrics.find({status: "Green"}).count() > 0 ) {
            return true
        }
    },
    metricsGreen(){
        return Metrics.find({status: "Green"}).fetch()
    },

    // The catch-all for all other statuses - $nin means "Not in"
    Greys(){
        if (Metrics.find({status: { $nin: ["Red","Yellow","Green"]}}).count() > 0 ) {
            return true
        }
    },
    metricsGrey(){
        return Metrics.find({status: { $nin: ["Red","Yellow","Green"]}}).fetch()
    },
    metricsCount(){
        return Metrics.find().count()
    },
    metricsVomit(){
        return JSON.stringify(Metrics.find().fetch(), null, 2)
    },


    // These special helpers get passed the ObsID from the corresponding metrics
    // and they fetch the observation data
    obsName(obsId){
        return Obs.findOne({_id: obsId}).name
    },
    obsDate(obsId){
        return Obs.findOne({_id: obsId}).date
    },
    obsValue(obsId){
        return Obs.findOne({_id: obsId}).value
    },
    // this one needs the period as well - it is in months
    dueDate(obsId, period){
        let lastDate = moment(Obs.findOne({_id: obsId}).date);
        return lastDate.add(period,'month').format('MM/DD/YYYY')
    }

});

Template.acuereMetrics.events({

});
