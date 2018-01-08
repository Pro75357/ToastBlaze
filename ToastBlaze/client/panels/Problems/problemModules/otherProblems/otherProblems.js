import {Observations} from "../../../../../collections/observations";

Template.otherProblemsTemplate.helpers({

    otherProblems() {
        let Obs = Observations.find({
            category: 'problems',
            metricCategory: {$nin: ['Diabetes', 'Hypertension', 'Heart Failure', 'Heart Disease']}
        });
        if (Obs.count() > 0) {
            return Obs.fetch()
        }
    }
});