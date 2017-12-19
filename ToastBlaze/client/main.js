import './main.html';
import '../imports/global';

Template.body.onCreated( function(){
      // Session.set('patId',undefined);
      // Meteor.call('clearPat');
});


// How we set global helpers-

Template.registerHelper('NoPatientSelected', function(){
    return (Session.get('patId')===undefined)
});

Template.registerHelper('visibility', function(){
    return Session.get('visibility')
});