import { Patients } from "../../../collections/patients";

Template.patientOverview.helpers({
    elements(){
        return Patients.find({}).count()
    }
})