import { Patients } from "../../../collections/patients";
import { Pat } from "../../../collections/pat";
import {Epss} from "../../../collections/epss";

Template.acuereMetrics.helpers({
    acuereVomit(){
        return JSON.stringify(Pat.find().fetch(), null, 2)
    },
});

Template.acuereMetrics.events({


});
