# Fantasy-tool

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

> fantasy helper for yahoo h2h 
#### Demo site: [**tbd**](tbd)

#### Redux DevTools

You will have to install redux devtools extension from [here](https://github.com/zalmoxisus/redux-devtools-extension) and then everything should just work!
## Instructions

#### Database

###### MongoDB

You will need to have mongoDB installed and running on your computer to make this work locally

```bash
# create the db folder
mkdir db

# Run the database
mongod --dbpath=./db
```
#### Proxying localhost:3000 to custom url (needed for yahoo authentication)
For `mac`:

Install `nginx`:
```bash
brew install nginx
```

Configure `nginx` to reroute to a custom url:
```bash
# Run test once
sudo nano /usr/local/etc/nginx/nginx.conf
```

Find the server section and change the configuration to this
```
server {
   listen       80;
   ...
   location / {
       proxy_pass http://127.0.0.1:****(your port(this example uses 3000));
   }
   ...
}
```

Configure your host file to reroute `localhost/127.0.0.1` to a custom url:
```
sudo nano /etc/hosts
```

Add the entry for example `mywebsite.dev`:
```
127.0.0.1 mywebsite.dev (used for this example)
```

Run `nginx` and run the server:
```
sudo nginx 
```
Now you need to insert the custom url you used on `yahoo.developer` in the callback URL!!!! #winning

#### Running
Remember you have to have nginx and mongoDb running so it works!!

```bash
# Run in production
npm start

# Run in development
npm run dev
```
#### Editor

I recommend using visual studio code!

I have a simular setup to this [one](http://equimper.github.io/2017/02/25/why-i-moved-away-from-atom-to-visual-studio-code-and-my-setup/)

#### Unit Tests

Testing with:
- `karma` as test runner
	- `karma.conf.js` for the main karma configuration (it has webpack configurations)
	- `tests.webpack.js` which is the single entry file. It uses `webpack`'s require API to find all the files we need that have a `-test.js` suffix.
- `mocha` as the test framework
- `jsdom` as my test environment

```bash
# Run test once
npm test

# Run in watch mode
npm test:watch
```

License
===============
MIT
