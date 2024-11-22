import "dotenv/config";
import express from "express";
import cors from "cors";


let app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'))


app.use((req,res,next) => {
    let currTime = new Date().toLocaleString()
    console.log(`req ${req.method} ${req.url} received at ${currTime}`)
    if(req.method === 'POST'){
        console.log(req.body)
    }
    next();
})
const port = 8080;//process.env.PORT 

app.listen(port,()=>{
    console.log("Server is listening at port:", port)
})

