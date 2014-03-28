var start, result, difference, datecalc, DCO = new DateCalc();

start  = document.getElementById('startdate');
result = document.getElementById('result');
difference = document.getElementById('difference');
datecalc = document.getElementById('datecalc');


datecalc.addEventListener('submit', function(e){
    var today, future;
    e.preventDefault();
    
    today = !!startdate.valueAsNumber ? startdate.valueAsNumber : startdate.value;
        
    future = DCO.calculateDate(today, difference.value);
    
    result.value = DCO.formatDate(future).local;
});

window.addEventListener('DOMContentLoaded', function(e){
	
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