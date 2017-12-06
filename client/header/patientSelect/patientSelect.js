import {Patients} from "../../../collections/patients";
import { Session }from 'meteor/session'

Template.patientSelect.helpers({
    patList(){
        let Pats = Patients.find({}).fetch();
        //console.dir(Pats)

        let list = [];
        for (let x in Pats){
            list.push({
                name: Pats[x].fname + ' ' + Pats[x].lname,
                patId: Pats[x].patId
            })
        }
       //console.log(list);
        return list
    },

    selectedPatDob(){
        let dob = Patients.findOne({patId: Session.get('patId')}).dob;
        if (dob){
            return "BirthDate: "+dob
        }
    }
});

Template.patientSelect.events({
    'change #patientSelect': function(e){
        if (e.target.value === 0){
            Session.set('patId', undefined)
        } else {
            Session.set('patId', e.target.value);
        }
        //console.log(Session.get('patId'))
    }
});