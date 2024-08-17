import express from 'express';
import mongoSanitize  from 'express-mongo-sanitize';

import usersRoute from './routes/users.js'



const app = express();
const port = 3000;

app.use(mongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/users', usersRoute);

app.listen(port, () => {
    console.log(`listen port:${port}`);
})