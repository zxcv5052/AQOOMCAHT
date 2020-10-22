const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/auth.controller')

//region Swagger DELETE auth/logout
/**
 * @swagger
 * /auth/logout :
 *   delete:
 *     tags:
 *     - "Auth"
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
    try{
        res.clearCookie("SID");
        res.clearCookie("PID");
        res.redirect(200, '/');
    }catch (e) {
        console.log(e);
    }
});

//region Swagger POST auth/login
/**
 * @swagger
 * /auth/login :
 *   post:
 *     tags:
 *     - "Auth"
 *     parameters:
 *      - in: body
 *        name: user
 *        schema:
 *          type: object
 *          properties:
 *              id:
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
// 나중에 보안 이슈 생각을 더 해봐야 할 듯?
router.post('/login', (req,res) =>{
    const request = {
        user_id: req.body.id,
        user_name: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        photo_url: req.body.photo_url,
        secret : req.app.get('jwt-secret')
    };
    authController.login(request)
        .then((result)=>{
            res.cookie('SID', result, {
                httpOnly: true
            });
            res.cookie('PID', request.user_id, { httpOnly: true})
            res.send("ok");
        })
        .catch(err=>{
            console.log(err);
            res.send("false");
        })
});

module.exports = router;
