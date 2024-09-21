import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch(`/courses/${id}`)
      .then(response => response.json())
      .then(data => setCourse(data));
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <h1>{course.name}</h1>
      <p>{course.description}</p>
      <p>{course.subjectArea}</p>
      <p>{course.credits} credits</p>
    </div>
  );
}

export default CourseDetail;