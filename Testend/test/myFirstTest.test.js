const assert = require("assert");
//const { it } = require("mocha").it;
//const { describe } = require("mocha").describe;
//const axios = require("axios");

describe('My first test', function() {
    it('Test value', async()=>{
        
        var myValue = false;

        assert.equal(myValue, myValue);
    });
});