"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const accessTokenRoute_1 = __importDefault(require("./routes/accessTokenRoute"));
const requestBenefitRoute_1 = __importDefault(require("./routes/requestBenefitRoute"));
const setCookie_1 = __importDefault(require("./routes/setCookie"));
const cookieCheckRoute_1 = __importDefault(require("./routes/cookieCheckRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Adding CORS for allowing cross-origin resource sharing from frontend to back & parsers
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/access-token-route", accessTokenRoute_1.default);
app.use("/benefit-route", requestBenefitRoute_1.default);
app.use('/set-cookie', setCookie_1.default);
app.use('/check-cookie', cookieCheckRoute_1.default);
const port = process.env.PORT || 8000;
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ errors: [{ message: "Something went wrong! Please try again later" }] });
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
