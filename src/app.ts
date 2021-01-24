
import express from 'express';
import  helmet from 'helmet';
import  cors from 'cors';
import  path from 'path';
import  morgan from 'morgan';
import  bodyParser from 'body-parser';
import  passportManager from './config/passport';
import  mongoose from 'mongoose';
import  dotenv from 'dotenv';
import setRoutes from './routes';
import { Request, Response} from "express";
const app = express();
dotenv.config();
//mongoose setup
let mongodbURI;
if (process.env.NODE_ENV === 'test') {
  mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  mongodbURI = process.env.MONGODB_URI;
}
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(mongodbURI)
  .then(db => {
    console.log('Connected to MongoDB');
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// routes setup
setRoutes(app);
app.use(passportManager.initialize());
// catch 404 and forward to error handler
app.use(function(req:Request, res:Response, next:any) {
  const err = new Error('Not Found');

  next(err);
});
// error handler
app.use((err:any, req:Request, res:Response, next:any) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// enable cors
const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['token']
};
app.use(cors(corsOption));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}..!!`));

export default app;
