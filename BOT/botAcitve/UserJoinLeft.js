const Common = require('./Common');
const Chat = require('../controllers/chat.controller')
exports.userJoinOrLeft = bot=> {
    bot.on('left_chat_member', async ctx=>{
        const member = ctx.message.left_chat_member;
        const chat_id = ctx.chat.id;
        const user_id = member.id;
        const request = {
            chat_id: chat_id,
            user_id: user_id,
            first_name: member.first_name,
            last_name: member.last_name,
            user_name: member.username,
            is_active: false
        }
        if(member.id === require('../config/botkey.json').test_botID){
            await Chat.updateOrCreate(request);
            request['status'] = 'kicked';
            request['is_bot'] = true;
        }else{
            const chatMember = await bot.telegram.getChatMember(chat_id, user_id);
            request['status'] =  chatMember.status;
        }

        // Check It is Moved Chat Room
        const chat = await Chat.findByChat(request);
        request["chat_id"] = chat.old_id !== null ? chat.old_id : chat_id;

        await Common.checkAndCreateUser(request)
    });

    bot.on('new_chat_members', async ctx=>{
        const members = ctx.message.new_chat_members;
        let chat_id = ctx.chat.id;
        if(members[0].id === require('../config/botkey.json').test_botID){
            const request = {
                chat_id: chat_id,
                is_active: true,
                user_id: ctx.from.id,
                type: ctx.chat.type,
                first_name: ctx.message.from.first_name,
                last_name: ctx.message.from.last_name,
                user_name: ctx.message.from.username,
                group_name: ctx.chat.title,
                is_bot: true,
                status: 'member'
            }
            await Chat.create(request)
        }
        // Check It is Moved Chat Room
        const findByChatRequest = {
            chat_id: chat_id
        }
        const chat = await Chat.findByChat(findByChatRequest);
        chat_id = chat.old_id !== null ? chat.old_id : chat_id;

        members.some(
            async member =>{
                const request = {
                    user_id : member.id,
                    chat_id : chat_id,
                    first_name: member.first_name,
                    last_name: member.last_name,
                    user_name: member.username,
                    is_bot: member.is_bot,
                    status: 'member'
                }
                await Common.checkAndCreateUser(request)
            }
        );
    });
}