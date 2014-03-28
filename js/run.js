var start, result, difference, datecalc;
var setToday, parseDateUnit, parseNumber, formatDate, calculateDate;

start  = document.getElementById('startdate');
result = document.getElementById('result');
difference = document.getElementById('difference');
datecalc = document.getElementById('datecalc');

var DateCalc = new DateCalc();

datecalc.addEventListener('submit', function(e){
    var today, future;
    e.preventDefault();
    
    today = !!startdate.valueAsNumber ? startdate.valueAsNumber : startdate.value;
        
    future = DateCalc.calculateDate(today, difference.value);
    
    result.value = DateCalc.formatDate(future).local;
});

window.addEventListener('DOMContentLoaded', function(e){
    setToday(startdate);
});

setToday = function (updateField) {
    if( updateField.type == 'text'){
        var d, now = new Date(), date = [];
        
        date[0] = zeroPadLeft( 1 + now.getMonth() );
        date[1] = zeroPadLeft( now.getDate() );
        date[2] = now.getFullYear();
        
        d = date.join('/');
        updateField.value = d;
    } else {    
        updateField.valueAsNumber = Date.now();
    }
}