import './main.html';
import '../imports/global';
import {Pat} from "../collections/pat";

Template.body.onCreated( function(){
       Session.set('patId',undefined);
       Meteor.call('clearPat');
})


// How we set global helpers-

Template.registerHelper('NoPatientSelected', function(){
    return (Session.get('patId')===undefined)
})