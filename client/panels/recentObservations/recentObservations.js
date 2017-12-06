import { Patients } from "../../../collections/patients";
import { Epss } from "../../../collections/epss";

Template.recentObservations.helpers({
    ePSSelements(){
        return Epss.find({}).count()
    },
    ePSSVomit(){
        return JSON.stringify(Epss.find().fetch(), null, 2)
    }
})

Template.recentObservations.events({
    'click .testButton': function(){
        Meteor.call('getEpss')
    }
})