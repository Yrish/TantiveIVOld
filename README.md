# Tantium IV
A code camp project.

## setup:
* [install node.js](https://nodejs.org/en/)
* install nodemon (run the following command in a linux shell -terminal, windows powershell)
```bash
npm install -g nodemon
```
* you will also need to install yarn (you may need to run these as sudo
```bash
npm install -g yarn
```
* [install mongodb](https://www.mongodb.com/download-center?jmp=nav#community) - community edition
* start mongodb in a certain directory (this starts the database which is hosted in the directory)
```bash
mongod --dbpath directory
```
for me this looks like
```bash
mongod --dbpath ~/Desktop/dbs/codeCamp
```
* now edit the your computer's hosts file to map tantiumiv.test to local host (127.0.0.1)
```bash
sudo nano /etc/hosts
```

(that's for Mac, I am not sure where it is in windows) and then add the line

```
127.0.0.1       tantiumiv.test
```

* now you should be ready to run the server
* change your directory to where the server is (for me it is ~/Desktop/CodeCamping/server)
```bash
cd ~/Desktop/CodeCamping/server
```
* next you need to install the dependences
```bash
yarn
```
if yarn does not work you can run...
```bash
npm install
```
* and now start the server with nodemon by running nodemon in the shell
```bash
yarn dev
```

This will start three servers on your device:
```bash
http://tantiumiv.test:8080/
```
which hosts the react app

```bash
http://tantiumiv.test:3030
```
which hosts the api

and finally
```bash
ws://tantiumiv.test:3030/ws
```
which hosts the websocket manager

the [react server](http://tantiumiv.test:8080/) (hosted at: http://tantiumiv.test:8080/) is the only one you need to worry about.

The react server is found under
```bash
./reactapps/standard/
```
from the project directory, the react app is what you want to modify.
