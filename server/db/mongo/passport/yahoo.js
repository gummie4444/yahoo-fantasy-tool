import request from 'request';
import User from '../models/user';

// you can get an application key/secret by creating a new application on Yahoo!

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, params, profile, done) => {
  // TODO: kannski medhondla req.user dotid
  return User.findOne({yahoo: params.xoauth_yahoo_guid }, (findByYahooIdErr, existingUser) => {
    if (existingUser) {
      existingUser.accessToken = accessToken;
      existingUser.refreshToken = refreshToken;
      return existingUser.save(() => {
        console.log('skila existingUser')         
        return done(null, existingUser);
      });
    }
    const options = {
        url: 'https://social.yahooapis.com/v1/user/' + params.xoauth_yahoo_guid + '/profile?format=json',
        method: 'get',
        json: true,
        auth: {
          bearer: accessToken
        }
      };
    console.log('enginn user til med thetta sækjum upplysingar')

    return request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        return User.findOne({ email: body.profile.guiid }, (findByEmailErr, existingEmailUser) => {
          if (existingEmailUser) {
            console.log('currentEmail');
            return done(null, false, { message: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
          }
          console.log('By til nyjan user');

          const user = new User();
          user.email = body.profile.guid;
          user.yahoo = body.profile.guid;
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          user.profile.name = body.profile.nickname;
          user.profile.picture = body.profile.image.imageUrl;
          return user.save((err) => {
            return done(err, user);
          });
        });
      }
        return done(null, false, {message: 'error med requestu a info'});
    });
  });
};
/* eslint-enable no-param-reassign */
