import React from "react";
import GroupTable from "../../../components/Courses/Groups/GroupsTable";

const CourseGroups = ({ courseId, teacherId }) => {
  return (
    <div>
      <GroupTable courseId={courseId} teacherId={teacherId} />
    </div>
  );
};

export default CourseGroups;
