const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/auth.controller')
const userController = require('../controllers/user.controller')
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
    userController.findByPk(request)
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




module.exports = router;
