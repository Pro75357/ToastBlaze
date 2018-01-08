import { Epss} from "../../../../collections/epss";

import {Meteor} from "meteor/meteor";

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