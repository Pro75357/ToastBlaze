import { Mongo } from 'meteor/mongo';
export const Epss = new Mongo.Collection('epss');
import {HTTP } from 'meteor/http'
import {Pat} from "./pat";



/*
Please review the AHRQ Copyright and Disclaimer notice before using the API: https://www.uspreventiveservicestaskforce.org/Page/Name/copyright-notice.
Instructions for use and access information can be found at:
•	Instruction for Use:  http://epss.ahrq.gov/PDA/docs/ePSS_Data_API_WI_wLink.pdf
•	URL:  http://epssdata.ahrq.gov/
 */

if (Meteor.isServer) {

    Meteor.methods({

        'getEpss': function () {
            //Very first, clean out old ePSS data (if any)
            Epss.remove({});

            // First, we need to know the epss api url
            const url = 'http://epssdata.ahrq.gov/';

            // Next, get the ePSS key from the text file in the Private folder.
            // this folder will not sync with git as it is in the .gitignore
            try {
                var ePSS_Key = JSON.parse(Assets.getText('ePSS_Key.json'))
            } catch(e){
                console.log('Fetching ePSS key failed. Please make sure ePSS_Key.json exists in the private folder.')
                console.log(e.message)
            }

            // If the key is blank or not updated, we cannot continue..
            //let blankKeys = ['','PUT_KEY_HERE']
            if (ePSS_Key.key === 'PUT_KEY_HERE') {
                console.log('ePSS Key not found or invalid- please input your ePSS key into ePSS_Key.json file in private folder')
                return false
            }
// build our params

            let params = {
                age: getAge(Pat.findOne().gen.dob),
                sex: Pat.findOne().gen.sex,
                //pregnant: 'N' -- (Y,N) - requires Female sex to be present
                //tobacco: 'N', -- (Y,N)
                //sexuallyActive: 'N' -- (Y,N)
                grade: ['A', 'B']
            };

            // lastly, insert key into params
            params.key = ePSS_Key.key;

            // Try to fetch the ePSS recommendations based on the params.
            try {
                HTTP.call('get',
                    url,
                    {
                        headers: 'accept: json',
                        params
                    }, function(err, result){
                    if(err){
                        throw err
                    } else {
                        //only want to store the specific recommendations array objects
                        let epssCount = 0;
                        let recs = result.data.specificRecommendations;
                        for (var x in recs) {
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

        Meteor.publish('epss', function(){
            return Epss.find()
        })
}

if (Meteor.isClient){
    Meteor.subscribe('epss')
}