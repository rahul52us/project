const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const socketIo = require('socket.io')
const conn = require('./config/db')
const userRouter = require('./routing/UserRouting')
const blogRouter = require('./routing/BlogRouting')
const pdfRouter = require('./routing/PdfRouting')
const youtubeRouter = require('./routing/YoutubeRouting')
const QuizRouter = require('./routing/QuizRouting')
const CommentRouter = require('./routing/CommentRouting')
const ChatRouter = require('./routing/ChatRouting')
const MessageRoutes = require('./routing/MessageRoutes')
const ScholarFeesRoutes = require('./routing/StudentScholaFeesRouting')



//MONGO_URL=mongodb+srv://rahulkushwah:8MinNoypLVa9Eic5@cluster0.f1v9o.mongodb.net/coaching?retryWrites=true&w=majority

dotenv.config()
const app = express()
app.use("/images",express.static(path.join(__dirname,"public/images")))
app.use("/pdf",express.static(path.join(__dirname,"public/pdfs")))

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(cookieParser())


app.use(cors({
    origin:`${process.env.FRONTEND_ORIGIN}`,
    credentials:true
}))


app.use('/api/auth',userRouter)
app.use('/api/scholar/fees',ScholarFeesRoutes)
app.use('/api/blog',blogRouter)
app.use('/api/chat',ChatRouter)
app.use('/api/pdf',pdfRouter)
app.use('/api/youtube',youtubeRouter)
app.use('/api/quiz',QuizRouter)
app.use('/api/comment',CommentRouter)
app.use('/api/message',MessageRoutes)


if( process.env.NODE_ENV == "production"){
    app.use(express.static("myapp/build"));
    const path = require("path");
    app.get("/", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'myapp', 'build', 'index.html'));
    })   
}


// const sendEmailFunction = async () => {
//     const ss= await requestPasswordReset("computer2may2000@gmail.com")        
// }

//sendEmailFunction()

// const sendEmailFunction = async () => {
//     var ss = await requestPasswordReset("rahulkushwah.siliconithub@gmail.com")    
//     console.log(ss)
    
// }

//sendEmailFunction()

 
const PORT = process.env.PORT || 5000

const server  = app.listen(PORT,()=>{
console.log(`the server is running on port ${PORT}`)
})

const io = socketIo(server,{
    pingTimeOut:6000,
    cors : {
        origin : process.env.FRONTEND_ORIGIN,
        credentials:true
    }
})

io.on('connection',(socket)=> {
    socket.on('JOIN_USER',(data)=>{              
        socket.join(data._id)
        socket.broadcast.emit('TELL_NEW_USER_JOIN',({name : data.name , pic : data.pic }))        
    })    

    socket.on("JOIN_ROOM",(room)=>{        
        socket.join(room._id)
    })

    socket.on('send_newMessage',(newMessage)=>{              
        if(!newMessage.chat.users) return 
        newMessage.chat.users.forEach((user)=>{
                if(newMessage.sender._id === user._id) return
                socket.in(user._id).emit("send_message_recieved",newMessage)                            
        })
    })
})

