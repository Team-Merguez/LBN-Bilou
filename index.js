const express = require("express");
const exphbs = require("express-handlebars");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models").User; // same as: const User = require('./models/user');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const port = process.env.PORT || 3000;

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://localhost:27017/au_coin_barbes",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
);

const app = express();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  firstname: String,
  surname: String,
  profilPicture: String
});

// const User = mongoose.model('User', userSchema);

// Express_config

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Definit public
app.use(express.static(__dirname + '/public'));

// gestion_session
app.use(
  expressSession({
    secret: "merguez007",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // Save the user.id to the session
passport.deserializeUser(User.deserializeUser()); // Receive the user.id from the session and fetch the User from the DB by its ID

// app.get("/", (req, res) => {
//   console.log("GET /");
//   res.render("home");
// });

app.get("/admin", (req, res) => {
  console.log("GET /admin");
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.render("admin");
  } else {
    res.redirect("/");
  }
});

app.get("/signup", (req, res) => {
  console.log("GET /signup");
  if (req.isAuthenticated()) {
    res.redirect("/admin");
  } else {
    res.render("signup");
  }
});

app.post("/signup", (req, res) => {
  console.log("POST /signup");

  console.log("will signup");

  const username = req.body.username;
  const password = req.body.password;

  User.register(
    new User({
      username: username
      // other fields can be added here
    }),
    password, // password will be hashed
    (err, user) => {
      if (err) {
        console.log("/signup user register err", err);
        return res.render("signup");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/admin");
        });
      }
    }
  );
});

app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/admin");
  } else {
    res.render("login");
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login"
  })
);


app.get("/logout", (req, res) => {
  console.log("GET /logout");
  req.logout();
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
