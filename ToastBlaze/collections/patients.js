import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor";
export const Patients = new Mongo.Collection('patients');


// Populate our local patient database with some pre-built patient data.


if (Meteor.isServer) {

Meteor.startup(() => {
    // code to run on server at startup

    // Only do this on startup if the db is empty
    if (Patients.find().count() === 0){
        console.log("found no patients- getting data...");
        Meteor.call('resetPatients')

    } else{
        console.log('found patients already in database')
    }

});

    Meteor.methods({
        'clearPatients': function (){
            Patients.remove({})
        },

        'resetPatients': function() {
            console.log('resetting patient DB');
            Patients.remove({});

            // The patient data is stored as a CSV file in our "private" folder
            // This allows us to quick and dirty replicate what might be a view on Acuere
            // It would probably be easier if this would just pull from Acuere...

            //First, import the csv as a string: https://stackoverflow.com/questions/17453848/is-there-a-way-to-import-strings-from-a-text-file-in-javascript-meteor

            try {
                const patientString = Assets.getText('patients.csv');
                // patientString will contain the data as one long CSV string
                // We need to parse it to a JSON object.
                // will use the Papa parse package to do this...

                const patientData = Papa.parse(patientString, {header: true});

                // We will store the data in our own Mongo collection that we defined above- Patients
                // Prefer to store each patient as their own "document" to make searches and stuff easier, so loop through the CSV data and insert one at a time
                let count = 0;
                for (let x in patientData.data) {
                    if(patientData.data[x].patId !==''){ // ignores any blank rows (i.e. last row that always comes back)
                        Patients.insert(patientData.data[x]);
                        count += 1
                    }
                }
                console.log(count + ' patients entered')

            } catch (e) {
                console.log("something went wrong with getting the patient list");
                console.log(e.message)
            }
        }

    });

        Meteor.publish('patients', function(){
            return Patients.find()
        })
}

if (Meteor.isClient){
    Meteor.subscribe('patients')
}