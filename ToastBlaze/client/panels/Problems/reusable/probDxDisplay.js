import {Observations} from "../../../../collections/observations";

Template.probDxDisplay.helpers({
    DxObservations(){
        let Obs = Observations.find({
            category: 'problems',
            metricCategory: this.metric
            });
        if(Obs.count() > 0){
            return Obs.fetch()
        }
    },
    DxCount(){
        let Obs = Observations.find({
            category: 'problems',
            metricCategory: this.metric
            });
        if(Obs.count()>0){
            return Obs.count()
        }
    },
})