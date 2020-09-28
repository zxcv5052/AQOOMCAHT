const User = require('./controllers/user.controller');
const Chat =  require('./controllers/chat.controller');
const UserChatPersonal =  require('./controllers/user_chat_personal');
const Message = require('./controllers/message.controller')
exports.chatAndUserCreate = async request =>{
    request["updatedAt"] = new Date();

    await Chat.updateOrCreate(request);

    await User.updateOrCreate(request);

    await UserChatPersonal.updateOrCreate(request);
}

exports.checkAndCreateUser = async request=>{
    request["updatedAt"] = new Date();

    await User.updateOrCreate(request);

    await UserChatPersonal.updateOrCreate(request);
}

exports.saveMessage = async request =>{
    await Message.create(request);
}