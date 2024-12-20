import express, {Request, Response} from 'express';
import cors from 'cors';
import { loginRouter } from '../routes/loginRoutes';
import { userRouter } from '../routes/userRoutes';
import { corsMiddleware } from '../config/cors';

const app = express();

app.use(corsMiddleware);
app.use(cors()); 
app.use(express.static('public'));
app.use(express.json());


app.use('/', loginRouter);

app.use('/user', userRouter);

export { app };