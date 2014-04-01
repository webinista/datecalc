/* 
DateCalc.js: A simple script for doing date math.

Copyright (c) 2014 Tiffany Brown and Webinista, Inc. <http://www.webinista.com/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

/* 
TO DOs:
 - Make it into a reusable class.
 - Add error display. 
 - Make this work in IE8.
 - Make month, day names configurable.
*/

var DateCalc = function(){

    Object.defineProperty(this, 'DAYS', {
        configurable: true,
        enumerable: true,
        value: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    });
    Object.defineProperty(this,'MONTHS',{
        configurable: true,
        enumerable: true,
        value: ['January','February','March','April','May','June','July','August','September','October','November','December']
    }); 
}

DateCalc.prototype.zeroPadLeft = function(input, length){
    var zero = '0', pad = '', len, padded, inp, extract;
    
    /* Convert to string */
    inp = input+'';
    
    arguments[1] ? len = arguments[1] : len = 2;
    
    extract = len;

    while(len--){
        pad += zero;
    }
        
    padded = pad + input;
    
    return padded.substr(padded.length - extract);
}

DateCalc.prototype.parseDateUnit = function (value) {
   return value.toLowerCase().split(' ')[1];
}

DateCalc.prototype.parseNumber = function (string) {
	/* Using this instead of parseInt to accomodate floats */
    // var amount = string.match(/[\-\.0-9]/g); 
    /* 
    Going back to parseInt until we have though out issue 12. 
    https://github.com/webinista/datecalc/issues/12
    */
    var amount = parseInt(string,10);
	if(amount){
        // return +amount.join('');
        return amount;
    } else {
        return false;
    }
}

DateCalc.prototype.formatDate = function (dateObjOrTimestamp) {
    var days, months, local = [], utc = [];
    /* 
     TO DO: 
     Make this into a configurable/configuration object
    */
    
    days = this.DAYS;
    months = this.MONTHS;
    
    if (Object.prototype.toString.call(dateObjOrTimestamp) !== '[object Date]'){
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

/* Does the heavy lifting */
DateCalc.prototype.calculateDate = function (inputDate, difference) {
    var input, diff, num, unit, wks, d, Units = {};
    
	input = new Date(inputDate);

    num  = this.parseNumber(difference);
    unit = this.parseDateUnit(difference);
  
    /* Force plurals. */
    if (unit !== undefined && unit.indexOf('s') < 0) {
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
    
    if (Units[unit] !== undefined) {
        if ( /week/.test(unit) ) {           
            /* Multiply week "constant" by number of them */
            wks = Units.weeks * num;          
            Units.seconds = Units.seconds + wks;
        } else {
            Units[unit] = Units[unit] + num;  
        } 
    } else {
        return false; 
    }
    
    d = new Date(Units.years, Units.months, Units.days, Units.hours, Units.minutes, Units.seconds, Units.milliseconds);
    return d.getTime();
}



