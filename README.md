# xbee-helper

xbee-helper should be used together with xbi-api module to communicate with xbee radio communication modules.

The usual usage is to include the module with require and create an instance of the class:

    var XbeeHelper = require('./xbee-helper');

    var ZigBeeHelper = new XbeeHelper.ZigBeeHelper();

After this, the functions can be called by using the object:

    console.log(ZigBeeHelper.getATCommand('AT+1=OK,2=0'));


## ByteToString(bytes, trimEmd)

bytes is an array over byte character which will be translated into a string.

If trimEnd is true, all \r and \n will be removed from the end of the string.

The result will be returned as string.


## StringToByteArray(string)

string will be tranformed into a byte array.

The result will be returned.


## printFrame(frame, logger)

frame is an xbee frame as JSON object which will be parsed and printed for debugging.

Logger is a separate module to log different information to console as well as to a database.

If logger is not set, the internal logger class will be used which only print the message to console.


## getATCommand(rawString)

Receives an AT command string with the following structure: AT+{paramName1=paramVal1},{paramName2=paramVal2},{..}

The result will be a JSON object with the following content:

    var resultOjb = {

                        commandString: {rawString},
                        arrLength: N,
                        commandArr: [
                            {
                                commandName: '{..}',
                                commandParam: '{..}'
                            },
                            {
                                commandName: '{..}',
                                commandParam: '{..}'
                        ]

                    };

This allows to iterate with a forEach construct over the result to work with each program.

I use this to reduce the traffic within my wireless network to concatenate several values within one message.


## getDebug()

Returns the actual debug state.


## setDebug(state)

Sets the debug State.


