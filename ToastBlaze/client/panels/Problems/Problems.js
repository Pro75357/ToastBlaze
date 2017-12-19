import {Obs} from "../../../collections/observations";
import {Metrics} from "../../../collections/metrics";
import {Session} from "meteor/session";

function Pbs(metricCategory){
    return Obs.find({metricCategory:metricCategory})
}

Template.Problems.helpers({

    Diabetes() {
        let metricCategory = 'Diabetes';
        if(Pbs(metricCategory).count()>0){
            return Pbs(metricCategory).fetch()
        }
    },
    hasHeartFailure(){
        let metricCategory='Heart Failure';
        if(Pbs(metricCategory).count()>0){
            return Pbs(metricCategory).fetch()
        }
    },
    hasHypertension(){
        let metricCategory='Hypertension';
        if(Pbs(metricCategory).count()>0){
            return Pbs(metricCategory).fetch()
        }
    },
    hasHeartDisease(){
        let metricCategory='Heart Disease';
        if(Pbs(metricCategory).count()>0){
            return Pbs(metricCategory).fetch()
        }
    },

    prevention(){
        return null;
    },

    obsVomit(){
        if (Obs.find().count() > 0) {
            return JSON.stringify(Obs.find().fetch(), null, 2)
        }
    }
});

Template.Problems.events({
    // Change the metrics to only show what the selector has selected
    'change .metric-select': function(event){
        Session.set('select',event.target.value)
    }
});