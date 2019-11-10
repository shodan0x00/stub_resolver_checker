// Test TIMEOUT 

const dns = require('dns');

function LookupWrapper( domain, timeout, callback) {
    let callbackCalled = false;
    
    let doCallback = function( err, domains ) {
        callbackCalled = true;
        callback(err, domains);
    };

    setTimeout(function() {
        doCallback(new Error("Timeout exceeded"), null);
    }, timeout);

    dns.resolve4(domain, doCallback);
}

LookupWrapper('www.yandex.ru', 200, (err, address) => {
    console.log(address)
})