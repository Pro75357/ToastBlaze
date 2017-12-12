import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor";

export const Metrics = new Mongo.Collection('metrics');

// Once our patient is selected we need to populate our pat collection.


if (Meteor.isServer) {

    Meteor.startup(() => {
        // clear ant Pat data at startup as there should not be any patient in context.
        Metrics.remove({})

    });


    Meteor.publish('metrics', function(){
        return Metrics.find()
    })

    Meteor.methods({
        'getMetrics': function(patId){
            Metrics.remove({})
            try {
                const metricsString = Assets.getText('metrics.csv');

                const metrics = Papa.parse(metricsString, {header: true});
                let count = 0;
                for (let x in metrics.data) {
                    if (metrics.data[x].patId === patId) {
                        Metrics.insert(metrics.data[x])
                        count += 1
                    }
                }
                console.log(count + ' metrics entered')
            } catch (e) {
                console.log("something went wrong with parsing the metrics data")
                console.log(e.message)
                return false
            }
            return true
        }
    })
}

if (Meteor.isClient){
    Meteor.subscribe('metrics')
}