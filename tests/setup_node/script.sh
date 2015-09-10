# NOTE: Script runs from base directory

# Set config to Travis CI
mv config/config.json config/config.json.bak
ln -s testing/setup_node/travis_ci.json config/config.json

# Generate SSL for HTTPS
openssl req -x509 -newkey rsa:2048 -keyout config/key.pem -out config/cert.pem -days 1825 -nodes -subj '/CN=www.c4esports.com/O=C4 eSports/C=CA'
