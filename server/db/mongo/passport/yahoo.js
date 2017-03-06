import request from 'request';
import User from '../models/user';
import yf from '../../../init/yahooFantasy';

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, params, profile, done) => {

  const options = {
      url: 'https://social.yahooapis.com/v1/user/' + params.xoauth_yahoo_guid + '/profile?format=json',
      method: 'get',
      json: true,
      auth: {
        bearer: accessToken
      }
    };

  return request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {

      const userObj = {
        id: body.profile.guiid,
        name: body.profile.nickname,
        avatar: body.profile.image.imageUrl,
        accessToken: accessToken,
        refreshToken: refreshToken
      };
      console.log(body.profile,"profile");
      yf.setUserToken(accessToken);

      return User.findOne({ yahoo: body.profile.guid}, (findByGoogleIdErr, existingUser) => {
        console.log("leita af user",existingUser);
        if (existingUser) return done(null, existingUser);
        return User.findOne({ email: body.profile.guiid }, (findByEmailErr, existingEmailUser) => {
          if (existingEmailUser) {
            console.log("currentEmail");

            return done(null, false, { message: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
          }
          console.log("creatig new")
          const user = new User();
          user.email = body.profile.guid;
          user.yahoo = body.profile.guid;
          user.tokens.push({ kind: 'yahoo', accessToken });
          user.profile.name = body.profile.nickname;
          user.profile.picture = body.profile.image.imageUrl;
          return user.save((err) => {
            done(err, user);
          });
        });
      });
    }
    return done(null, false, {message: 'blabla'});
  });
};
/* eslint-enable no-param-reassign */
