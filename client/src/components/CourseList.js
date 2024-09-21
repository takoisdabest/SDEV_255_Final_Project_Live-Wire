import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/courses')
      .then(response => response.json())
      .then(data => setCourses(data));
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      <Link to="/courses/new">Add New Course</Link>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            <Link to={`/courses/${course._id}`}>{course.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;