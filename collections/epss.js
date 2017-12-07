import { Mongo } from 'meteor/mongo';
export const Epss = new Mongo.Collection('epss');
import {HTTP } from 'meteor/http'


/*
Please review the AHRQ Copyright and Disclaimer notice before using the API: https://www.uspreventiveservicestaskforce.org/Page/Name/copyright-notice.
Instructions for use and access information can be found at:
•	Instruction for Use:  http://epss.ahrq.gov/PDA/docs/ePSS_Data_API_WI_wLink.pdf
•	URL:  http://epssdata.ahrq.gov/
 */

if (Meteor.isServer) {

    Meteor.methods({

        'getEpss': function (params) {
            //Very first, clean out the ePSS data
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
            if (ePSS_Key.key === 'PUT_KEY_HERE'){
                console.log('ePSS Key not found or invalid- please input your ePSS key into ePSS_Key.json file in private folder')
                return false
            } else {
                // If no params are passed, populate some defaults for testing
                // todo: remove defaults and instead return an error - this should be fetched from patient data
                if (!params){
                    params = {
                        age: '18',
                        sex: 'Male',
                        tobacco: 'N',
                        sexuallyActive: 'N',
                        grade: 'A'
                    }
                }
                // lastly, insert key into params
                params.key = ePSS_Key.key;

                // Try to fetch the ePSS recommendations based on the params.
                try {
                    var res = HTTP.call('get',
                        url,
                        {
                            headers: 'accept: json',
                            params
                        }
                    )

                } catch (e) {
                    console.log(e)
                }

            //console.dir(res.data)
            Epss.insert(res.data)
            console.log('ePSS Data: ' + Epss.find().count())
            return true
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