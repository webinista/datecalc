var start, result, difference, Units = {};

start  = document.getElementById('startdate');
result = document.getElementById('result');
difference = document.getElementById('difference');

var year, month, day, hour, minute, second, millisecond;

// new Date(year, month, day, hour, minute, second, millisecond);

start.valueAsNumber;

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

function setNow(updateField){
    var now = new Date(), date = [], time = [];
    date[0] = now.getFullYear();
    date[1] = now.getMonth();
    date[2] = now.getDate();
    
    time[0] = now.getHours();
    time[1] = now.getMinutes();
    time[2] = now.getSeconds();
    
    var d = date.join('-');
    var t = time.join(':');
    
    console.log( d + 'T' + t);
}
// setNow();

console.log( zeroPadLeft(98, 3) );

//start.value = '2013-01-01T01:01:00';