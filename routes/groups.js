'use strict'
const express = require('express');
const router = express.Router();
const chatPerController = require('../controllers/userChatPer.controller')
const chatController = require('../controllers/chat.controller')

//region Swagger GET /groups
/**
 * @swagger
 * /groups/ :
 *   get:
 *     tags:
 *     - "Groups"
 *     description: Get Chat Group from User ID
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
router.get('/', (req,res)=>{
    const request = {
        user_id: req.cookies.PID
    };
    chatController.findByUser(request)
        .then(result=>{
            res.status(200).send(result)
        })
        .catch(()=>{
            res.status(500).send();
        });
});

//region Swagger GET groups/{chat_id}/members 채팅 방에 존재 하는 유저들 가져 오기.
/**
 * @swagger
 * /groups/{chat_id}/members :
 *   get:
 *     tags:
 *     - "Groups"
 *     parameters:
 *       - name: chat_id
 *         in : path
 *         schema:
 *           type: integer
 *     description: Get Users <JOIN> from Chat ID
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *          type: array
 *          items:
 *              properties:
 *                  user_id:
 *                      type: integer
 *                  restriction_date:
 *                      type: string
 *                  status:
 *                      type: string
 *                  first_name:
 *                      type: string
 *                  last_name:
 *                      type: string
 *                  user_name:
 *                      type: string
 *                  is_bot:
 *                      type: boolean
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
router.get('/:chat_id/members', (req,res)=>{
    const request = {
        chat_id : req.params.chat_id
    }
    chatPerController.findByChat(request)
        .then(result=>{
            res.status(200).send(result);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).send();
        })
});

module.exports = router;

