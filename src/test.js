/**
 * Created by lynmatten on 14.01.15.
 */


var XbeeHelper = require('./xbee-helper');

var ZigBeeHelper = new XbeeHelper.ZigBeeHelper();

console.log(ZigBeeHelper.getATCommand('AT+1=OK,2=0'));