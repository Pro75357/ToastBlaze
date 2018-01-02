import {Observations} from "../../../collections/observations";
import {Metrics} from "../../../collections/metrics";
import {Session} from "meteor/session";

function findMetrics(metricCategory){
    if(Session.equals('select','All')){
        return  Metrics.find({
            category: metricCategory,
            status: {$in: ['Red','Green','Yellow']}
        }).count()
    } else return Metrics.find({
            program: Session.get('select'),
            category: metricCategory,
            status: {$in: ['Red','Green','Yellow']}
        }).count()
}

Template.Problems.helpers({

    DiabetesMetrics(){
        return findMetrics('Diabetes')
    },

    HeartFailureMetrics(){
        return findMetrics('Heart Failure')
    },

    HypertensionMetrics(){
    return findMetrics('Hypertension')
    },

    HeartDiseaseMetrics(){
        return findMetrics('Heart Disease')
    },

    obsVomit(){
        if (Observations.find().count() > 0) {
            return JSON.stringify(findMetrics('Diabetes'), null, 2)
        }
    }
});

Template.Problems.events({
    // Change the metrics to only show what the selector has selected
    'change .metric-select': function(event){
        Session.set('select',event.target.value)
    }
});