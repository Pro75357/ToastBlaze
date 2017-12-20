import {Obs} from "../../../../collections/observations";

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

});