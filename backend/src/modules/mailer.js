import path from 'path';
import nodeMailer from 'nodemailer';
import handleBars from 'nodemailer-express-handlebars';

import 'dotenv/config';

var transport = nodeMailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
});

transport.use('compile', handleBars({
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('./src/resources/mail/'),
    defaultLayout: false
  },
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html',
}));

export default transport;