import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from "pusher";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express()
const port = process.env.PORT || 9000


const pusher = new Pusher({
    appId: process.env.APPID,
    key: process.env.KEY,
    secret: process.env.SECRET,
    cluster: process.env.CLUSTER,
    useTLS: true
  });

console.log(process.env.MOGOURL); 
app.use(express.json())
app.use(cors());


const connect_url = process.env.MOGOURL;
mongoose.connect(connect_url,{
    useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open', function(){
    console.log('DB connected')

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", function(change){
        console.log(change);
        if (change.operationType ==="insert"){
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                UserId: messageDetails.UserId,
                MsgId: messageDetails.MsgId,
                _id: messageDetails._id,
            })
        }else if (change.operationType ==="delete"){
            pusher.trigger("messages", "deleted", 
                change.documentKey._id
            )
        }
        else{
            console.log('Error triggering Pusher')
        }
    })
})



app.get("/", function(req, res){
    res.status(200).send("hello world")
})

app.get("/messages/sync",function (req, res){
    Messages.find(function(err, data){
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

app.post("/messages/new", function(req, res){
    const dbMessage = req.body;
    Messages.create(dbMessage, function(err, data){
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.post("/messages/delete", function(req, res){
    const msgId = req.body;
    Messages.deleteOne(msgId, function(err, data){
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
    console.log("delete success")
})

app.listen(port, function(){
    console.log(`Listening om localhost:${port}`)
})