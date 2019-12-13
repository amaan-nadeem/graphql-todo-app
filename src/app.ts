import express, {Application, Response, Request} from 'express';
import graphqlHTTP from 'express-graphql';
import connectDB from './config/db';
import cors from 'cors'
import schema from './schemas/schema';
const app: Application = express();


// connecting to mongodb
connectDB();


// adding cors
app.use(cors());

// graphql setup 
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Listening request on Port ${PORT}`)); 