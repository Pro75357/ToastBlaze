import { Patients} from "../../../collections/patients";
import {Pat} from '../../../collections/pat'
import {Session} from "meteor/session";

Template.patientOverview.helpers({

    pat() {
        if (!(Session.get('patId') === undefined)) {
            return Pat.findOne({})
        }
    },
    patVomit(){
        return JSON.stringify(Pat.find().fetch(), null, 2)
    }
})