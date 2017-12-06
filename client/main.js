import './main.html';

Template.body.onCreated( function(){
        Session.set('patId',"0")
})


// How we set global helpers-

Template.registerHelper('NoPatientSelected', function(){
    return (Session.get('patId')==="0")
})