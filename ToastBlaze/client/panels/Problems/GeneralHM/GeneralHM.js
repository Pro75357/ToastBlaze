import {Observations} from "../../../../collections/observations";
import {Metrics} from "../../../../collections/metrics";
import {Session} from "meteor/session";


Template.generalHMTemplate.helpers({

    GeneralMetrics(){
        if(Session.equals('select','All')){
            if(Metrics.find({category: {$in :['Cancer','Prevention']}}).count() > 0){
                return Metrics.find({
                    category: {$in :['Cancer','Prevention']},
                    status: {$in: ['Red','Yellow']}
                }).fetch()
            }
        } else if(Metrics.find({program: Session.get('select')}, {category: {$in :['Cancer','Prevention']}}).count() > 0) {
            return Metrics.find({
                program: Session.get('select'),
                category: {$in :['Cancer','Prevention']},
                status: {$in: ['Red','Yellow']}
            }).fetch()
        }
    },
    StatusIndicator(status){
        switch(status){
            case 'Red':
                return new Handlebars.SafeString('<svg height="10" width="10"><circle cx="5" cy="5" r="4" stroke="black" stroke-width="1" fill="red" /></svg>');
            case 'Yellow':
                return new Handlebars.SafeString('<svg height="10" width="10"><circle cx="5" cy="5" r="4" stroke="black" stroke-width="1" fill="yellow" /></svg>');
            default:
                return; // there should really only be red and yellow here.
        }
    }
});