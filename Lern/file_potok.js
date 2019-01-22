var fs = require('fs');
var myReadShort = fs.createReadStream(__dirname + '/book.txt', 'utf8');
var myWriteShort = fs.createWriteStream(__dirname + '/new_book.txt');
myReadShort.on('data', function(chunk) {
  console.log("Новые данные получены");
  myWriteShort.write(chunk);
});
