var fs = require('fs');
fs.unlink('./new_one/some_one.txt', function() {
  fs.rmdir('new_one', function() {});
});
//fs.mkdir('new_one', function() {
//  fs.writeFile('./new_one/some_one.txt', "Я создан", function() {
//    console.log("Всё сработало");
//  });
//});
