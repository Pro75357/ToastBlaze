import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor";
export const Patients = new Mongo.Collection('patients');


// Populate our local patient database with some pre-built patient data.


if (Meteor.isServer) {

Meteor.startup(() => {
    // code to run on server at startup

    // Only do this on startup if the db is empty
    if (Patients.find().count() === 0){
        console.log("found no patients- getting data...")
        Meteor.call('resetPatients')

    } else{
        console.log('found patients already in database')
    }

});

    Meteor.methods({
        'clearPatients': function (){
            Patients.remove({})
        },

        'resetPatients': function(){
            console.log('resetting patient DB')
            Patients.remove({})

        // The patient data is stored as a CSV file in our "private" folder
        // This allows us to quick and dirty replicate what might be a view on Acuere
        // It would actually be easier if this would just pull from Acuere...

        //First, import the csv as a string: https://stackoverflow.com/questions/17453848/is-there-a-way-to-import-strings-from-a-text-file-in-javascript-meteor
        Assets.getText('patients.csv', function(err, res) {
            if (err) {
                console.log('error importing patient data')
            } else {
                // console.log(res)

                // res will contain the data, then we need to parse it to a JSON object.
                // will use the Papa parse package to do this...

                Papa.parse(res, {
                    header: true,
                    complete: function (results) {
                        //console.dir(results.data)
                        var count=0
                        for (x in results.data){
                            Patients.insert(results.data[x])
                            count+=1
                        }
                        console.log(count+' patients entered')
                    }
                })

            }
        })
    }

    }),

        Meteor.publish('patients', function(){
            return Patients.find()
        })
}

if (Meteor.isClient){
    Meteor.subscribe('patients')
}