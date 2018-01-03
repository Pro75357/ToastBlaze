import {Observations} from "../../../../collections/observations";
import Chart from 'chart.js'

const metricCategory='Heart Failure';
Template.heartFailureTemplate.helpers({
    HFObservations(){
        let Obs = Observations.find({category: 'problems', metricCategory: metricCategory});
        if(Obs.count() > 0){
            return Obs.fetch()
        }
    },
    HFDxCount(){
        let Obs = Observations.find({category: 'problems', metricCategory: metricCategory});
        if(Obs.count()>0){
            return Obs.count()
        }
    },
});
