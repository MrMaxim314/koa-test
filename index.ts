import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { authRouter } from './routes/authRoutes';
import { userRouter } from './routes/userRoutes';

const app = new Koa();

const port = 5000;

app.use(bodyParser());
app.use(authRouter.routes());
app.use(userRouter.routes());

app.listen(port, () => {
    console.log(`🚀 Server is running on port http://localhost:${port}/`);
});
