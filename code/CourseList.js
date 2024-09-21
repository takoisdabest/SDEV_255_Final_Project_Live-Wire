import React, { useState, useEffect } from 'react';
import api from '../services/api';
import CourseForm from '../components/CourseForm';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [editingCourse, setEditingCourse] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        const response = await api.get('/courses');
        setCourses(response.data.data);
    }

    const handleDelete = async (id) => {
        await api.delete(`/courses/${id}`);
        fetchCourses();
    }

    const handleSave = () => {
        setEditingCourse(null);
        fetchCourses();
    }

    return (
        <div>
            <h1>Courses</h1>
            <button onClick={() => setEditingCourse({})}>Add Course</button>
            {editingCourse && <CourseForm course={editingCourse} onSave={handleSave} />}
            <ul>
                {courses.map(course => (
                    <li key={course.id}>
                        {course.name} - {course.description} (Subject: {course.subject_area}, Credits: {course.credits}, Teacher ID: {course.teacherId})
                        <button onClick={() => setEditingCourse(course)}>Edit</button>
                        <button onClick={() => handleDelete(course.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CourseList;
