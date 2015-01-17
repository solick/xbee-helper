/**
 * Created by lynmatten on 14.01.15.
 */


// Helper class

var xbee_api = require('xbee-api');
var C = xbee_api.constants;




/**
 * Class with several helper function for communication and work with xbee-api
 * @param debug
 * @constructor
 */
var ZigBeeHelper = function(debug)
{

    if(debug == null)
    {
        this_debug = false;
    }
    else
    {
        this._debug = debug;
    }


};

/**
 * function ByteToString() - receives a byte array as parameter, converts the byte array into a string
 * ans returns a string.
 * Optional, if TrimEnd is true, all '\r' and '\n' signs will be removed
 * @param bytes
 * @param TrimEnd
 * @returns {string}
 * @constructor
 */
ZigBeeHelper.prototype.ByteToString = function(bytes, TrimEnd) {

    var str="";
    for(var i = 0; i < bytes.length; i++)
    {
        var char = bytes[i];

        str += String.fromCharCode(char);
    }

    if(TrimEnd)
    {
        /* Remove '\r\n' or similar from end of string if exists */
        str = str.replace(/(\r\n|\n|\r)/gm,"");


    }

    return str;
};

/**
 * function StringToByteArray() - receives a string and converts it to a byte array and returns the byte array
 * @param str
 * @returns {Array}
 * @constructor
 */
ZigBeeHelper.prototype.StringToByteArray = function(str)
{

    var bytes = [];
    for (var i = 0; i < str.length; ++i)
    {
        bytes.push(str.charCodeAt(i));
    }

    return bytes;

};

/**
 * function printFrame() - prints a xbee frame received by xbee-api
 * @param frame
 * @param logger
 */
ZigBeeHelper.prototype.printFrame = function(frame, logger) {

    //console.log(">> ", frame);

    var _logger = null;

    /**
     * For testing, the logger function will be not delivered as parameter
     * and redefined to return the message instead of printing to console.log
     */
    if(logger)
    {
        _logger = logger;
    }
    else
    {
        var testLog = function() {

        };

        testLog.prototype.logMessage = function(message, type) {

            var testString = type + ": " + message;

            return(testString);
        };


        _logger = new testLog();
    }

    switch (frame.type)
    {
        case C.FRAME_TYPE.REMOTE_COMMAND_RESPONSE:

            if(frame.command == "MY")
            {
               return _logger.logMessage("<< Received Short Mac Address " + frame.remote16 + " for " + frame.remote64, "IN");
            }

            break;

        case C.FRAME_TYPE.ZIGBEE_RECEIVE_PACKET:
            return _logger.logMessage("<< Receive Packet - Data from " + frame.remote64 + " / " + frame.remote16 + ": " + this.ByteToString(frame.data, true), "IN");
            break;

        case C.FRAME_TYPE.ZIGBEE_EXPLICIT_RX:

            return _logger.logMessage("<< Explicit RX - Data from " + frame.remote64 + " / " + frame.remote16 + " receive options: "+ frame.receiveOptions+ ": " + this.ByteToString(frame.data, true), "IN");

            break;

        case C.FRAME_TYPE.ZIGBEE_TRANSMIT_STATUS:

            return _logger.logMessage(">> Transmit status for id: " + frame.id + " --> remote16: " + frame.remote16 + " transmitRetryCount: " + frame.transmitRetryCount + " deliveryStatus: " + frame.deliveryStatus + " discoveryStatus : " + frame.discoveryStatus, "IN");

            break;

        default:
           return _logger.logMessage("!! Unknown frame type: " + frame.type, "ERROR");

    }

};

/**
 * function getATCommand() - parse a string for AT command options and returns a JSON object
 * An AT command has to have the following structure: AT+{parameter1.name}={parameter1.value},{parameter2.name}={parameter2.value}...
 * @param data
 * @returns {*}
 */
ZigBeeHelper.prototype.getATCommand = function(data) {

    var cmdJSON = {};

    /* check if AT Command */

    if(data.length < 4)
    {
        // cannot be an AT Command
        //console.log("no AT Command");
        return null;
    }
    else if(data.substr(0,3) != "AT+")
    {
        // cannot be an AT Command
        //console.log("no AT Command");
        return null;
    }
    else
    {

        cmdJSON.commandString = data;
        cmdJSON.arrLength = 0;
        cmdJSON.commandArr = [];

        var tmpArr = data.substr(3,data.length).split(',');

        for(var i = 0; i < tmpArr.length; i++)
        {
            var command = tmpArr[i];

            var tmpObj = {
                commandName: "",
                commandParam: ""
            };

            var param = "";
            var subcmd = "";


            if(command.indexOf('=') > -1)
            {
                subcmd = command.substr(0,command.indexOf('='));
                param = command.substr(command.indexOf('=')+1, command.length-1);

                //console.log("subcmd: " + subcmd + " -- pram: " + param);


                tmpObj.commandName = subcmd;
                tmpObj.commandParam = param.replace(/(\r\n|\n|\r)/gm,"");

                cmdJSON.commandArr.push(tmpObj);

                cmdJSON.arrLength++;
            }


        }



    }


    return cmdJSON;


};

/**
 * function getDebug() - returns the debug state (true|false)
 * @returns {*}
 */
ZigBeeHelper.prototype.getDebug = function() {

    return this._debug;

};

/**
 * function setDebug() - set the debug state (true|false)
 * @param debug
 * @returns {boolean}
 */
ZigBeeHelper.prototype.setDebug = function(debug) {

    if(debug == null)
    {
        return false;
    }
    else if(typeof debug !== 'boolean')
    {
        return false;
    }
    else
    {
        this_debug = debug;
        return true;
    }

};

exports.ZigBeeHelper = ZigBeeHelper;
