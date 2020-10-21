'use strict'
const express = require('express');
const router = express.Router();
const User_chat_personal = require('../controllers/userChatPer.controller')

//region Swagger GET groups/{chat_id}/members 채팅 방에 존재 하는 유저들 가져 오기.
/**
 * @swagger
 * /groups/{chat_id}/members:
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
 *                  seq:
 *                      type: integer
 *                  restriction_date:
 *                      type: string
 *                  is_bot:
 *                      type: boolean
 *                  is_admin:
 *                      type: boolean
 *                  Users:
 *                      type: object
 *                      properties:
 *                          user_id:
 *                              type: integer
 *                          first_name:
 *                              type: string
 *                          last_name:
 *                              type: string
 *                          user_name:
 *                              type: string
 *                          warning_pt:
 *                              type: integer
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
router.get('/{chat_id}/members', (req,res)=>{
    const request = {
        chat_id : req.params.chat_id
    }
    User_chat_personal.findByChat(request)
        .then(result=>{
            res.status(200).send(result);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).send();
        })
});

