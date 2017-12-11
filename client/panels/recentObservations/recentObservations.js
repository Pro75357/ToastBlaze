import {Obs} from "../../../collections/observations";

Template.recentObservations.helpers({

    vitals(){
        return Obs.find({Type: "Vital Sign"}).fetch()
    },
    laboratory(){
        return Obs.find({Type: "Laboratory"}).fetch()
    },
    procedures(){
        return Obs.find({Type: "Procedure"}).fetch()
    },

    obsVomit(){
        return JSON.stringify(Obs.find().fetch(), null, 2)
    }
})

Template.recentObservations.events({


})