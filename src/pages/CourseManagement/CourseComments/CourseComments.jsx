import React from "react";
import CourseCommentsTable from "../../../components/Courses/Comments/CourseCommentsTable";

const CourseComments = ({ id }) => {
  return (
    <div>
      <CourseCommentsTable id={id} />
    </div>
  );
};

export default CourseComments;
