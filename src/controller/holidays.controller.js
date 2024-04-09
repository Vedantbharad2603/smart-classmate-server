const holidays_service = require("../services/holidays.services");
exports.create = (req, res, next) => {
    holidays_service
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
    holidays_service
    .getAll()
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};

exports.changeStatus = (req, res, next) => {
    holidays_service
    .changeStatus(req.params.id)
    .then((response) =>
        res.status(200).send({ message: "Success", data: response })
    ).catch(next);
};

exports.findOne = (req, res, next) => {
    holidays_service
    .getById(req.params.id)
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};

exports.update = (req, res, next) => {
    holidays_service
    .update(req.body.id, req.body)
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};
exports.del = (req, res, next) => {
    holidays_service
    .del(req.params.id)
    .then((response) =>
        res.status(200).send({ message: "Success", data: response })
    )
    .catch(next);
};
