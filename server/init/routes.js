/**
 * Routes for express app
 */
import passport from 'passport';
import upload from './multer';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const imagesController = controllers && controllers.images;
const yahooController = controllers && controllers.yahoo;

export default (app) => {
  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }


  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  if (passportConfig && passportConfig.yahoo) {
    app.get('/auth/yahoo', passport.authenticate('oauth2', {
    }));


    app.get('/auth/yahoo/callback',
      passport.authenticate('oauth2', {
        successRedirect: '/',
        failureRedirect: '/login'
      }));
  }

  if (yahooController) {
    app.get('/leagues', yahooController.getLeagues);
  }

  // image routes
  if (imagesController) {
    // EXAMPLE usage of a API for images
    app.get('/images', imagesController.all);
    app.delete('/image:image', imagesController.remove);
    app.put('/image:image', imagesController.update);
    console.log(upload, 'upload');
    if (upload) {
      // If USE_MULTER is true then you can recive files via upload.single or see docs
      app.post('/image/:image', upload.single('file'), imagesController.add);
    }

  } else {
    console.warn(unsupportedMessage('image routes'));
  }
};
