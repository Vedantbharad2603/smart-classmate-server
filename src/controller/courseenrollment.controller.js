const courseenrollmentController_service = require("../services/courseenrollment.services");
exports.create = (req, res, next) => {
    courseenrollmentController_service
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
    courseenrollmentController_service
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
    courseenrollmentController_service
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
    courseenrollmentController_service
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
    courseenrollmentController_service
    .del(req.params.id)
    .then((response) =>
        res.status(200).send({ message: "Success", data: response })
    )
    .catch(next);
};
