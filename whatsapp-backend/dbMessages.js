import mongoose from 'mongoose'

const whatsappSchema = mongoose.Schema({
    createdAt: { type: Date, expires: '50m', default: Date.now },
    message:String,
    name:String,
    timestamp: String,
    UserId: String,
    MsgId: String,
    _id: String,
})

export default mongoose.model('messageContent', whatsappSchema)