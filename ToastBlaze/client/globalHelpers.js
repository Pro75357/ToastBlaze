
// Global template helpers-

import {Observations} from "../collections/observations";
import {Metrics} from "../collections/metrics";

Template.registerHelper('NoPatientSelected', function(){
    return (Session.get('patId')===undefined)
});

Template.registerHelper('visibility', function(){
    return Session.get('visibility')
});

Template.registerHelper('metricPrograms', function(){
    let res = Metrics.find().fetch();
    let programs = ['All'];
    for (let x in res){
        if (!programs.includes(res[x].program)){
            programs.push(res[x].program)
        }
    }
    return programs
});

Template.registerHelper('formatDate',function(date){
    return moment(date).format('MM/DD/YYYY')
});

Template.registerHelper('colorValueHighBad',function(value, refLow, refHigh){
    //return a color to indicate when values are higher or lower than the reference value.
    // This one assumes the high values are bad and low are ok.
    if (value > refHigh) {
        return '#fc2418'
    } else if (value < refLow) {
        return '#48cffc'
    } else {
        return '#02fc1c'
    }
});

Template.registerHelper('getLastObsText',function(name){
    if (Observations.find({name: name}).count()>0) {
        return Observations.findOne({name: name}, {sort: {date: -1}}).text
    } else {
        return 'Not found'
    }
});

Template.registerHelper('getLastObsDate', function(name) {
    if (Observations.find({name: name}).count() > 0) {
        return moment(Observations.findOne({name: name}, {sort: {date: -1}}).date).format('YYYY-MM-DD')
    } else {
        return 'Not found'
    }
});

Template.registerHelper('getLastObsValue', function(name){
    if (Observations.find({name: name}).count()>0) {
        let obs =Observations.findOne({name: name}, {sort: {date: -1}});
        return obs.value + obs.unit
    } else {
        return 'Not found'
    }
});
Template.registerHelper('getLastObsValueNoUnit', function(name){
    if (Observations.find({name: name}).count()>0) {
        let obs =Observations.findOne({name: name}, {sort: {date: -1}});
        return obs.value
    } else {
        return 'Not found'
    }
});
