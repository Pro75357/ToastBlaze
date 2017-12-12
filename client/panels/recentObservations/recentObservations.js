import {Obs} from "../../../collections/observations";

Template.recentObservations.helpers({

    vitals(){
        return Obs.find({category: "vitals"}).fetch()
    },
    laboratory(){
        return Obs.find({category: "labs"}).fetch()
    },
    procedures(){
        return Obs.find({category: "procedures"}).fetch()
    },

    obsVomit(){
        return JSON.stringify(Obs.find().fetch(), null, 2)
    }
});

Template.recentObservations.events({


});