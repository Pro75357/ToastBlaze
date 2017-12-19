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
    let programs = [];
    for (let x in res){
        if (!programs.includes(res[x].program)){
            programs.push(res[x].program)
        }
    }
    return programs
});
