import {Obs} from "../../../collections/observations";

Template.Problems.helpers({

    probs(){
        return Obs.find({category:'problems', retroSeq: '1'}).fetch()
    },

    obsVomit()
    {
        if (Obs.find().count() > 0) {
            return JSON.stringify(Obs.find().fetch(), null, 2)
        }
    }

});

Template.Problems.events({


});