import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import accessTokenRoute from './routes/accessTokenRoute';
import benefitRoute from './routes/requestBenefitRoute';
import setCookie from './routes/setCookie';
import checkCookie from './routes/cookieCheckRoute';

dotenv.config();

const app = express();

// Adding CORS for allowing cross-origin resource sharing from frontend to back & parsers
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/access-token-route", accessTokenRoute);
app.use("/benefit-route", benefitRoute);
app.use('/set-cookie', setCookie);
app.use('/check-cookie', checkCookie);

const port = process.env.PORT || 8000;

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).send({errors: [{message: "Something went wrong! Please try again later"}]})
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})