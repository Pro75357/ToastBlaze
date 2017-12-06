import { Patients } from "../../../collections/patients";
import {Epss} from "../../../collections/epss";

Template.diseaseRecommendations.helpers({
    patElements(){
        return Patients.find({}).count()
    },
    patVomit(){
        return JSON.stringify(Patients.find().fetch(), null, 2)
    }
}),

Template.diseaseRecommendations.events({
    'click .testButton': function(){
        console.log('reset pats')
        Meteor.call('resetPatients')
    }
})
