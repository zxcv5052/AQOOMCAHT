'use strict'

const express = require('express');
const router = express.Router();
const functionController = require('../controllers/chatFuntion');
const { uploadFunction } = require('../public/functions');

const multer = require('multer');
const upload = multer();

//region Swagger GET function/{chat_id}
/**
 * @swagger
 * /function/{chat_id}:
 *   get:
 *     tags:
 *     - "Function"
 *     parameters:
 *       - name: chat_id
 *         in : path
 *         schema:
 *           type: integer
 *     description: Get Function Info from Chatting ID
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *              $ref: '#/definitions/chat_function'
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
router.get('/:chat_id', (req, res) =>{
    const request = {
        chat_id : req.params.chat_id
    };
    functionController.findByChat(request)
        .then( result => {
            if(result === undefined) res.status(204).seq("false");
            else res.status(200).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
})
//region Swagger POST {chat_id}/function/
/**
 * @swagger
 * /{chat_id}:
 *   post:
 *     tags:
 *     - "Function"
 *     consumes:
 *          - multipart/form-data
 *     parameters:
 *      - in: formData
 *        name: request_content_text
 *        type: string
 *      - in: formData
 *        name: response_content_text
 *        type: string
 *      - in: formData
 *        name: response_content_image
 *        type: file
 *      - in: formData
 *        name: response_image_type
 *        type: string
 *      - in: formData
 *        name: button
 *        type: string
 *      - in: path
 *        name: chat_id
 *        type: integer
 *     description: Create Function
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
router.post('/:chat_id',upload.single('response_content_image'), async (req,res)=>{
    const request = {
        request_content_text: req.body.request_content_text,
        response_content_text : req.body.response_content_text,
        response_image_type: req.body.response_image_type,
        button: req.body.button,
        chat_id: req.params.chat_id
    }
    request["request_content_text"] = '!'+request.request_content_text;
    uploadFunction(req.file)
        .then(result=>{
            if(result!==undefined) {
                request['response_content_image'] = result;
            }
            functionController.create(request)
                .then(()=>{
                    res.status(200).send("ok")
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).send(err);
                })
        }).catch(()=>{

    });
});

//region Swagger PUT function/{id}
/**
 * @swagger
 * /function/{id}:
 *   put:
 *     tags:
 *     - "Function"
 *     consumes:
 *      - multipart/form-data
 *     parameters:
 *      - in: path
 *        name: faq_seq
 *        type: integer
 *      - in: formData
 *        name: request_content_text
 *        type: string
 *      - in: formData
 *        name: response_content_text
 *        type: string
 *      - in: formData
 *        name: response_content_image
 *        type: file
 *      - in: formData
 *        name: response_image_type
 *        type: string
 *      - in: formData
 *        name: button
 *        type: string
 *      - in: formData
 *        name: is_active
 *        type: boolean
 *     description: Update Function
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
router.put('/:faq_seq', (req,res)=>{
    const request = {
        faq_seq: req.params.faq_seq,
        request_content_text: req.body.request_content_text,
        response_content_text : req.body.response_content_text,
        response_image_type: req.body.response_image_type,
        button: req.body.button,
        is_active: req.body.is_active
    };
    uploadFunction(req.file)
        .then(result=>{
            if(result!==undefined) {
                request['response_content_image'] = result;
            }
            functionController.update(request)
                .then(()=>{
                    if(result === undefined) res.status(204).send();
                    else res.status(200).send("ok")
                })
                .catch(err=>{
                    res.status(500).send(err);
                    console.log(err);
                })
        }).catch((err)=>{
        console.log(err);
    });
});


//region Swagger DELETE function/{faq_seq}
/**
 * @swagger
 * /function/{faq_seq}:
 *  delete:
 *     tags:
 *     - "Function"
 *     parameters:
 *       - name: faq_seq
 *         in : path
 *         type: integer
 *     description: Delete Function
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
router.delete('/:faq_seq', (req,res)=>{
    const request = {
        faq_seq : req.body.faq_seq
    };
    functionController.delete(request)
        .then(result=>{
            if(result === undefined) res.status(204).send();
            else res.status(200).send("ok");
        })
        .catch(()=>{
            res.status(500).send("false")
        })
});

module.exports = router;