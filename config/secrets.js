/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/
export const sessionSecret = process.env.SESSION_SECRET || 'Iamcatthatlikeshouses';

export const google = {
  clientID: process.env.GOOGLE_CLIENTID || 'this should be a client id',
  clientSecret: process.env.GOOGLE_SECRET || 'this should be a secret',
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
};

export const yahoo = {
  clientID: process.env.YAHOO_CLIENTID || 'dj0yJmk9Y1NMUFlqSEtrT2ZTJmQ9WVdrOU9GbGhjRnBOTmpRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD04Nw--',
  clientSecret: process.env.YAHOO_SECRET || '42bddc20f5e3311b52b2cacc33b0a987aedff002',
  callbackURL: process.env.YAHOO_CALLBACK || 'http://mywebsite.dev/auth/yahoo/callback',
};

export const AWS_SECRET_ACCESS_ID = process.env.AWS_SECRET_ACCESS_ID || 'this should be access id';
export const AWS_SECRET_ACCESS_SECRET = process.env.AWS_SECRET_ACCESS_SECRET || 'this should be acces-secret';
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || 'photo-app-gudda';
