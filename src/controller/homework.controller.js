const homework_service = require("../services/homework.services");
exports.create = (req, res, next) => {
    homework_service
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
    homework_service
    .getAll()
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};

exports.giveStudentAllhomework = (req, res, next) => {
    homework_service
    .getStudnetHomeworks(req.body.studid)
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};

exports.checkwork = (req, res, next) => {
    homework_service
    .listforcheckWork()
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
}
exports.findOne = (req, res, next) => {
    homework_service
    .getStudnetHomework(req.params.id)
    .then((response) => {
        if (!response) {
            return res.status(404).send({
                message: "Homework record not found",
                data: null,
            });
        }

        res.status(200).send({
            message: "Success",
            data: response,
        });
    })
    .catch(next);
};



exports.update = (req, res, next) => {
    homework_service
    .update(req.body)
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};
exports.del = (req, res, next) => {
    homework_service
    .del(req.params.id)
    .then((response) =>
        res.status(200).send({ message: "Success", data: response })
    )
    .catch(next);
};
