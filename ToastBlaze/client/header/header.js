Template.header.helpers({

});

Template.header.events({
    'change #mainSelect': function(event){
        switch(event.target.value){
            case 'resetDb':
                // Server call to reset databases
                Meteor.call('resetAll');
                // set the DOM element #patientSelect back to default
                document.getElementById('patientSelect').value = 0;
                // set the Session variable to no selected patient
                Session.set('patId', undefined);

                break;
            default:
                Session.set('visibility',event.target.value);
                //console.log('Dev Visibility set to: '+event.target.value);
        }

        //Meteor.call('mainMenu',event.target.value)
        event.target.value = 'default'

    }
});