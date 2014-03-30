var Utils = function(){}
Utils.prototype.addEvent = function(obj, evt, method){
   if(window.attachEvent) {
      obj.attachEvent('on'+evt, method);
   } else {
      obj.addEventListener(evt, method, false);
   }
}
var Utils = new Utils();