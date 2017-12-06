import { Patients } from "../../../collections/patients";

Template.generalRecommendations.helpers({
    elements(){
        return Patients.find({}).count()
    }
})

Template.generalRecommendations.events({
    'change #patientSelect': function(){
        console.log(Session.get('patId'))
    }
})