import {Pat} from '../../../collections/pat'
import {Obs} from "../../../collections/observations";
import {Session} from "meteor/session";

Template.patientOverview.helpers({

    pat() {
        if (!(Session.get('patId') === undefined)) {
            return Pat.findOne()
        }
    },

    getObsTextbyName(name){
        return Obs.findOne({name: name}).text
    },

    patVomit(){
        return JSON.stringify(Pat.find().fetch(), null, 2)
    }
})