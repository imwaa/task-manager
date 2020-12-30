const express = require('express')
const path = require('path')
const exphbs = require("express-handlebars");
const morgan = require("morgan")
const methodOverride = require("method-override")
const flash = require("connect-flash")
const session = require("express-session")
const passport = require("passport")
const Handlebars = require("handlebars")
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const { helpers } = require('handlebars');



// Initializations
const app = express();
require('./config/passport')


// Settings

app.set("port", process.env.PORT || 4000);

app.use(express.urlencoded({
  extended: false
}))

app.set("views", path.join(__dirname, "views"));

const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  extname: ".hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),



  helpers:{
    getUser : function(){
      return res.local.user
    },
    eq: (v1, v2) => v1 === v2,
    ne: (v1, v2) => v1 !== v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
    and() {
        return Array.prototype.every.call(arguments, Boolean);
    },
    or() {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    },
  }
})
app.engine(
  ".hbs",
  hbs.engine
);
app.set("view engine", ".hbs");


// Middlewares

app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())



// Global variables
app.use((req, res, next) => {

  res.locals.succes_msg = req.flash('succes_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user

  next()
})



// Routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/notes.routes'))
app.use(require('./routes/users.routes'))
app.use(require('./routes/company.routes'))
app.use(require('./routes/tasks.routes'))



// Static Files
app.use(express.static(path.join(__dirname, 'public')))




module.exports = app;