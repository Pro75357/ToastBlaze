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
       if(!(Session.get('patId')==="0")){
           return "BirthDate: "+Patients.findOne({patId: Session.get('patId')}).dob
       }
    }
});

Template.patientSelect.events({
    'change #patientSelect': function(e){
            Session.set('patId', e.target.value);
    }
});