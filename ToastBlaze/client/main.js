import './main.html';
import '../imports/global';

Template.body.onCreated( function(){
    if(Session.equals('visibility', undefined)) {
        Session.set('visibility', 'hidden');
    }
    // page control- we start off with dataLoading as true
    // this gets returned as a helper below.
    // it is set as false after the metrics are loaded.
    Session.set('dataLoading', true)
});

Template.body.helpers({
    dataLoading(){
        return Session.get('dataLoading')
    }
});