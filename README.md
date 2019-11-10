# stub_resolver_checker
Node.js application that checks resolvers availability

Example

./node main <path_to_resolvers> [ domain (default google.com) ]

This program sends 'A' query to from each resolver to verify if this resolver is worked. If got answer add this resolver to good.txt. If error this resolver will go to bad.txt

Folder contain:

main.js - main program
small_stub.txt - small list of dns resolvers for tests
stub.txt - unverifid stub of 1000 dns resolvers 
good.txt - contain good resolvers from stub.txt
bad.txt - contain bad resolvers from stub.txt
