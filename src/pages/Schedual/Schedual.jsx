import React from "react";
import TeacherSchedual from "./TeacherSchedual";
import AdminSchedual from "./AdminSchedual";
import StudentSchedual from "./StudentSchedual";

const Schedual = () => {
  return (
    <>
      <TeacherSchedual />
      <AdminSchedual />
      <StudentSchedual />
    </>
  );
};

export default Schedual;
