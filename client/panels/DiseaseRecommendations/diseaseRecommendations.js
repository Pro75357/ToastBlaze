import { Patients } from "../../../collections/patients";

Template.diseaseRecommendations.helpers({
    elements(){
        return Patients.find({}).count()
    }
})