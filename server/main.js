import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
    'mainMenu': function(option){
        switch(option){
            case 'resetDb':
                {console.log('resetDbCalled')}
                Meteor.call('resetPatients')
                break;
            case 'clearDb':
                {console.log('clearDB Called')}
                break;
            default:
                console.log('nothing called?')
        }
    }
})