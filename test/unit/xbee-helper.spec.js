/**
 * Created by lynmatten on 14.01.15.
 */


var XbeeHelper = require('../../src/xbee-helper.js');


describe('xbee-helper class', function() {

    var ZigBeeHelper = new XbeeHelper.ZigBeeHelper();

    it('should create a valid object', function() {

        expect(ZigBeeHelper).toBeDefined();
        expect(ZigBeeHelper).not.toBeNull();
    });

    describe('API', function() {

        var ZigBeeHelper = null;

            beforeEach(function() {

                ZigBeeHelper = new XbeeHelper.ZigBeeHelper();

        });

        afterEach(function() {



        });

        describe('ByteToString() function', function() {

            it('should be implemented', function() {

                expect(ZigBeeHelper.ByteToString).toBeDefined();

            });

            it('should correctly convert a byte array to a string', function() {

                var byte = [72,101,108,108,111,32,87,111,114,108,100,33]; /*Hello World!*/
                var string = "Hello World!";

                expect(ZigBeeHelper.ByteToString(byte)).toBe(string);


            });

        });

        describe('StrinToByteArray() function', function() {

            it('should be implemented', function() {

                expect(ZigBeeHelper.StringToByteArray).toBeDefined();

            });

            it('should correctly convert a string to a byte array', function() {

                var byte = [72,101,108,108,111,32,87,111,114,108,100,33]; /*Hello World!*/
                var string = "Hello World!";

                expect(ZigBeeHelper.StringToByteArray(string)).toEqual(byte);

            });

        });


        describe('printFrame() function', function() {

            it('should be implemented', function() {

                expect(ZigBeeHelper.printFrame).toBeDefined();
            });

            it('should print a default message', function() {

                var defaultMessage = "ERROR: !! Unknown frame type: test";
                var testFrame = {
                    type: 'test'
                };

                expect(ZigBeeHelper.printFrame(testFrame)).toEqual(defaultMessage);

            });



        });


        describe('getATCommand() function', function() {

            it('should be implemented', function() {

                expect(ZigBeeHelper.getATCommand).toBeDefined();

            });



        });

        describe('getDebug() function', function() {

            it('should be implemented', function() {

                expect(ZigBeeHelper.getDebug).toBeDefined();
            });
        });


        describe('setDebug() function', function() {

            it('should be implemented', function() {

                expect(ZigBeeHelper.setDebug).toBeDefined();
            });

        });


    });

});