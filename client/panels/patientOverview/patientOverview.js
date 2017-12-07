import { Patients} from "../../../collections/patients";
import {Pat} from '../../../collections/pat'
import {Session} from "meteor/session";

Template.patientOverview.helpers({

    pat() {
        if (!(Session.get('patId') === undefined)) {
            return Pat.findOne({})
        }
    },

})