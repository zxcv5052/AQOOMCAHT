const db = require("../models");
const Urls = db.whitelist_urls;

exports.create = (request, response) => {
    if (!request.body.url_pattern) {
        response.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const urls = {
        url_pattern: request.body.url_pattern,
        chat_id: request.body.chat_id,
    };
    Urls.create(urls)
        .then(num=>{
            response.status(200).send(true)
        })
        .catch( err => {
            response.status(500).send({
                message: "Cannot Create Url. Maybe Url was already exist Or Url was not valid"
            });
        });
};

exports.findByChatId = (request, response) => {
    const chat_id = request.params.chat_id;
    const condition = chat_id ? { chat_id: chat_id } : null;

    Urls.findAll({where: condition})
        .then(data => {
            response.send(data);
        })
        .catch(err=> {
            response.status(500).send(false)
        });
}

exports.delete = (request, response) => {
    const id = request.params.id;

    Urls.destroy({where: {id: id}})
        .then(num =>{
            if (num === 1) {
                response.status(200).send({
                    message: "Url was deleted successfully!"
                });
            } else {
                response.send({
                    message: `Cannot delete Url. Maybe Url was not found!`
                });
            }
        })
        .catch(err => {
            response.status(500).send({
                message: "Could not Delete"
            });
        });
};
