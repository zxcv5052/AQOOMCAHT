const express = require('express');
const router = express.Router();

//region Swagger analytic/{chat_id}/analytic
/**
 * @swagger
 * /analytic/{chat_id}/analytic:
 *   get:
 *     tags:
 *     - "Analytic"
 *     parameters:
 *       - name: chat_id
 *         in : path
 *         schema:
 *           type: integer
 *     description: Get Analytic Default
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
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
router.get('/', (request, response) => {

});

module.exports = router;
