const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const dotenv = require('dotenv').config()
const bcrypt = require('bcryptjs');
const User = require("./models/user");
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const cors = require('cors');

var indexRouter = require('./routes/index');
var postRouter = require('./routes/post');
var commentRouter = require('./routes/comment');

const mongoDb = "mongodb+srv://" + dotenv.parsed.USERNAME + ":" + dotenv.parsed.PASSWORD + "@cluster0.y2sspz1.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

passport.use('login',
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            };
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                // passwords do not match!
                return done(null, false, { message: "Incorrect password" })
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        };
    })
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: dotenv.parsed.SECRET,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({error: err});
});

module.exports = app;