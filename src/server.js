import express from "express";
import cors from 'cors';

const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send({ status: 'Bien!' })
})

app.get("/test", (req, res) => {
    res.send({ status: 'Bien!' })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})