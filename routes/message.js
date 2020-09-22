const express = require('express');
const router = express.Router();
const Message = require('../controllers/message.controller')
const Bot_activity = require('../controllers/chat_bot_activity')

//region Swagger POST /messages/reply
/**
 * @swagger
 * /messages/reply:
 *   post:
 *     tags:
 *     - "Messages"
 *     parameters:
 *      - in: body
 *        name: message
 *        schema:
 *          type: object
 *          properties:
 *              chat_id:
 *                  type: integer
 *                  required: true
 *              message:
 *                  type: string
 *                  required: true
 *              reply_to_message_id:
 *                  type: integer
 *                  required: true
 *     description: Send Reply Message
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *       204:
 *         $ref: '#/components/res/NoContent'
 *       403:
 *         $ref: '#/components/res/Forbidden'
 *       404:
 *         $ref: '#/components/res/NotFound'
 *       500:
 *         $ref: '#/components/res/BadRequest'
 */
//endregion

router.post('/reply', (req,res)=>{
    const message_request = {
        chat_id: req.body.chat_id,
        message: req.body.message,
        reply_to_message_id : req.body.reply_to_message_id,
    };
    const bot_request = {
        action : 'reply',
        chat_id : req.body.chat_id
    };
    Message.sendReply(message_request)
        .then(()=>{
            Bot_activity.create(bot_request)
                .then(result=>{

                })
                .catch((err)=>{
                    console.log(err)
                })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).send(err);
        })

});

//region Swagger GET /messages/chat/:chat_id/user/:user_id/type/:message_type
/**
 * @swagger
 * /messages/chat/{chat_id}/user/{user_id}/type/{message_type}:
 *   get:
 *     tags:
 *     - "Messages"
 *     parameters:
 *       - name: chat_id
 *         in : path
 *         schema:
 *           type: integer
 *       - name: user_id
 *         in : path
 *         schema:
 *           type: integer
 *       - name: message_type
 *         in : path
 *         schema:
 *           type: string
 *     description: Get Messages from User ID & Chat ID & Message_Type
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *              $ref: '#/definitions/message'
 *       204:
 *         $ref: '#/components/res/NoContent'
 *       403:
 *         $ref: '#/components/res/Forbidden'
 *       404:
 *         $ref: '#/components/res/NotFound'
 *       500:
 *         $ref: '#/components/res/BadRequest'
 */
//endregion

router.get('/chat/:chat_id/user/:user_id/type/:message_type', (req, res)=>{
    const request = {
        user_id: req.params.user_id,
        chat_id: req.params.chat_id,
        message_type: req.params.message_type

    };

    Message.findByChatUser(request)
        .then(result=>{
            res.status(200).send(result)
        })
        .catch(err=>{
            res.status(500).send(err);
        })
});

router.get('/:messaged_id/chat/:message_id', (req,res) =>{
    const request = {

    }
})
router.delete('/')

module.exports = router;