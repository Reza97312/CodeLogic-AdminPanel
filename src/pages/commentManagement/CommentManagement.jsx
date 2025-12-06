import React, { Fragment, useState } from "react";
import CommentsTable from "../../components/Comments/CommentsTable";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { useQuery } from "@tanstack/react-query";
import { GetAllTeachers } from "../../core/services/api/get/Teachers/GetAllTeachers";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Label,
  Row,
} from "reactstrap";
import GetAllUser from "../../core/services/api/get/GetAllUser";

const CommentManagement = () => {
  const { data: Users = {} } = useQuery({
    queryKey: ["ALLUSERS"],
    queryFn: () =>
      GetAllUser({
        RowsOfPage: 1000,
      }),
  });
  const userData = Users?.listUser || [];
  const usersOptions = [
    { value: null, label: "همه" },
    ...userData?.map((items) => ({
      value: parseInt(items?.id),
      label: items.fName + " " + items.lName || "",
    })),
  ];
  const [userId, setUserId] = useState(null);
  const [Accept, setAccept] = useState(null);
  const acceptOption = [
    { value: null, label: "همه" },
    { value: true, label: "تایید شده" },
    { value: false, label: "تایید نشده" },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلترها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="plan-select">نام کاربر</Label>
              <Select
                theme={selectThemeColors}
                isClearable
                className="react-select"
                classNamePrefix="select"
                placeholder="لطفا انتخاب کنید"
                options={usersOptions}
                value={usersOptions.find((o) => o.value === userId) || null}
                onChange={(opt) => setUserId(opt ? opt.value : null)}
              />
            </Col>

            <Col md="4">
              <Label for="status-select">وضعیت تایید</Label>
              <Select
                theme={selectThemeColors}
                isClearable
                className="react-select"
                classNamePrefix="select"
                placeholder="لطفا انتخاب کنید"
                options={acceptOption}
                value={acceptOption.find((o) => o.value === Accept) || null}
                onChange={(opt) => setAccept(opt?.value ?? null)}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <div>
        <CommentsTable userId={userId} Accept={Accept} />
      </div>
    </>
  );
};

export default CommentManagement;
