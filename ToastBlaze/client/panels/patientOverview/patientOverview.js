import {Pat} from '../../../collections/pat'
import {Observations} from "../../../collections/observations";
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
        return Observations.findOne({name: 'Synopsis'})
    },

    meds(){
        return Observations.find({category:'medications'}).fetch()
    },
    social(){
        return Observations.find({category:'socialHistory'}).fetch()
    },
    allergies(){
        return Observations.find({category:'allergy'}).fetch()
    },

    getLastObsValue(category,name){
        if (Observations.find({category: category, name: name}).count()>0) {
            return Observations.findOne({category: category, name: name}).value
        } else {
            return 'Not found'
        }
    },
    getLastObsDate(category,name) {
        if (Observations.find({category: category, name: name}).count() > 0) {
            return Observations.findOne({category: category, name: name}).date
        } else {
            return 'Not found'
        }
    },

    patVomit(){
        //return JSON.stringify(Pat.find().fetch(), null, 2)
       // return JSON.stringify(Observations.find({category: 'socialHistory', name: 'Smoking Status'}).fetch(), null, 2)
    }
})