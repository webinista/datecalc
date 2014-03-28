var startdate, result, difference, datecalc, DCO = new DateCalc();

startdate  = document.getElementById('startdate');
result = document.getElementById('result');
difference = document.getElementById('difference');
datecalc = document.getElementById('datecalc');

var addEvent = function(obj, evt, method){
	if(window.attachEvent) {
		obj.attachEvent('on'+evt, method);
	} else {
		obj.addEventListener(evt, method, false);
	}
}
 
addEvent(datecalc, 'submit', function(e){
    var today, future;
    if( e.preventDefault){
    	e.preventDefault();
    } else {
    	e.returnValue = false;
    }
    today = !!startdate.valueAsNumber ? startdate.valueAsNumber : startdate.value;
        
    future = DCO.calculateDate(today, difference.value);
    
    console.log(DCO.formatDate(future).local);
    
    result.innerHTML = DCO.formatDate(future).local;
});

addEvent(window, 'load', function(e){
    setToday(startdate);
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

