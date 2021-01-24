"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("./config/passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
dotenv_1.default.config();
//mongoose setup
let mongodbURI;
if (process.env.NODE_ENV === 'test') {
    mongodbURI = process.env.MONGODB_TEST_URI;
}
else {
    mongodbURI = process.env.MONGODB_URI;
}
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.set('useCreateIndex', true);
mongoose_1.default.set('useNewUrlParser', true);
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.set('useUnifiedTopology', true);
mongoose_1.default.connect(mongodbURI)
    .then(db => {
    console.log('Connected to MongoDB');
});
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(helmet_1.default());
app.use(morgan_1.default('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// routes setup
routes_1.default(app);
app.use(passport_1.default.initialize());
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    next(err);
});
// error handler
app.use((err, req, res, next) => {
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
app.use(cors_1.default(corsOption));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}..!!`));
exports.default = app;
//# sourceMappingURL=app.js.map