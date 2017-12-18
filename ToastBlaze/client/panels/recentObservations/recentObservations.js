import {Obs} from "../../../collections/observations";

Template.recentObservations.helpers({


    vitals()
    {
        if (Obs.find().count() > 0) {
            return Obs.find({category: "vitals"}).fetch()
        }
    }
,
    laboratory()
    {
        if (Obs.find().count() > 0) {
            return Obs.find({category: "labs"}).fetch()
        }
    }
,
    procedures()
    {
        if (Obs.find().count() > 0) {
            return Obs.find({category: "procedures"}).fetch()
        }
    }
,

    obsVomit()
    {
        if (Obs.find().count() > 0) {
            return JSON.stringify(Obs.find().fetch(), null, 2)
        }
    }

});

Template.recentObservations.events({


});