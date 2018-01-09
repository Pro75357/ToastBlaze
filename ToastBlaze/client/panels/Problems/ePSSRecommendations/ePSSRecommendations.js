import { Epss} from "../../../../collections/epss";

import {Meteor} from "meteor/meteor";
import {Session} from "meteor/session";

Template.ePSSRecommendations.helpers({
    epssNotReady(){
        if(Epss.find().count() > 0 ){
            return false
        } else {
            return true
        }
    },
    epssRequested(){
        return Session.get('epssRequested')
    },

    epssGradeA(){
        if(Epss.find({grade: "A"}).count() > 0) {
            return Epss.find({grade: "A"}).fetch()
        }
    },

    epssGradeB(){
        if(Epss.find({grade: "B"}).count() > 0) {
            return Epss.find({grade: "B"}).fetch()
        }
    },
//dev stuff
    epssVomit(){
        if (Epss.find().count() > 0){
            return JSON.stringify(Epss.find().fetch(), null, 2)
        }
    },
});

Template.ePSSRecommendations.events({
    // there are 2 ways the Epss server function gets called
     // one is if the "USPSTF recommendations" pill gets clicked in the Problems"
    // but if the user is already on this pill when selecting a new patient they will instead see a button
    // thus they have to click the button, and here we will call the getEpss server call
    // as well as set the flag for the loader icon
    'click #getEpss'(){
        Session.set('epssRequested', true);
        Meteor.call('getEpss')
    }
})