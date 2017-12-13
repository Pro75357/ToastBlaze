import { Patients } from "../../../collections/patients";
import { Epss} from "../../../collections/epss";

Template.ePSSRecommendations.helpers({
    epssSpecific(){
        return Epss.findOne({}).specificRecommendations
    },

    epssVomit(){
        return JSON.stringify(Epss.findOne({}).specificRecommendations, null, 2)
    },
});

Template.ePSSRecommendations.events({

});