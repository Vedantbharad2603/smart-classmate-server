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
const courseconceptsRoutes = require('./src/routes/courseconcepts.router');
const courseenrollmentRoutes = require('./src/routes/courseenrollment.router');
const emailRoutes = require('./src/routes/email.router');

// Create an Express application
const app = express()

// Set the port
const port = 3002

// Middleware to parse JSON bodies
app.use(express.json())

// Middleware for enabling CORS
app.use(cors())

// Define routes 
app.use("/api/login", logindataRoutes)
app.use("/api/teacher", teacherdataRoutes)
app.use("/api/shift", shiftRoutes)
app.use("/api/student", studentRoutes)
app.use("/api/attendance", attendanceRoutes)
app.use("/api/book", bookuploadRoutes)
app.use("/api/events", eventsRoutes)
app.use("/api/holidays", holidaysRoutes)
app.use("/api/homework", homeworkRoutes)
app.use("/api/courses", coursesRoutes)
app.use("/api/courselevels", courselevelsRoutes)
app.use("/api/courseenrollment", courseenrollmentRoutes)
app.use("/api/courseconcepts", courseconceptsRoutes)
app.use('/api/mail', emailRoutes);


// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))


// Start the server and listen on the specified port
app.listen(port, () => console.log(`Loreto server listening on port ${port}!`))
