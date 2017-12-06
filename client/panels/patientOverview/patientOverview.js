import { Patients } from "../../../collections/patients";

Template.patientOverview.helpers({
    pat(){
        return Patients.findOne({patId: Session.get('patId')})
    },
    patAge(){
        // here we calculate the age and return the value in years

        let dob = new Date(Patients.findOne({patId: Session.get('patId')}).dob)
        let ageDifMs = Date.now() - dob.getTime()
        let ageDate = new Date(ageDifMs)
        return Math.abs(ageDate.getUTCFullYear()- 1970)

    },

})