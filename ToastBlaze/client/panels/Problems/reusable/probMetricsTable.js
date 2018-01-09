import {Metrics} from "../../../../collections/metrics";
import {Session} from "meteor/session";
import {Observations} from "../../../../collections/observations";

Template.probMetricsTable.helpers({
    // Here is where we define the helpers for the problem-based metrics table
    // it gets the metric name from what is passed to the template.

    Metrics(){
        let category = this.metric;
        //console.log(this.metric);
        if(Session.equals('select','All')){
            if(Metrics.find({category: category}).count() > 0){
                return Metrics.find({
                    category: category,
                    status: {$in: ['Red','Yellow']}
                }).fetch()
            }
        } else if(Metrics.find({program: Session.get('select')}, {category: category}).count() > 0) {
            return Metrics.find({
                program: Session.get('select'),
                category: category,
                status: {$in: ['Red','Yellow']}
            }).fetch()
        }
    },

    greenMetricsCount(){
        let category = this.metric;
        //console.log(this.metric);
        if(Session.equals('select','All')){
            if(Metrics.find({category: category}).count() > 0){
                return Metrics.find({
                    category: category,
                    status: "Green"
                }).count()
            }
        } else if(Metrics.find({program: Session.get('select')}, {category: category}).count() > 0) {
            return Metrics.find({
                program: Session.get('select'),
                category: category,
                status: "Green"
            }).count()
        }
    },

    greenMetricsList(){
        let category = this.metric;
        //console.log(this.metric);
        if(Session.equals('select','All')){
            if(Metrics.find({category: category}).count() > 0){
                let stringList = '';
                let metrics = Metrics.find({
                    category: category,
                    status: "Green"
                }).fetch();
                for (let x in metrics){
                    stringList += metrics[x].program + ' - ' + metrics[x].name + '\r\n'; //adds a new return line
                }
                return new Handlebars.SafeString(stringList);
            }
        } else if(Metrics.find({program: Session.get('select')}, {category: category}).count() > 0) {
                let stringList = '';
                let metrics = Metrics.find({
                    program: Session.get('select'), //this is what's different
                    category: category,
                    status: "Green"
                }).fetch();
                for (let x in metrics){
                    stringList += metrics[x].program + ' - ' + metrics[x].name + '\r\n'; //adds a new return line
                }
                return new Handlebars.SafeString(stringList);
            }
    },

    // returns a little colored circle based on the status
    StatusIndicator(status){
        switch(status){
            case 'Red':
                return new Handlebars.SafeString('<svg height="10" width="10"><circle cx="5" cy="5" r="4" stroke="black" stroke-width="1" fill="red" /></svg>');
            case 'Yellow':
                return new Handlebars.SafeString('<svg height="10" width="10"><circle cx="5" cy="5" r="4" stroke="black" stroke-width="1" fill="yellow" /></svg>');
            case 'Green':
                return new Handlebars.SafeString('<svg height="10" width="10"><circle cx="5" cy="5" r="4" stroke="black" stroke-width="1" fill="lightgreen" /></svg>');
            default:
                return new Handlebars.SafeString('<svg height="10" width="10"><circle cx="5" cy="5" r="4" stroke="black" stroke-width="1" fill="grey" /></svg>');
        }
    },
    // These special helpers get passed the ObsID from the corresponding metrics
    // and they fetch the observation data
    // these are the same that are in "all metrics"
    obsName(obsId){
        if(Observations.find({_id: obsId}).count()>0) {
            return Observations.findOne({_id: obsId}).name
        }
    },
    obsDate(obsId){
        if(Observations.find({_id: obsId}).count()>0) {
            return moment(Observations.findOne({_id: obsId}).date).format('MM-DD-YYYY')
        }
    },
    obsValue(obsId){
        if(Observations.find({_id: obsId}).count()>0) {
            let value = Observations.findOne({_id: obsId}).value;
            let unit = Observations.findOne({_id: obsId}).unit;
            return value+unit;
        }
    },

});