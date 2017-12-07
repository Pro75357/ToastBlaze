import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor";
import {Session} from "meteor/session";
import {Patients} from "./patients";

export const Pat = new Mongo.Collection('pat');

// Once our patient is selected we need to populate our pat collection.


if (Meteor.isServer) {

    Meteor.startup(() => {
        // clear ant Pat data at startup as there should not be any patient in context.
        Pat.remove({})

    });

    Meteor.methods({
        'updatePat': function(patId) {
            console.log("updatePat was run");
            // First, let's fetch the other data about the patient

            // We'll store this single patient's data in a new Collection, pat
            Pat.insert({_id: patId});

            // these helper functions might make things easier...

            function updatePat(object) {
                //console.log(object)
                Pat.update({_id: patId}, {$set:  object})
            }

            //e.g.
            updatePat({
                name: Patients.findOne({patId: patId}).fname + ' ' + Patients.findOne({patId: patId}).lname,
                age: getAge(Patients.findOne({patId: patId}).dob)
            });

            updatePat({
                gen: Patients.findOne({patId: patId})
            });


// Simulate a call to a table that holds patient Observations
            // The meteor.call actually just reads from the CSV, but it does then filter by the patId
            // sort of like how a real SQL call would work.

            let obs = {
                obs: Meteor.call('getObs', patId)
            };
            updatePat(obs);

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
            }
             */

            let P = Pat.findOne({})

            let params = {
                age: getAge(P.gen.dob),
                sex: P.gen.sex,
                //pregnant: 'N' -- (Y,N) - requires Female sex to be present
                //tobacco: 'N', -- (Y,N)
                //sexuallyActive: 'N' -- (Y,N)
                grade: 'A'
            };

            Meteor.call('getEpss', params)
        },

        'clearPat': function (){
            Pat.remove({})
        },
        'getObs': function(patId){
            //todo: get a real function here.
            return 'no obs for you (yet): '+ patId
        }

    });

        Meteor.publish('pat', function(){
            return Pat.find()
        })
}

if (Meteor.isClient){
    Meteor.subscribe('pat')
}