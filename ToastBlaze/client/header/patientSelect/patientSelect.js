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
       if(!(Session.get('patId')===undefined)){
           if(Patients.findOne({patId: Session.get('patId')})) {
               return "BirthDate: " + Patients.findOne({patId: Session.get('patId')}).dob
           }
       }
    }
});

Template.patientSelect.events({
    'change #patientSelect': function(e){
        // all the things that need to happen on a new patient select (most are automated):
        Session.set('epssRequested', false);  // resets ePSS button regardless of selection
        Meteor.call('clearEpss'); // go ahead and clear the ePSS data so it doesn't look odd later
        if (e.target.value === "0"){
            Session.set('patId', undefined)
        } else{
            Session.set('patId', e.target.value);
        }
    }
});

// API stuff:

/* the majority of functions for this app will run
    when a patient is selected.
    todo: organize these functions better
 */


//Tracker function will run when the patId session variable changes...
// We want this to run only if the patId gets changed to a real one

Tracker.autorun(function(){
    if(Session.equals('patId',undefined)) {
        return;
    }
    //console.log("AutoTracker Updated: PatId " + Session.get('patId'))
    Meteor.call('updatePat', Session.get('patId'))

})
