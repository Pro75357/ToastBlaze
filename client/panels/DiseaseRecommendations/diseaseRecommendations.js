import { Patients } from "../../../collections/patients";
import { Pat } from "../../../collections/pat";
import {Epss} from "../../../collections/epss";

Template.diseaseRecommendations.helpers({
    patElements(){
        return Pat.find({}).count()
    },
});

Template.diseaseRecommendations.events({
    'click .testButton': function(){
        console.log('reset pats');
        Meteor.call('resetPatients');
    }
});
