var start, result, difference, datecalc, Units = {};

start  = document.getElementById('startdate');
result = document.getElementById('result');
difference = document.getElementById('difference');
datecalc = document.getElementById('datecalc');

var year, month, day, hour, minute, second, millisecond;

/* 
TODO:
Figure out how to make weeks happen
*/

// var output = new Date(Units.year, Units.month, Units.day, Units.hour, Units.minute, Units.second, Units.millisecond);

function zeroPadLeft(input, length){
    var zero = '0', pad = '', len, padded, inp, extract;
    
    /* Convert to string */
    inp = input+'';
    
    arguments[1] ? len = arguments[1] : len = 2;
    
    extract = -len;

    while(len--){
        pad += zero;
    }
        
    padded = pad + input;
    
    return padded.substr(extract);
}

function setToday (updateField) {
    if( updateField.type == 'text'){
        var d, now = new Date(), date = [];
        
        date[0] = zeroPadLeft( 1 + now.getMonth() );
        date[1] = zeroPadLeft( now.getDate() );
        date[2] = now.getFullYear();
        
        d = date.join('/');
        updateField.value = d;
    } else {    
        updateField.valueAsNumber = new Date();
    }
}

function parseDateUnit (value) {
   return value.split(' ')[1];
}

function parseNumber (value) {
   return parseInt(value, 10);
}

function calculateDate (inputDate, difference) {
    var input, diff, num, unit, wks, d;
    
    input = new Date(inputDate);
    
    num  = parseNumber(difference);
    unit = parseDateUnit(difference);
    
    
    Units.years     =  input.getFullYear();
    Units.months    =  input.getUTCMonth();
    Units.month     =  input.getUTCMonth() + 1;
    Units.weeks     =  (60 * 60 * 24 * 7)
    Units.days      =  input.getUTCDate();
    Units.hours     =  input.getUTCHours();
    Units.minutes   =  input.getUTCMinutes();
    Units.seconds   =  input.getUTCSeconds();
    Units.milliseconds  =  input.getUTCMilliseconds();
    
    if(Units[unit]){
        if ( /week/.test(unit) ) {
            
            /* Multiply week "constant" by number of them */
            wks = Units.weeks * num;
            
            Units.seconds = Units.seconds + wks;
       
        } else {
            Units[unit] = Units[unit] + num; 
        }
         
    } else {
        throw new TypeError('Units must be year(s), month(s), week(s), day(s), hour(s), minute(s), or second(s), for example: -3 weeks.');  
    }
    
    d = new Date(Units.years, Units.months, Units.days, Units.hours, Units.minutes, Units.seconds, Units.milliseconds);
    return d;
  }

datecalc.addEventListener('submit', function(e){
    e.preventDefault();
    
    var today = !!startdate.valueAsNumber ? startdate.valueAsNumber : startdate.value;
        
    console.log( calculateDate(today, difference.value) );
});

window.addEventListener('DOMContentLoaded', function(e){
    setToday(startdate);
});



