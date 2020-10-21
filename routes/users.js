const express = require('express');
const router = express.Router();

const Users = require('../controllers/user.controller')
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
 *     description: Get Users from Users ID
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
    Users.findByPk(request)
        .then(result=>{
            if(result===undefined) res.status(204).send()
            else res.status(200).send(result)
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).send(err);
        });
});
//region Swagger DELETE users/logout
/**
 * @swagger
 * /users/logout :
 *   delete:
 *     tags:
 *     - "Users"
 *     parameters:
 *
 *     description: Logout Users
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

router.delete('/logout', (req,res) =>{

});

//region Swagger POST users/login
/**
 * @swagger
 * /users/login :
 *   post:
 *     tags:
 *     - "Users"
 *     parameters:
 *      - in: body
 *        name: user
 *        schema:
 *          type: object
 *          properties:
 *              user_id:
 *                  type: integer
 *                  required: true
 *              username:
 *                  type: string
 *              first_name:
 *                  type: string
 *              last_name:
 *                  type: string
 *              photo_url:
 *                  type: string
 *
 *     description: Login Users
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
router.post('/login', (req,res) =>{
    const request = {
        user_id: req.body.id,
        user_name: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        photo_url: req.body.photo_url
    }
});



module.exports = router;
