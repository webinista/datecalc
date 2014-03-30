var startdate, result, difference, datecalc, DCO = new DateCalc();

startdate  = document.getElementById('startdate');
result = document.getElementById('result');
difference = document.getElementById('difference');
datecalc = document.getElementById('datecalc');

Utils.addEvent(datecalc, 'submit', function(e){
    var today, future;
    
    if(e.preventDefault){
    	e.preventDefault();
    } else {
    	e.returnValue = false;
    }
    
    today = !!startdate.valueAsNumber ? startdate.valueAsNumber : startdate.value;
        
    try {
        future = DCO.calculateDate(today, difference.value);
        result.innerHTML = DCO.formatDate(future).local;
    } catch (e) {
        showError(e, startdate);   
    }
});

Utils.addEvent(window, 'load', function(e){
    setToday(startdate);
});

Utils.addEvent(startdate, 'invalid', function(e){
    console.log(e.detail.message);
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

var showError = function(err, obj){
    var e, evtc, dict = {};
    
    dict.detail = {};
    dict.detail.message = err.message;
   
    if ('oninvalid' in window) {
        evtc = Object.prototype.toString.call(CustomEvent);
        if( evtc == "[object Function]" || evtc == "[object CustomEventConstructor]"){          
            e = new CustomEvent('invalid',dict);  
        } else {
            e = document.createEvent('Event');
            e.detail = dict.detail;
            e.initEvent('invalid',false,false);
        }
        startdate.dispatchEvent(e);
    } else {
        console.log(err.message);
    }
}