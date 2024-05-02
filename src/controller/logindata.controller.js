const login_service = require("../services/login.services");
exports.create = (req, res, next) => {
    login_service
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
    login_service
    .getAll()
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};

exports.studCount = (req, res, next) => {
    login_service
    .studentcount()
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};

exports.findteacher = (req, res, next) => {
    login_service
    .getTeacher()
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};

exports.findOne = (req, res, next) => {
    login_service
    .getByEmail(req.body.email)
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};
exports.findOnebyusername = (req, res, next) => {
    login_service
    .getByUname(req.body.username)
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};

exports.getStudinfo = (req, res, next) => {
    login_service
    .givestudentDetail(req.body.id)
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};
exports.getStudinfo2 = (req, res, next) => {
    login_service
    .givestudentDetail2(req.body.id)
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};
exports.check = (req, res, next) => {
    login_service
    .checklogin(req.body)
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};
exports.updatelogin = (req, res, next) => {
    login_service
    .update(req.params.id, req.body)
    .then((response) =>
        res.status(200).send({
            message: typeof response === "string" ? "Error" : "Success",
            data: response,
        })
    )
    .catch(next);
};

exports.changeUserStatus = (req, res, next) => {
    login_service
    .changeStatus(req.body.id)
    .then((response) =>
        res.status(200).send({ message: "Success", data: response })
    ).catch(next);
};
exports.changeType = (req, res, next) => {
    login_service
    .changeType(req.body.id,req.body.type)
    .then((response) =>
        res.status(200).send({ message: "Success", data: response })
    ).catch(next);
};
exports.del = (req, res, next) => {
    login_service
    .del(req.params.id)
    .then((response) =>
        res.status(200).send({ message: "Success", data: response })
    )
    .catch(next);
};
