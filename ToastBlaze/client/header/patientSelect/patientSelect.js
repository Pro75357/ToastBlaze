import {Patients} from "../../../collections/patients";
import { Session }from 'meteor/session'

Template.patientSelect.helpers({

    // build the list of patients in our patient selection dropdown
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

    // if a patient is selected, return their dob
    selectedPatDob(){
        // only return if a patient is actually selected
       if(!(Session.get('patId')===undefined)){
           // get DOB from Patients collection, if it exists
           if(Patients.findOne({patId: Session.get('patId')})) {
               return "BirthDate: " + Patients.findOne({patId: Session.get('patId')}).dob
           }
       }
    }
});

Template.patientSelect.events({
    'change #patientSelect': function(e){

        // all the things that need to happen on a new patient select:
        Session.set('epssRequested', false);  // resets ePSS loader state

        // set the session variable based on what was selected
        if (e.target.value === "0"){
            // if they select "no patient selected" need this to be undefined
            Session.set('patId', undefined)
        } else{
            // otherwise, just set it whatever the select value is
            Session.set('patId', e.target.value);
        }
    }
});


//Tracker function will run when the patId session variable changes...
// We want this to run only if the patId gets changed to a real one

Tracker.autorun(function(){
    if(Session.equals('patId',undefined)) {
        return;
    }
    //console.log("AutoTracker Updated: PatId " + Session.get('patId'))
    Meteor.call('updatePat', Session.get('patId'))

});
