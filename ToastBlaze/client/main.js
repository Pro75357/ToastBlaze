import './main.html';
import '../imports/global';
import {Metrics} from "../collections/metrics";

Template.body.onCreated( function(){
    if(Session.equals('visibility', undefined)) {
        Session.set('visibility', 'hidden');
    }
});


// How we set global helpers-

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
            return '#fc9c87'
        } else if (value < refLow) {
            return '#87fcea'
        } else {
            return '#93fc87'
        }
});
