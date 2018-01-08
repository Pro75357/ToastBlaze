import './main.html';
import '../imports/global';

Template.body.onCreated( function(){
    if(Session.equals('visibility', undefined)) {
        Session.set('visibility', 'hidden');
    }
});