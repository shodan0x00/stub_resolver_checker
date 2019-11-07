const dns = require('dns');

console.log( dns.getServers() );
console.log( dns.setServers(['8.8.8.8']) );
console.log( dns.getServers() );

dns.resolve('www.google.com', ( err, records ) => {
    console.log(records);
})