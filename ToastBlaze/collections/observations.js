import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor";

export const Obs = new Mongo.Collection('obs');

// Once our patient is selected we need to populate our pat collection.


if (Meteor.isServer) {

    Meteor.startup(() => {
        // clear any data at startup as there should not be any patient in context.
        Obs.remove({})

    });


    Meteor.publish('obs', function(){
        return Obs.find()
    });

    Meteor.methods({
        'getObs': function(patId){
            Obs.remove({});

            try {
                const String = Assets.getText('observations.csv');

                const parse = Papa.parse(String, {header: true});
                let count = 0;
                for (let x in parse.data) {
                    if (parse.data[x].patId === patId) {
                        Obs.insert(parse.data[x]);
                        count += 1
                    }
                }
                // Observations are in there, but the date field is just a string.
                // This will transform the string in the "date" field into a javascript date.
                let all = Obs.find().fetch()
                for (let x in all){
                    let _id = all[x]._id
                    let date = new Date(all[x].date)
                    //console.log(date)
                    Obs.upsert({_id: _id},{$set: {date: date}})
                }

                console.log(count + ' observations entered')
            } catch (e) {
                console.log("something went wrong with parsing the observations data")
                console.log(e.message)
                return false
            }
            return true
        }
    })
}

if (Meteor.isClient){
    Meteor.subscribe('obs')
}