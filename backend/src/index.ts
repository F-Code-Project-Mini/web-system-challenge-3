import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import './configs/env';
import redisClient from './configs/redis';
import { defaultErrorHandler } from './middlewares/error.middlewares';
import { defaultSuccessHandler } from './middlewares/success.middlewares';
// import "./seeders/database";
import { initSocket } from './configs/socket';
import rootRouter from './routes/root.routes';
import './workers/email.worker';
const app = express();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : process.env.CLIENT_URL,
    credentials: true,
  }),
);
initSocket(server);
redisClient.connect();

app.use('/api/v1', rootRouter);

app.use(defaultErrorHandler);
app.use(defaultSuccessHandler);

server.listen(PORT, () => {
  console.log(`Server successfully launched on PORT ${PORT}!`);
});
