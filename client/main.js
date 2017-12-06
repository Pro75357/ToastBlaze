import './main.html';

Template.body.helpers({
    PatientSelected() {
        let value = Session.get('patId')
        console.log(value)
        return value
    }
});