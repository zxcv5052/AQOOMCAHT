const express = require('express');
const router = express.Router();

const Members = require('../controllers/user.controller')
const User_chat_personal = require('../controllers/userChatPer.controller')
//region Swagger GET /users/{user_id} 유저에 대한 정보 가져 오기
/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     tags:
 *     - "Users"
 *     parameters:
 *       - name: user_id
 *         in : path
 *         schema:
 *           type: integer
 *     description: Get Members from Members ID
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *          $ref: '#/definitions/user'
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
    Members.findByPk(request)
        .then(result=>{
            if(result===undefined) res.status(204).send()
            else res.status(200).send(result)
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).send(err);
        });
});
//region Swagger GET users/rooms/{chat_id} 채팅방에 존재하는 유저들 가져오기.
/**
 * @swagger
 * /users/rooms/{chat_id}:
 *   get:
 *     tags:
 *     - "Users"
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
 *                  Members:
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
router.get('/rooms/:chat_id', (req,res)=>{
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
})

//region Swagger DELETE users/rooms/ 채팅방에 있는 특정 인물 밴
/**
 * @swagger
 * /users/rooms/:
 *   delete:
 *     tags:
 *     - "Users"
 *     parameters:
 *
 *     description: Delete Members ( user_chat_personal )
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

router.delete('/', (req,res) =>{

});



module.exports = router;
