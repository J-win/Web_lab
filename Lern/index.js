var fun = require('./modul');
var events = require('events');
var util = require('util');
var fs = require('fs');

console.log(fun.array_sum([1, 1, 1]));
console.log(fun.array_count([1, 1, 1]));
console.log(fun.number);
console.log(fun.multiply(4, 5));

var myEmit = new events.EventEmitter();
myEmit.on('some_event', function(text) {
  console.log(text);
});
myEmit.emit('some_event', 'Обработчик событий сработал');

var Cars = function(model) {
  this.model = model;
};
util.inherits(Cars, events.EventEmitter);
var bmw = new Cars('BMW');
var audi = new Cars('Audi');
var volvo = new Cars('Volvo');
var cars = [bmw, audi, volvo];
cars.forEach(function(car) {
  car.on('speed', function(text) {
    console.log(car.model + " speed is - " + text);
  });
});
bmw.emit('speed', '254.5 km');
volvo.emit('speed', '180 km');

var file_readed = fs.readFileSync('text.txt', 'utf8');
var message = "Привет мир\n" + file_readed;
fs.writeFileSync('new_file.txt', message);

fs.readFile('text.txt', 'utf8', function(err, data) {
  console.log(data);
});
fs.writeFile('some.txt', 'Hi', function(err, data) {});
console.log("Test");
