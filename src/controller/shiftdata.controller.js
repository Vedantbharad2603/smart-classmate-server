const shift_service = require("../services/shiftdata.services");
exports.create = (req, res, next) => {
    shift_service
    .create(req.body)
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};

exports.findAll = (req, res, next) => {
    shift_service
    .getAll()
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};
exports.findOne = (req, res, next) => {
    shift_service
    .getById(req.body.id)
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};
exports.update = (req, res, next) => {
    shift_service
    .update(req.params.id, req.body)
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};

exports.del = (req, res, next) => {
    shift_service
    .del(req.params.id)
    .then((response) =>
        res.status(200).send({ message: "Success", data: response })
    )
    .catch(next);
};