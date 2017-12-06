import { Patients } from "../../../collections/patients";

Template.generalRecommendations.helpers({
    elements(){
        return Patients.find({}).count()
    }
})