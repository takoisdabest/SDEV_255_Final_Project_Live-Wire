import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function CourseForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [subjectArea, setSubjectArea] = useState('');
  const [credits, setCredits] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, subjectArea, credits }),
    }).then(() => history.push('/courses'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add New Course</h1>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Subject Area:
        <input type="text" value={subjectArea} onChange={(e) => setSubjectArea(e.target.value)} required />
      </label>
      <label>
        Credits:
        <input type="number" value={credits} onChange={(e) => setCredits(e.target.value)} required />
      </label>
      <button type="submit">Add Course</button>
    </form>
  );
}

export default CourseForm;