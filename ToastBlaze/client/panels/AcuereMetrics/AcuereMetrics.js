import {Metrics} from "../../../collections/metrics";
import {Observations} from "../../../collections/observations";
import { Session } from 'meteor/session'

// set our initial metrics to default to all
Session.set('select',"All");

// This shortcut function lets our code be cleaner below.

SelectMetrics = function(color) {
    if(Session.equals('select',"All")){
        return Metrics.find({status: color})
    } else {
        return Metrics.find({program: Session.get('select'), status: color})
    }
};

Template.acuereMetrics.helpers({

    // dev helpers
    metricsCount(){
        if(SelectMetrics().count() > 0) {
            return SelectMetrics.count()
        }
    },

    metricsVomit(){
        if(SelectMetrics().count() > 0) {
            return JSON.stringify(SelectMetrics().find().fetch(), null, 2)
        }
    },

    //returns each category based on the helper function SelectMetrics
    metricsRed(){
        let color = "Red";
        if (SelectMetrics(color).count() > 0 ) {
            return SelectMetrics(color).fetch()
        }
    },
    metricsYellow(){
        let color = "Yellow";
        if (SelectMetrics(color).count() > 0 ) {
            return SelectMetrics(color).fetch()
        }
    },
    metricsGreen(){
        let color = "Green";
        if (SelectMetrics(color).count() > 0 ) {
            return SelectMetrics(color).fetch()
        }
    },
    // The catch-all for all other statuses - $nin means "Not in"
    metricsGrey(){
        let color = {$nin: ["Red","Yellow","Green"]};
        if (SelectMetrics(color).count() > 0 ) {
            return SelectMetrics(color).fetch()
        }
    },

    // These special helpers get passed the ObsID from the corresponding metrics
    // and they fetch the observation data
    obsName(obsId){
        if(Observations.find({_id: obsId}).count()>0) {
            return Observations.findOne({_id: obsId}).name
        }
    },
    obsDate(obsId){
        if(Observations.find({_id: obsId}).count()>0) {
            return Observations.findOne({_id: obsId}).date
        }
    },
    obsValue(obsId){
        if(Observations.find({_id: obsId}).count()>0) {
            return Observations.findOne({_id: obsId}).value
        }
    },
    // this one needs the period as well - it is in months
    dueDate(obsId, period){
        if(Observations.find({_id: obsId}).count()>0) {
            let lastDate = moment(Observations.findOne({_id: obsId}).date);
            return lastDate.add(period, 'month').format('MM/DD/YYYY')
        }
    }

});

Template.acuereMetrics.events({

    // Change the metrics to only show what the selector has selected
    'change .metric-select': function(event){
        Session.set('select',event.target.value)
    }
});

// this should keep all the "metric-select" classes the same value
Tracker.autorun(function(){
    let selects = document.getElementsByClassName('metric-select')
    for (let x in selects){
        selects[x].value = Session.get('select')
    }
})