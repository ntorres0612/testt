var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var randomize = require('randomatic');
const loading = require('loading-cli');
const industrialProtocol = require('./industrialProtocol');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const port = 3000


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(port, () => {

  console.log(`Example app listening on port ${port}`)
  let inputList = [{ start: 2, end: 9 }, { start: 4, end: 2 }, { start: 1, end: 4 }, { start: 5, end: 1 }]
  // let inputList = [{ start: 3, end: 5 }, { start: 5, end: 7 }];


  //Método que inicializa el array que simula la memoria de 4096 posiciones
  industrialProtocol.init();

  //Obtener la posición de inicio y final de acuerdo al input de entrada[inputList]
  let { start, end } = industrialProtocol.getStartEnd(inputList);

  // Iniciamos la lectura de acuerdo al rango inicial(start) y rango final(end) esto 
  // con el fin de hacer una unica lectura en memoria
  industrialProtocol.read(start, end, function (response) {
    const load = loading("Leyendo...").start()
    console.log("\n");
    load.text = "Leido";
    load.stop();

    // Una vez obtenido el rango de datos(response) obtenemos los valores por cada uno de los elementos del [inputList]
    // Pero en este caso los seleccionamos del resultado obtenido de acuerdo al rango
    inputList.forEach((input, index) => {
      industrialProtocol.getResponseForEachInput(input, response, start, function (response) {
        console.log(`Respuesta ${index + 1}`, response)
      });
    });

  });


})




// let inputList = [{ start: 2, end: 9 }, { start: 4, end: 2 }, { start: 1, end: 4 }, { start: 5, end: 1 }]
// let inputList = [{ start: 3, end: 5 }, { start: 5, end: 7 }];


module.exports = app;
