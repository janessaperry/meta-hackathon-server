import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from 'fs';

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
const port = 8080;

app.listen(port,()=>{
    console.log("Server is listening at port:", port)
})

//this can be completely changed based on what the front-end needs
app.get("/posts/:id", (req,res)=>{
    let dataId = req.params.id;
    let data = JSON.parse(fs.readFileSync(`./data/posts/${dataId}.json`))
    res.json(data)
})

app.get("/profiles/:id", (req,res)=>{
    let dataId = req.params.id;
    let data = JSON.parse(fs.readFileSync(`./data/profiles/${dataId}.json`))
    res.json(data)
})


/*

data structure:

pageData{
    "type":"posts"
    "images":[imgPath,imgPath,imgPath,...]
}

pageData{
    "type":"profiles"
    categories:[category,category]
    profiles:[profileObj,profileObj,profileObj]
    
}

profileObj
    {
    profileName:____,
    profilePhoto:path,
    profilePosts:[imgPath,imgPath,imgPath]
    }

*/
