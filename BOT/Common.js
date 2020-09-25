const User = require('./controllers/user.controller');
const Chat =  require('./controllers/chat.controller');
const UserChatPersonal =  require('./controllers/user_chat_personal');
const Message = require('./controllers/message.controller')
exports.chatCreate = async request =>{
    await Chat.updateOrCreate(request);

    await User.updateOrCreate(request);

    await UserChatPersonal.updateOrCreate(request);
}

exports.checkAndCreateUser = async request=>{
    await User.updateOrCreate(request);

    await UserChatPersonal.updateOrCreate(request);
}

exports.saveMessage = async request =>{
    await Message.create(request);
}