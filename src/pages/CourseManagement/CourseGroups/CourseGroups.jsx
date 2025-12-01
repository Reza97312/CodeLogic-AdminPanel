import React, { useState } from "react";
import GroupTable from "../../../components/Courses/Groups/GroupsTable";
import { Button } from "reactstrap";
import CreateGroupModal from "../../../components/Courses/Groups/CreateGroupModal";
import DeleteGroupModal from "../../../components/Courses/Groups/DeleteGroupModal/DeleteGroupModal";

const CourseGroups = ({ courseId, teacherId, teacherName }) => {
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const toggleCreateGroupModal = (value) => {
    setOpenCreateGroup(value);
  };
  const [EditGroupData, setEditGroupData] = useState(null);
  const handleEditModal = (row) => {
    setOpenCreateGroup(true);
    setEditGroupData(row);
  };
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const toggleDeleteModal = (val) => setOpenDeleteModal(val);
  const [groupId, setGroupId] = useState(null);
  const getGroupId = (id) => setGroupId(id);
  return (
    <div>
      <Button
        onClick={() => setOpenCreateGroup(true)}
        style={{ marginBottom: "10px" }}
        color="primary"
      >
        ساخت گروه
      </Button>
      <GroupTable
        teacherName={teacherName}
        courseId={courseId}
        teacherId={teacherId}
        handleEditModal={handleEditModal}
        toggleDeleteModal={toggleDeleteModal}
        getGroupId={getGroupId}
      />
      {openCreateGroup && (
        <CreateGroupModal
          toggleCreateGroupModal={toggleCreateGroupModal}
          isOpen={openCreateGroup}
          courseId={courseId}
          EditGroupData={EditGroupData}
        />
      )}
      {openDeleteModal && (
        <DeleteGroupModal
          toggleDeleteModal={toggleDeleteModal}
          isOpen={openDeleteModal}
          groupId={groupId}
        />
      )}
    </div>
  );
};

export default CourseGroups;
