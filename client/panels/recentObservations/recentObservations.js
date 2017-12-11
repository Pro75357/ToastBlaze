import { Patients } from "../../../collections/patients";
import { Epss } from "../../../collections/epss";
import {Pat} from "../../../collections/pat";

Template.recentObservations.helpers({
    obsVomit(){
        return JSON.stringify(Pat.find().fetch(), null, 2)
    }
})

Template.recentObservations.events({
    'click .testButton': function(){
        alert('no')
    }
})