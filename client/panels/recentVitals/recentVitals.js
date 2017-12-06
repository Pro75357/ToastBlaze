import { Patients } from "../../../collections/patients";

Template.recentVitals.helpers({
    elements(){
        return Patients.find({}).count()
    }
})