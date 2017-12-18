import {Metrics} from "../../../collections/metrics";
import {Obs} from "../../../collections/observations";
import { Session } from 'meteor/session'

// set our initial metrics to default to MU
Session.set('select', 'MU');

SelectMetrics = function(color) {
    return Metrics.find({program: Session.get('select'), status: color})
}

Template.acuereMetrics.helpers({

    // dev helpers
    metricsCount(){
        return SelectMetrics.count()
    },
    metricsVomit(){
        return JSON.stringify(SelectMetrics().fetch(), null, 2)
    },

    //returns each category based on the helper function SelectMetrics

    metricsRed(){
        let color = "Red"
        if (SelectMetrics(color).count() > 0 ) {
            return SelectMetrics(color).fetch()
        }
    },

    metricsYellow(){
        let color = "Yellow"
        if (SelectMetrics(color).count() > 0 ) {
            return SelectMetrics(color).fetch()
        }
    },
    metricsGreen(){
        let color = "Green"
        if (SelectMetrics(color).count() > 0 ) {
            return SelectMetrics(color).fetch()
        }
    },

    // The catch-all for all other statuses - $nin means "Not in"
    metricsGrey(){
        if (SelectMetrics(({$nin: ["Red","Yellow","Green"]})).count() > 0 ) {
            return SelectMetrics(({$nin: ["Red","Yellow","Green"]})).fetch()
        }
    },


    // This builds the select options for the metrics selector
    metricPrograms(){
        let res = Metrics.find().fetch();
        let programs = [];
        for (var x in res){
            if (!programs.includes(res[x].program)){
                programs.push(res[x].program)
            }
        }
        return programs
    },


    // These special helpers get passed the ObsID from the corresponding metrics
    // and they fetch the observation data
    obsName(obsId){
        return Obs.findOne({_id: obsId}).name
    },
    obsDate(obsId){
        return Obs.findOne({_id: obsId}).date
    },
    obsValue(obsId){
        return Obs.findOne({_id: obsId}).value
    },
    // this one needs the period as well - it is in months
    dueDate(obsId, period){
        let lastDate = moment(Obs.findOne({_id: obsId}).date);
        return lastDate.add(period,'month').format('MM/DD/YYYY')
    }

});

Template.acuereMetrics.events({

    // Change the metrics to only show what the selector has selected
    'change #metric-select': function(event){
        Session.set('select',event.target.value)
    }
});
