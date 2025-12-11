import { useParams } from "react-router-dom";
import { Fragment } from "react";
import { Row, Col, Spinner } from "reactstrap";
import BreadCrumbs from "@components/breadcrumbs";
import WizardModern from "./WizardModern";
import { useQuery } from "@tanstack/react-query";
import GetUserDetails from "../../core/services/api/get/GetUserDetails";
import GetAllUser from "../../core/services/api/get/GetAllUser";

const EditUser = () => {
  const { id } = useParams();

  const userId = parseInt(id);

  const { data: user, isLoading } = useQuery({
    queryKey: ["GetUserDetails", userId],
    queryFn: () => GetUserDetails(userId),
    enabled: !!id && !isNaN(userId),
  });

  const { data: allUsersData } = useQuery({
    queryKey: ["GetAllUsers"],
    queryFn: () => GetAllUser(),
    staleTime: Infinity,
  });
  let allRolesOptions = [];
  if (allUsersData && allUsersData.roles && allUsersData.roles.length > 0) {
    allRolesOptions = allUsersData.roles.map((role) => ({
      value: role.id,
      label: role.name,
    }));
  }

  if (isLoading) {
    return (
      <div className="text-center d-flex align-items-center justify-content-center py-5 mt-4 gap-1">
        <p className="mt-2">در حال بارگذاری اطلاعات کاربر...</p>
        <Spinner color="primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-5">
        <p>کاربر یافت نشد</p>
      </div>
    );
  }

  return (
    <Fragment>
      <BreadCrumbs
        title={`ویرایش کاربر: ${user.fName} ${user.lName}`}
        data={[{ title: "فرم" }]}
      />
      <Row>
        <Col sm="12">
          <WizardModern initialData={user} allRoles={allRolesOptions} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default EditUser;
