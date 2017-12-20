import {Obs} from "../../../collections/observations";
import {Metrics} from "../../../collections/metrics";
import {Session} from "meteor/session";

function Pbs(metricCategory){
    return Obs.find({metricCategory:metricCategory})
}

Template.Problems.helpers({

    Diabetes(){
        let metricCategory = 'Diabetes';
        if(Pbs(metricCategory).count()>0){
            return Pbs(metricCategory).fetch()
        }
    },
    A1cList(){
        if(Obs.find({category: 'labs', name: 'A1c'}, {sort: {date: 1}}).count() > 0) {
            return Obs.find({category: 'labs', name: 'A1c'}).fetch()
        } else {
            return ['None Found']
        }
    },
    HeartFailure(){
        let metricCategory='Heart Failure';
        if(Pbs(metricCategory).count()>0){
            return Pbs(metricCategory).fetch()
        }
    },
    Hypertension(){
        let metricCategory='Hypertension';
        if(Pbs(metricCategory).count()>0){
            return Pbs(metricCategory).fetch()
        }
    },
    HeartDisease(){
        let metricCategory='Heart Disease';
        if(Pbs(metricCategory).count()>0){
            return Pbs(metricCategory).fetch()
        }
    },

    prevention(){
        return null;
    },

    //return a color to indicate when values are higher or lower than the reference value.
    // This one assumes the high values are bad and low are ok.
    colorValueHighBad(value, refLow, refHigh){
      if (value > refHigh) {
          return '#fc9c87'
      } else if (value < refLow) {
          return '#87fcea'
      } else {
          return '#93fc87'
      }
    },

    obsVomit(){
        if (Obs.find().count() > 0) {
            return JSON.stringify(Obs.find({category: 'labs', name: 'A1c'}).fetch(), null, 2)
        }
    }
});

Template.Problems.events({
    // Change the metrics to only show what the selector has selected
    'change .metric-select': function(event){
        Session.set('select',event.target.value)
    }
});