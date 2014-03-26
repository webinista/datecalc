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

function setToday(updateField){
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

setToday(startdate);
