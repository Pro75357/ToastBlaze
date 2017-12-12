import { Patients} from "../../collections/patients";


Template.header.helpers({
    yes(){
        return 'yes'
    }
})

Template.header.events({
    'change #mainSelect': function(event){
        Meteor.call('mainMenu',event.target.value)
        event.target.value = 'default'

    }
});