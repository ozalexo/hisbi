#!/usr/bin/env bash

rm private.key private.pem private.crt
# openssl req \
    # -newkey rsa:4096 \
    # -x509 \
    # -nodes \
    # -keyout private.pem \
    # -new \
    # -out private.crt \
    # -subj /CN=localhost \
    # -reqexts SAN \
    # -extensions SAN \
    # -config <(cat /System/Library/OpenSSL/openssl.cnf \
        # <(printf '[SAN]\nsubjectAltName=DNS:localhost')) \
    # -sha512 \
    # -days 365

openssl req -config ssl.conf -new -sha256 -newkey rsa:2048 -nodes -keyout private.key -x509 -days 3650 -out private.crt
openssl x509 -in private.crt -out private.pem -outform PEM
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain private.crt
