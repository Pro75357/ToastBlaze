import {Metrics} from "../../../../collections/metrics";
import {Session} from "meteor/session";

Template.probMetricsTable.helpers({
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
    }

});