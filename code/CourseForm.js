import React, { useState } from 'react';
import api from '../services/api';

const CourseForm = ({ course, onSave }) => {
    const [name, setName] = useState(course ? course.name : '');
    const [description, setDescription] = useState(course ? course.description : '');
    const [subjectArea, setSubjectArea] = useState(course ? course.subject_area : '');
    const [credits, setCredits] = useState(course ? course.credits : '');
    const [teacherId, setTeacherId] = useState(course ? course.teacherId : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, description, subject_area: subjectArea, credits, teacherId };
        if (course) {
            await api.put(`/courses/${course.id}`, data);
        } else {
            await api.post('/courses', data);
        }
        onSave();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Course Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div>
                <label>Subject Area:</label>
                <input type="text" value={subjectArea} onChange={(e) => setSubjectArea(e.target.value)} required />
            </div>
            <div>
                <label>Credits:</label>
                <input type="number" value={credits} onChange={(e) => setCredits(e.target.value)} required />
            </div>
            <div>
                <label>Teacher ID:</label>
                <input type="number" value={teacherId} onChange={(e) => setTeacherId(e.target.value)} required />
            </div>
            <button type="submit">Save</button>
        </form>
    );
}

export default CourseForm;
