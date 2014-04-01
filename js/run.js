var startdate, result, difference, datecalc, DCO;

startdate  = document.getElementById('startdate');
result = document.getElementById('result');
difference = document.getElementById('difference');
datecalc = document.getElementById('datecalc');

DCO = new DateCalc(startdate.valueAsDate, difference.value);
 
Utils.addEvent(datecalc, 'submit', function(e){
    var today, future;
    
    if(e.preventDefault){
    	e.preventDefault();
    } else {
    	e.returnValue = false;
    }
    
    today = !!startdate.valueAsNumber ? startdate.valueAsNumber : startdate.value;
        
    future = DCO.calculateDate(today, difference.value);
    result.innerHTML = DCO.formatDate(future).local;
});

Utils.addEvent(window, 'load', function(e){
    setToday(startdate);
});

Utils.addEvent(difference, 'invalid', function(e){
    if(e.target.validity.patternMismatch){
        e.target.setCustomValidity('Please enter suitable time period, for example: "3 weeks" or "-100.5 hours."');   
    } else {
        e.target.setCustomValidity('');
    }
});

setToday = function (updateField) {
	var d, now = new Date(), date = []; 
    if( updateField.type == 'text'){
        
        date[0] = DCO.zeroPadLeft( 1 + now.getMonth() );
        date[1] = DCO.zeroPadLeft( now.getDate() );
        date[2] = now.getFullYear();
        
        d = date.join('/');
        updateField.value = d;
    } else {    
    	/* Doing all of this here because we want the date to be local to the user, not UTC */
        updateField.valueAsNumber = new Date( now.setHours( now.getHours() - now.getTimezoneOffset()/60 ) );
    }
}

window.onerror = function(e){
    console.log('error!')   
}
var fireError = function(err, obj){
    var e, evtc, dict = {};
    
    dict.detail = {};
    dict.detail.message = err.message;
    
    /* May be making invalid assumptions here, 
       but it works in IE8 */
    
    if ('oninvalid' in window) {
        e = document.createEvent('Event');
        e.detail = dict.detail;
        e.initEvent('invalid',false,false);
        difference.dispatchEvent(e);
    } else {
        showError(err.message);
    }
}

var showError = function (message) {
    console.log(err.message);
}