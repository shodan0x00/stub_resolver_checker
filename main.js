const { Resolver } = require('dns');
const fs = require('fs');
const argv = require('yargs')
                        .demandCommand(1)
                        .argv;


console.log(`path is ${argv._[0]}`); // PATH
console.log(`domain is ${argv._[1]}`); // Domain name


if( argv._[1] != "" ) {
    dns_domains = argv._[1];
} else {
    dns_domains = "www.google.com";
}

dns_resolver_path = argv._[0];


// Get resolvers from file
let dns_resolvers_file = fs.readFileSync(dns_resolver_path).toString().split('\n');
for( item in dns_resolvers_file ) dns_resolvers_file[item] = dns_resolvers_file[item].trim();

// Create files for good resolver and bad resolvers
fs.writeFileSync('./good.txt', "");
fs.writeFileSync('./bad.txt', "");
// Create Resolver object for each ip in resolver list
class ResolverFabric {
    constructor(dns_ip, domain) {
        const tmp_resolver = new Resolver();
        tmp_resolver.setServers([dns_ip]);
        
        tmp_resolver.resolve4(domain, (err, address) => {
            if(err) {
                console.log("DNS server: " + tmp_resolver.getServers() + ` returned error: ${err.code}`);
                fs.appendFile('./bad.txt', `${tmp_resolver.getServers()} --- ${err.code}\n`, (err) => {
                    if(err) console.log('File write error');
                })
                tmp_resolver.cancel();
            } else {
                console.log("DNS server: " + tmp_resolver.getServers() + " get value " + address);
                fs.appendFile('./good.txt', `${tmp_resolver.getServers()} --- ${address}\n`, (err) => {
                    if(err) console.log('File write error');
                })
            }
        })
    }
}

for ( ip in dns_resolvers_file) new ResolverFabric(dns_resolvers_file[ip], 'www.yandex.ru')