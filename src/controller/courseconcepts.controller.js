const courseconcepts_service = require("../services/courseconcepts.services");
exports.create = (req, res, next) => {
    if (req.body.courseLevelId !== undefined) {
        courseconcepts_service
        .create(req.body)
        .then((response) =>
            res.status(200).send({
                message: typeof response === "string" ? "Error" : "Success",
                data: response,
            })
        )
        .catch(next);
    } else {
        courseconcepts_service
        .create2(req.body)
        .then((response) =>
            res.status(200).send({
                message: typeof response === "string" ? "Error" : "Success",
                data: response,
            })
        )
        .catch(next);
    }
};

exports.findAll = (req, res, next) => {
    courseconcepts_service
    .getAll()
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};

exports.getconcepts = (req, res, next) => {
    if (req.body.courseLevelId !== undefined) {
        courseconcepts_service
        .getlevels(req.body.course_id, req.body.course_level_id)
        .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
        ).catch(next);
    } else {
        courseconcepts_service
        .getlevels(req.body.course_id, null)
        .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
        ).catch(next);
    }
};
exports.findOne = (req, res, next) => {
    courseconcepts_service
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
    courseconcepts_service
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
    courseconcepts_service
    .del(req.params.id)
    .then((response) =>
        res.status(200).send({ message: "Success", data: response })
    )
    .catch(next);
};
