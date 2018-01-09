import {Observations} from "../../../collections/observations";
import {Metrics} from "../../../collections/metrics";
import {Session} from "meteor/session";
import {Meteor} from "meteor/meteor";

function findMetrics(metricCategory){
    return  Metrics.find({
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
            return JSON.stringify(Metrics.find({}).fetch(), null, 2)
        }
    }
});

Template.Problems.events({
    // Change the metrics to only show what the selector has selected
    'change .metric-select': function(event){
        Session.set('select',event.target.value)
    },

    'click #EpssPill': function(){
        Session.set('epssRequested', true);
        Meteor.call('getEpss')
    }
});