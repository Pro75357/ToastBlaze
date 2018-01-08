import { Mongo } from 'meteor/mongo';
export const Epss = new Mongo.Collection('epss');
import {HTTP } from 'meteor/http'
import {Pat} from "./pat";
import {Observations} from "./observations";



/*
This is where we will fetch and store the AHRQ EPSS recommendations
use of this requires an ePSS key, and there is some logic to fetch and validate the key here
The key should be placed in the Private folder, in a file called 'ePSS_Key.json'
THe file should be a simple json object:

{
  "Key":"PUT_KEY_HERE"
}

Please review the AHRQ Copyright and Disclaimer notice before using the API: https://www.uspreventiveservicestaskforce.org/Page/Name/copyright-notice.
Instructions for use and access information can be found at:
•	Instruction for Use:  http://epss.ahrq.gov/PDA/docs/ePSS_Data_API_WI_wLink.pdf
•	URL:  http://epssdata.ahrq.gov/
 */

if (Meteor.isServer) {

    Meteor.methods({

        'getEpss': function () {

            // only update if empty- updatePat should empty this collection...
            if (Epss.find().count() > 0 ) {
                return
            }

            // First, we need to know the epss api url
            const url = 'http://epssdata.ahrq.gov/';
            let ePSS_Key = '';
            // Next, get the ePSS key from the text file in the Private folder.
            // this file will not sync with git if it is in the .gitignore

            try {
                ePSS_Key = JSON.parse(Assets.getText('ePSS_Key.json'));
                // If the key is blank or not updated, we cannot continue..

                if (ePSS_Key.key === 'PUT_KEY_HERE') {
                    console.log('ePSS Key not found or invalid- please input your ePSS key into ePSS_Key.json file in private folder');
                    return;
                }
            } catch(e){
                console.log('Fetching ePSS key failed. Please make sure ePSS_Key.json exists in the private folder.');
                console.log(e.message)
            }


            // get info from Pat, Observations collections

            let sex = Pat.findOne().gen.sex;
            let age = getAge(Pat.findOne().gen.dob);
            let tobacco = '';
            if (Observations.findOne({category: 'socialHistory', name: 'Smoking Status'})) {
                tobacco = Observations.findOne({category: 'socialHistory', name: 'Smoking Status'}).value;
            }

            let sexuallyActive = '';
            if (Observations.findOne({category: 'socialHistory', name: 'Sexually Active'}))
                sexuallyActive = Observations.findOne({category: 'socialHistory', name: 'Sexually Active'}).value;
            let pregnant = null;
            if(sex ==='F'){
                pregnant = 'N' // placeholder for real logic
            }

            //build the params object
            let params = {
                age: age,
                sex: sex,
                pregnant: pregnant, // 'N' -- (Y,N) - requires Female sex to be present
                tobacco: tobacco,
                sexuallyActive: sexuallyActive,
                grade: ['A', 'B']
            };

            // lastly, insert key into params
            params.key = ePSS_Key.key;

            // Try to fetch the ePSS recommendations based on the params.
            try {
                HTTP.call('get', url,{
                        headers: 'accept: json',
                        params
                    }, function(err, result){
                    if(err){
                        throw err
                    } else {
                        //only want to store the specific recommendations array objects
                        let epssCount = 0;
                        let recs = result.data.specificRecommendations;
                        for (let x in recs) {
                            Epss.insert(recs[x]);
                            epssCount +=1;
                        }
                        console.log(epssCount + ' ePSS recs inserted');
                        return true
                    }

                    }
                );

            } catch (e) {
                console.log(e)
            }
        },

        'clearEpss': function (){
            Epss.remove({})
        }

    });

        // Publication function from the server- this let's us define what the client-side db gets
        Meteor.publish('epss', function(){
            // we will return the entire collection.
            return Epss.find()
        })
}
        // as the client, subscribes to the above publication
if (Meteor.isClient){
    Meteor.subscribe('epss')
}