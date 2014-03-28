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
    
    result.value = DCO.formatDate(future).local;
});

addEvent(window, 'load', function(e){
    setToday(startdate);
});

setToday = function (updateField) {
    if( updateField.type == 'text'){
        var d, now = new Date(), date = []; 
        
        date[0] = DCO.zeroPadLeft( 1 + now.getMonth() );
        date[1] = DCO.zeroPadLeft( now.getDate() );
        date[2] = now.getFullYear();
        
        d = date.join('/');
        updateField.value = d;
    } else {    
        updateField.valueAsNumber = Date.now();
    }
}

