#!/usr/bin/env bash

openssl genrsa -out private.key 4096
openssl req -newkey rsa:4096 -x509 -nodes -keyout private.key -new -out private.pem -reqexts SAN -extensions SAN -config <(cat /System/Library/OpenSSL/openssl.cnf <(printf '[SAN]\nsubjectAltName=DNS:localhost')) -sha256 -days 3650

# openssl req -new -sha256 -out private.csr -key private.key -config ssl.conf
# openssl x509 -req -days 3650 -in private.csr -signkey private.key -out private.crt -extensions req_ext -extfile ssl.conf
openssl x509 -in private.crt -out private.pem -outform PEM
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain private.crt
