'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

/*
var sequelize = new Sequelize("postgres://abyvpzijtnigcu:ja0wEQfYo7F3fptAioE-0SCP64@ec2-54-235-199-36.compute-1.amazonaws.com:5432/daqbtkq43aihbo?sslmode=require",{
  dialect : 'postgres',
  dialectOptions: {
    ssl: true
  }
});
*/
// postgres://postgres:liondor97@localhost:5432/geokh
// postgres://postgres:postgres-postgres@91.121.181.105:5432/geokh
var sequelize = new Sequelize("postgres://postgres:liondor97@localhost:5432/geokh",{
  dialect : 'postgres'
});

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    if (file.slice(-3) !== '.js') return;
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
