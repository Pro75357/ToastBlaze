import {Pat} from '../../../collections/pat'
import {Obs} from "../../../collections/observations";
import {Session} from "meteor/session";

Template.patientOverview.helpers({

    pat() {
        if (!(Session.get('patId') === undefined)) {
            return Pat.findOne()
        }
    },
    patSex(){ // return sex formatted as a word
        switch(Pat.findOne().gen.sex) {
            case "F":
                return "female";

            case "M":
                return "male";
            // in case is not M or F we just return what it is
            default:
                return Pat.findOne().gen.sex
        }
    },

    Synopsis(){
        return Obs.findOne({name: 'Synopsis'})
    },

    meds(){
        return Obs.find({category:'medications'}).fetch()
    },


    patVomit(){
        return JSON.stringify(Pat.find().fetch(), null, 2)
    }
})