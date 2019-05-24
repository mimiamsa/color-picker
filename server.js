require("dotenv").config();
require("./models/db_connection");

const express = require("express"); // import this node framework
const bodyParser = require("body-parser"); // middleware to get data of post requests
const hbs = require("hbs"); // template engine import
const app = express();

app.locals.site_url = process.env.SITE_URL;

const flash = require("connect-flash"); // message flash : persiste entre les redirections
const session = require("express-session"); //sessions make data persist between http calls
const sessionStore = new session.MemoryStore(); // mandatory for flashMessage
const passport = require("passport");

app.locals.url = process.env.SITE_URL;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");


app.use(
  session({
    cookie: { maxAge: 1800000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: true,
    secret: "mySüperS3cr3tSh0uüÜlB3H4rd2Cr@@@ck|"
  })
);

// ==> login
app.use(passport.initialize()); // init passport lib
app.use(passport.session()); // connect passport to session system
app.use(checkloginStatus); // check user connection at each server request
app.use(flash()); // setup flash message for passport



app.use(function flashMessageCatcher(req, res, next) {
  // if there's a flash message in the session request...
  // make it available in the response, then delete it
  res.locals.flashMessage = req.session.flashMessage;
  delete req.session.flashMessage;
  next();
});

function checkloginStatus(req, res, next) {
  res.locals.isLoggedIn = req.isAuthenticated();
  res.locals.user = req.user;
  next();
}


// Custom routes image
const apiImage = require("./routes/api_image");
const routerImage = require("./routes/router_dashboard_image");
app.use(routerImage);
app.use("/api/image/", apiImage.router);

// Custom routes palette
const apiPalette = require("./routes/api_palette")
const routerPalette = require("./routes/router_dashboard_palette");
app.use(routerPalette);
app.use("/api/palette/", apiPalette.router) //prefix all pages


// Custom routes User
const apiUser = require("./routes/api_user");
const routerUser = require("./routes/router_dashboard_user");
const dashboardUserRouter = require("./routes/router_dashboard_user");

app.use(routerUser);
app.use("/api/user/", apiUser.router);
app.use("/dashboard/user/", dashboardUserRouter);

app.use(function handle404(req, res) {
  res.status(404).render("page_not_found");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("app started at http://localhost:" + listener.address().port);
});
