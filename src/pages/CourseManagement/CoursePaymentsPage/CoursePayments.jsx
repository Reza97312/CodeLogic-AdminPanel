import React from "react";
import CoursePaymentsTable from "../../../components/Courses/CoursePayments/CoursePaymentsTable";

const CoursePayments = ({ payments }) => {
  return (
    <div>
      <CoursePaymentsTable payments={payments} />
    </div>
  );
};

export default CoursePayments;
