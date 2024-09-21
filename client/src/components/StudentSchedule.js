import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentSchedule() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/students/me/courses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data);
    };
    fetchCourses();
  }, []);

  const handleDrop = async (courseId) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/students/me/courses/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCourses(courses.filter(course => course._id !== courseId));
  };

  return (
    <div>
      <h1>My Schedule</h1>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            {course.name}
            <button onClick={() => handleDrop(course._id)}>Drop</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
