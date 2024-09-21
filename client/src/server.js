const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('./models/Student');
const { auth, roleAuth } = require('./middleware/auth');

// Register
app.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new Teacher({ ...req.body, password: hashedPassword });
  await user.save();
  res.status(201).send(user);
});

// Login
app.post('/login', async (req, res) => {
  const user = await Teacher.findOne({ email: req.body.email }) || await Student.findOne({ email: req.body.email });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ id: user._id }, 'secret');
    res.send({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Protect routes
app.post('/courses', auth, roleAuth('teacher'), async (req, res) => {
  const course = new Course({ ...req.body, teacherId: req.user._id });
  await course.save();
  res.status(201).send(course);
});

// Student-specific routes
app.post('/students/:id/courses', auth, async (req, res) => {
  const student = await Student.findById(req.params.id);
  student.courses.push(req.body.courseId);
  await student.save();
  res.send(student);
});

app.delete('/students/:id/courses/:courseId', auth, async (req, res) => {
  const student = await Student.findById(req.params.id);
  student.courses.pull(req.params.courseId);
  await student.save();
  res.status(204).send();
});