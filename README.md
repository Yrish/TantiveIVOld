# Tantium IV
A code camp project.

## setup:
* [install node.js](https://nodejs.org/en/)
* install nodemon (run the following command in a linux shell -terminal, windows powershell)
```bash
npm install -g nodemon
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
* and now start the server with nodemon by running nodemon in the shell
```bash
nodemon
```

---
## Navigation
So far these are the routs available:
```bash
/
/accounts/login
/accounts/register
/accounts/logout
```
