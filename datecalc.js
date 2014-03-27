var start, result, difference, datecalc;

start  = document.getElementById('startdate');
result = document.getElementById('result');
difference = document.getElementById('difference');
datecalc = document.getElementById('datecalc');

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
        updateField.valueAsNumber = Date.now();
    }
}

function parseDateUnit (value) {
   return value.split(' ')[1];
}

function parseNumber (value) {
   return parseInt(value, 10);
}

function formatDate (dateObjOrTimestamp) {
    var days, months, local = [], utc = [];
    /* 
     TO DO: 
     Make this into a configurable/configuration object
    */
    
    days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        
    if (Object.prototype.toString.call(dateObjOrTimestamp) !== '[object Date]') {
        dateObjOrTimestamp = new Date(dateObjOrTimestamp);
    }
    local[0] = days[dateObjOrTimestamp.getDay()]+',';
    local[1] = months[dateObjOrTimestamp.getMonth()];
    local[2] = dateObjOrTimestamp.getDate()+',';
    utc[3] = local[3] = dateObjOrTimestamp.getFullYear();
      
 
    utc[0] = days[dateObjOrTimestamp.getUTCDay()]+',';
    utc[1] = months[dateObjOrTimestamp.getUTCMonth()];
    utc[2] = dateObjOrTimestamp.getUTCDate()+',';
    
    return {
        local: local.join(' '),
        utc:   utc.join(' ')
    };
}

function calculateDate (inputDate, difference) {
    var input, diff, num, unit, wks, d, Units = {};
    
    input = new Date(inputDate);
    
    num  = parseNumber(difference);
    unit = parseDateUnit(difference);
    
    /* Test for and force a plural. */
    if( unit.indexOf('s') < 0 ){
        unit += 's';
    }
    
    Units.years     =  input.getFullYear();
    Units.months    =  input.getUTCMonth();
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
    return d.getTime();
  }

datecalc.addEventListener('submit', function(e){
    var today, future;
    e.preventDefault();
    
    today = !!startdate.valueAsNumber ? startdate.valueAsNumber : startdate.value;
        
    future = calculateDate(today, difference.value);
    
    result.value = formatDate(future).local;
});

window.addEventListener('DOMContentLoaded', function(e){
    setToday(startdate);
});



