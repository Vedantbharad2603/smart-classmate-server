// Require necessary modules
const express = require('express')
const cors = require('cors')

// Require route modules
const logindataRoutes = require('./src/routes/logindata.router');
const teacherdataRoutes = require('./src/routes/teacherdata.router');
// const addressRoutes = require('./src/routes/address.router');
const shiftRoutes = require('./src/routes/shiftdata.router');
const studentRoutes = require('./src/routes/studentdata.router');
const attendanceRoutes = require('./src/routes/attendance.router');
const bookuploadRoutes = require('./src/routes/bookupload.router');
const eventsRoutes = require('./src/routes/events.router');
const holidaysRoutes = require('./src/routes/holidays.router');
const homeworkRoutes = require('./src/routes/homework.router');

const coursesRoutes = require('./src/routes/courses.router');
const courselevelsRoutes = require('./src/routes/courselevels.router');
const courseenrollmentRoutes = require('./src/routes/courseenrollment.router');

// Create an Express application
const app = express()

// Set the port
const port = 3000

// Middleware to parse JSON bodies
app.use(express.json())

// Middleware for enabling CORS
app.use(cors())

// Define routes 
app.use("/login", logindataRoutes)
app.use("/teacher", teacherdataRoutes)
app.use("/shift", shiftRoutes)
app.use("/student", studentRoutes)
app.use("/attendance", attendanceRoutes)
app.use("/book", bookuploadRoutes)
app.use("/events", eventsRoutes)
app.use("/holidays", holidaysRoutes)
app.use("/homework", homeworkRoutes)
app.use("/courses", coursesRoutes)
app.use("/courselevels", courselevelsRoutes)
app.use("/courseenrollment", courseenrollmentRoutes)


// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
