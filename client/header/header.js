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
})

Template.patientSelect.helpers({
    patList(){
        var Pats = Patients.find({}).fetch()
        //console.dir(Pats)

        //todo: why is this returning 4 patients?
        var list = []
        for (x in Pats){
                list.push({
                    name: Pats[x].fname + ' ' + Pats[x].lname,
                    patId: Pats[x].patId
                    })
            }
           // console.dir(list)
        return list
    },
    name(){
        return 'PatientNamePlaceholder'
        //return Patients.findOne({_id: patId}).name
    },
    dob(){
        return 'patDOBplaceholder'
    }
})