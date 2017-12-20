import {Obs} from "../../../../collections/observations";
import {Metrics} from "../../../../collections/metrics";
import {Session} from "meteor/session";

function Pbs(metricCategory){
    return Obs.find({metricCategory:metricCategory})
}

Template.DiabetesTemplate.helpers({
    A1cList(){
        if(Obs.find({category: 'labs', name: 'A1c'}).count() > 0) {
            return Obs.find({category: 'labs', name: 'A1c'}, {sort: {date: 1}}).fetch()
        }
    },
    Diabetes(){
        let metricCategory = 'Diabetes';
        if(Pbs(metricCategory).count()>0){
            return Pbs(metricCategory).fetch()
        }
    },

    DiabetesMetrics(){
        if(Session.equals('select','All')){
            if(Metrics.find({category: 'Diabetes'}).count() > 0){
                return Metrics.find({
                    category: 'Diabetes',
                    status: {$in: ['Red','Yellow']}
                }).fetch()
            }
        } else if(Metrics.find({program: Session.get('select')}, {category: 'Diabetes'}).count() > 0) {
            return Metrics.find({
                program: Session.get('select'),
                category: 'Diabetes',
                status: {$in: ['Red','Yellow']}
            }).fetch()
        }
    }
});