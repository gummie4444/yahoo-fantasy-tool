import YahooFantasy from 'yahoo-fantasy';
import { yahoo } from '../../../config/secrets';

// you can get an application key/secret by creating a new application on Yahoo!
let yf = new YahooFantasy(
  yahoo.clientID,
  yahoo.clientSecret
);

export default yf;
