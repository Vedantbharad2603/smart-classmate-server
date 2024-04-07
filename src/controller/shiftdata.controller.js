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
    .catch((error) => {
        if (error.message === "Shifts not found") {
            res.status(404).send({ message: "Shifts not found", data: null });
        } else {
            next(error);
        }
    });
};
exports.findOne = (req, res, next) => {
    shift_service
    .getById(req.query.id)
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch((error) => {
        if (error.message === "Shift not found") {
            res.status(404).send({ message: "Shift not found", data: null });
        } else {
            next(error);
        }
    });
};
exports.update = (req, res, next) => {
    shift_service
    .update(req.query.id, req.body)
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch((error) => {
        if (error.message === "Shift not found") {
            res.status(404).send({ message: "Shift not found", data: null });
        } else {
            next(error);
        }
    });
};

exports.del = (req, res, next) => {
    shift_service
    .del(req.query.id)
    .then((response) =>
        res.status(200).send({ message: "Success", data: response })
    )
    .catch((error) => {
        if (error.message === "Shift not found") {
            res.status(404).send({ message: "Shift not found", data: null });
        } else {
            next(error);
        }
    });
};
