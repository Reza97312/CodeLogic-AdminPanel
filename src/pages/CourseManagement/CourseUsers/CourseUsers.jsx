import React from "react";
import CourseUsersTable from "../../../components/Courses/CourseUsers/CourseUsersTable";

const CourseUsers = ({ students }) => {
  return (
    <div>
      <CourseUsersTable students={students} />
    </div>
  );
};

export default CourseUsers;
