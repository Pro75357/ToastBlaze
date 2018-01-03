import { Patients } from "../../../collections/patients";
import { Epss} from "../../../collections/epss";
import { Pat } from "../../../collections/pat";
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

Template.ePSSRecommendations.onRendered( function(){
    // fetch the Epss recs only if this frame gets rendered.
    Session.set('epssRequested', true);
        // We want to update our ePSS recommendations with our patient information.

        // We need to build our param object for the ePSS call
        // Here is the template with the possible values:

        /*
        params = {
        age: '18',  --any integer
        sex: 'Male', -- (Male, Female)
        pregnant: 'N' -- (Y,N) - requires Female sex to be present
        tobacco: 'N', -- (Y,N)
        sexuallyActive: 'N' -- (Y,N)
        grade: 'A' (A,B,C,D, I) -- can be repeated to include multiple values
         --> duplicate params is hard.
        }
         */


        let P = Pat.findOne();
        let params = {
            age: getAge(P.gen.dob),
            sex: P.gen.sex,
            //pregnant: 'N' -- (Y,N) - requires Female sex to be present
            //tobacco: 'N', -- (Y,N)
            //sexuallyActive: 'N' -- (Y,N)
            grade: ['A','B']
        };
        Meteor.call('getEpss', params)
    }
);