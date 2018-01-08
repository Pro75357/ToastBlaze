import {Observations} from "../../../../../collections/observations";
import {Metrics} from "../../../../../collections/metrics";
import {Session} from "meteor/session";


Template.DiabetesProblemsTemplate.helpers({
    A1cList(){
        let Obs = Observations.find({category: 'labs', name: 'A1c'}, {sort: {date: 1}})
        if(Obs.count() > 0) {
            return Obs.fetch()
        }
    },
    DiabetesObservations(){
        let Obs = Observations.find({category: 'problems', metricCategory: 'Diabetes'});
        if(Obs.count() > 0){
            return Obs.fetch()
        }
    },
    DiabetesDxCount(){
        let Obs = Observations.find({category: 'problems', metricCategory: 'Diabetes'});
        if(Obs.count()>0){
            return Obs.count()
        }
    },

});