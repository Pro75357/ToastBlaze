import { Patients } from "../../../collections/patients";
import { Epss} from "../../../collections/epss";

Template.ePSSRecommendations.helpers({
    epssSpecific(){
        if(Epss.find().count() > 0) {
            return Epss.findOne({}).specificRecommendations
        }
    },

    epssVomit(){
        if (Epss.find().count() > 0){
            return JSON.stringify(Epss.findOne({}).specificRecommendations, null, 2)
        }
    },
});

Template.ePSSRecommendations.events({

});