# GeokH-web

Backend software system used by GeokH to manage the mobile app configurations

## General

This backend application has been developped by the Uiversity of Lille through the HubHouse.
It works in pair with the mobile application (https://github.com/HubHouse-Lille/GeokH-app)
The system allows an admin of the system to manage all external data to the application.

The mobile application provide a geo-localised route determined by geo-markers.
Once in a close range to the next route geo-marker, the app ask the user a question.
Through the successfully answered questions, the user get informations about a secret enttrepreneur.
With the last question come a specific topic. It is asked to determine which entrepreneur is the one that has been described during the game.
The user aim is to get the highest score possible.

## Entities

This server reflect the application data model. The following entities are editable in addition to the users to access the platform.

![alt tag](https://raw.githubusercontent.com/jvdurieu/GeokH-web/dev/public/img/modeldb.png)


## Usage

The server run a Node [ExpressJS 4](http://expressjs.com/) module. The ORM is handled by Sequelize.

### To install

```
git clone
npm install

npm start
```
