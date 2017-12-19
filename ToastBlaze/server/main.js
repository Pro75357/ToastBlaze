import { Meteor } from 'meteor/meteor';
import '../imports/global';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
    'resetAll': function(){
        console.log('Full reset called...');
        Meteor.call('resetPatients');
        Meteor.call('clearEpss');
        Meteor.call('clearPat');
    }
});