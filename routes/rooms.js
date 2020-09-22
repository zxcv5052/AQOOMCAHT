const express = require('express');
const router = express.Router();

const Chat = require('../controllers/chat.controller')


//region Swagger GET /rooms/{user_id}
/**
 * @swagger
 * /rooms/{user_id}:
 *   get:
 *     tags:
 *     - "Chats"
 *     parameters:
 *       - name: user_id
 *         in : path
 *         schema:
 *           type: integer
 *     description: Get Chat Rooms from User ID
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *              properties:
 *                   chat_id:
 *                      type: integer
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
router.get('/:user_id', (req,res)=>{
    const request = {
        user_id: req.params.user_id
    };
    Chat.findByUser(request)
        .then(result=>{
            res.status(200).send(result)
        })
        .catch(()=>{
            res.status(500).send();
        });
});

//region Swagger GET /rooms/info/{chat_id}
/**
 * @swagger
 * /rooms/info/{chat_id}:
 *   get:
 *     tags:
 *     - "Chats"
 *     parameters:
 *       - name: chat_id
 *         in : path
 *         schema:
 *           type: integer
 *     description: Get Chat info from Chatting ID
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/chat'
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
router.get('/info/:chat_id', (req,res)=>{
    const request = {
        chat_id: req.params.chat_id
    };
    Chat.findByChat(request)
        .then(result=>{
            res.status(200).send(result)
        })
        .catch(()=>{
            res.status(500).send();
        });
});

//region Swagger PUT /rooms/restrict/func/
/**
 * @swagger
 * /rooms/restrict/func/:
 *   put:
 *     tags:
 *     - "Chats"
 *     parameters:
 *       - in: body
 *         name: anti_values
 *         schema:
 *              type: object
 *              properties:
 *                  chat_id:
 *                      type: integer
 *                      required: true
 *                  anti_image:
 *                      type: boolean
 *                  anti_url:
 *                      type: boolean
 *                  anti_forward:
 *                      type: boolean
 *                  anti_join_message:
 *                      type: boolean
 *                  anti_left_message:
 *                      type: boolean
 *                  anti_longname:
 *                      type: boolean
 *                  anti_flood:
 *                      type: boolean
 *                  anti_command:
 *                      type: boolean
 *     description: Update Chat Room's Restrictions (EX _ anti_~~)
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
router.put('/restrict/func', (req,res) =>{
    const request = {
        chat_id: req.body.chat_id,
        anti_image: req.body.anti_image,
        anti_url: req.body.anti_url,
        anti_forward: req.body.anti_forward,
        anti_join_message: req.body.anti_join_message,
        anti_left_message: req.body.anti_left_message,
        anti_longname: req.body.anti_longname,
        anti_flood: req.body.anti_flood,
        anti_command: req.body.anti_command
    };
    Chat.updateForRestriction(request)
        .then(result=>{
            if(result===undefined) res.status(204).send();
            else res.status(200).send();
        })
        .catch(()=>{
            res.status(500).send();
        });
});

//region Swagger PUT /rooms/restrict/limit/
/**
 * @swagger
 * /rooms/restrict/limit/:
 *   put:
 *     tags:
 *     - "Chats"
 *     parameters:
 *       - in: body
 *         name: limit_values
 *         schema:
 *              type: object
 *              properties:
 *                  chat_id:
 *                      type: integer
 *                      required: true
 *                  restrict_type:
 *                      type: string
 *                  restrict_limit:
 *                      type: integer
 *                  restrict_time:
 *                      type: integer
 *     description: Update Chat Room's Restrictions (EX _ Time, Limit ...)
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
router.put('/restrict/limit', (req,res)=>{
    const request = {
        chat_id: req.body.chat_id,
        restrict_type: req.body.restrict_type,
        restrict_limit: req.body.restrict_limit,
        restrict_time: req.body.restrict_time,
    }
    Chat.updateForRestrictionLimit(request)
        .then(result=>{
            if(result===undefined) res.status(204).send();
            else res.status(200).send()
        })
        .catch(()=>{
            res.status(500).send();
        })
});



module.exports = router;