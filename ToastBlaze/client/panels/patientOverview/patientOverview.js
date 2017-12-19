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
        if(Pat.find().count() > 0) {
            switch (Pat.findOne().gen.sex) {
                case "F":
                    return "female";

                case "M":
                    return "male";
                // in case is not M or F we just return what it is
                default:
                    return Pat.findOne().gen.sex
            }
        }
    },

    Synopsis(){
        return Obs.findOne({name: 'Synopsis'})
    },

    meds(){
        return Obs.find({category:'medications'}).fetch()
    },
    social(){
        return Obs.find({category:'socialHistory'}).fetch()
    },

    getLastObsValue(category,name){
        if (Obs.find({category: category, name: name}).count()>0) {
            return Obs.findOne({category: category, name: name}).value
        } else {
            return 'Not found'
        }
    },
    getLastObsDate(category,name) {
        if (Obs.find({category: category, name: name}).count() > 0) {
            return Obs.findOne({category: category, name: name}).date
        } else {
            return 'Not found'
        }
    },

    patVomit(){
        //return JSON.stringify(Pat.find().fetch(), null, 2)
       // return JSON.stringify(Obs.find({category: 'socialHistory', name: 'Smoking Status'}).fetch(), null, 2)
    }
})