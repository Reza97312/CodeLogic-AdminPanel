import { useState, Fragment } from "react";
import { selectThemeColors } from "@utils";
import {
  Card,
  CardBody,
  Button,
  Badge,
  Modal,
  ModalBody,
  Label,
  Input,
  ModalFooter,
} from "reactstrap";
import Swal from "sweetalert2";
import { Check, Briefcase, Archive, Package } from "react-feather";
import { useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import Avatar from "@components/avatar";
import "@styles/react/libs/react-select/_react-select.scss";
import { Link } from "react-router-dom";
import AddRoleUser from "../../../core/services/api/post/AddRoleUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
import toast from "react-hot-toast";

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ initialData, users, rolesList = [] }) => {
  const allRolesOptions = (() => {
    const rolesU = users.flatMap((u) => {
      if (u.roles) return u.roles.map((r) => String(r).trim());
      if (u.userRoles) return u.userRoles.split(",").map((r) => r.trim());
      return [];
    });

    const unique = Array.from(new Set(rolesU.filter((x) => x && x !== "")));

    return unique.map((role) => ({
      value: role.toLowerCase(),
      label: role,
    }));
  })();

  if (!initialData) return null;

  const {
    fName,
    lName,
    userName,
    gmail,
    phoneNumber,
    nationalCode,
    birthDay,
    gender,
    currentPictureAddress,
    homeAdderess,
    twoStepAuth,
    userAbout,
    roles,
  } = initialData;

  const fullName = `${fName} ${lName}`;

  const Mycourse = initialData?.courseStudent?.length;

  const MycourseReserve = initialData?.courseReserve?.length;

  const queryClient = useQueryClient();

  const addRoleMutation = useMutation({
    mutationFn: async ({ roleId, userId }) => {
      return AddRoleUser({ roleId, userId });
    },
    onSuccess: () => {
      toast.success("نقش کاربر با موفقیت اضافه شد");

      queryClient.invalidateQueries({
        queryKey: ["GetUserDetails", initialData.id],
      });
    },
    onError: () => {
      toast.error("خطا در برقراری ارتباط با سرور");
    },
  });

  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const handleOpenModal = (row) => {
    setSelectedUser(row);

    const userRolesArr = row.roles
      ? row.roles.map((r) => String(r.roleName).trim())
      : [];

    const selected = userRolesArr.map((r) => ({
      value: r.toLowerCase(),
      label: r,
    }));

    setSelectedRoles(selected);
    setIsActive(false);
    setOpenModal(true);
  };

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: userName,
      lastName: lName,
      firstName: fName,
    },
  });

  const renderUserImg = () => {
    return (
      <>
        <img
          style={{
            boxShadow: "0 0 7px 2px rgba(13, 110, 253, 0.5)",
          }}
          height="150"
          width="150"
          alt="user-avatar"
          src={currentPictureAddress}
          className="img-fluid rounded mt-3 mb-2"
        />
      </>
    );
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>{fullName}</h4>
                  <div className="d-flex gap-1 flex-wrap mt-1">
                    {roles.map((r, index) => (
                      <Badge
                        key={index}
                        color="light-primary"
                        className="text-capitalize"
                      >
                        {r.roleName}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Package className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{Mycourse}</h4>
                <small> دوره های من </small>
              </div>
            </div>

            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Archive className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{MycourseReserve}</h4>
                <small>دوره های رزرو شده</small>
              </div>
            </div>
          </div>

          <div className="user-details-section">
            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3 mt-5">
              <h4 className="fw-bolder m-0 text-primary">جزئیات حساب کاربری</h4>
            </div>

            <div className="info-container">
              <div className="row">
                <div className="col-12 col-md-8 mb-2">
                  <small className="text-muted fw-bold">نام کاربری</small>
                  <h6 className="mb-0 mt-1">{userName}</h6>
                </div>

                <div className="col-12 col-md-4 mb-2">
                  <small className="text-muted fw-bold">کد ملی</small>
                  <h6 className="mb-0 mt-1">{nationalCode}</h6>
                </div>

                <div className="col-12">
                  <hr className="my-2 text-muted-50" />
                </div>

                <div className="col-12 col-md-8 mb-2">
                  <small className="text-muted fw-bold">ایمیل</small>
                  <h6 className="mb-0 mt-1">{gmail}</h6>
                </div>

                <div className="col-12 col-md-4 mb-2">
                  <small className="text-muted fw-bold">تلفن همراه</small>
                  <h6 className="mb-0 mt-1 dir-ltr text-end text-md-start">
                    {phoneNumber}
                  </h6>
                </div>

                <div className="col-12">
                  <hr className="my-2 text-muted-50" />
                </div>

                <div className="col-12 col-md-8 mb-2">
                  <small className="text-muted fw-bold">جنسیت</small>
                  <h6 className="mb-0 mt-1">{gender ? "مرد" : "زن"}</h6>
                </div>

                <div className="col-12 col-md-4 mb-2">
                  <small className="text-muted fw-bold">تاریخ تولد</small>
                  <h6 className="mb-0 mt-1">
                    {birthDay &&
                      new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(birthDay))}
                  </h6>
                </div>

                <div className="col-12 col-md-12 mt-1  text-center ">
                  <small className="text-muted fw-bold d-block mb-1">
                    تایید دو مرحله ای
                  </small>

                  <h6
                    className={`
                      d-inline-block 
                      p-1 rounded
                      ${
                        twoStepAuth
                          ? "bg-light-success text-success"
                          : "bg-light-danger text-danger"
                      }
                    `}
                  >
                    {twoStepAuth ? "فعال" : "غیرفعال"}
                  </h6>
                </div>

                <div className="col-12 mt-2">
                  <div
                    style={{ border: "1px solid #ccc" }}
                    className=" p-2 rounded "
                  >
                    <small className="text-muted fw-bold d-block mb-1">
                      آدرس سکونت
                    </small>
                    <span className="fs-6">{homeAdderess}</span>
                  </div>
                </div>

                <div className="col-12 mt-2">
                  <div
                    style={{ border: "1px solid #ccc" }}
                    className=" p-2 rounded "
                  >
                    <small className="text-muted fw-bold d-block mb-1">
                      درباره من
                    </small>
                    <span className=" fs-6 text-justify">{userAbout}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-evenly align-items-center pt-4 mt-2 border-top">
              <Link to={`/edituser/${initialData.id}`}>
                <Button
                  className="px-1 shadow-sm text-nowrap"
                  color="primary"
                  onClick={() => setShow(true)}
                >
                  ویرایش اطلاعات
                </Button>
              </Link>

              <Button
                className="px-1 ms-2 shadow-sm text-nowrap"
                color="info"
                outline
                onClick={() => handleOpenModal(initialData)}
              >
                مدیریت نقش‌ها
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <Modal
        isOpen={openModal}
        toggle={() => setOpenModal(false)}
        className="modal-dialog-centered"
        style={{ maxWidth: "450px" }}
      >
        <ModalBody>
          <p className="mb-1 pt-2 text-center fw-bold fs-5">ویرایش نقش کاربر</p>
          {selectedUser && (
            <div className="mt-3 pt-3 pb-3 border-top d-flex align-items-center gap-1">
              <span className="fw-medium">نام:</span>
              <span className="text-primary">
                {selectedUser.fName} {selectedUser.lName}
              </span>
            </div>
          )}
          <div className="mb-4">
            <Label className="form-label fw-semibold" for="user-roles">
              نقش‌ها
            </Label>
            <Select
              isMulti
              name="roles"
              options={allRolesOptions}
              className="react-select"
              placeholder="نقش خود را انتخاب کنید..."
              classNamePrefix="select"
              value={selectedRoles}
              onChange={(val) => setSelectedRoles(val)}
              theme={selectThemeColors}
              noOptionsMessage={() =>
                selectedRoles.length === allRolesOptions.length &&
                "تمام نقش‌های موجود انتخاب شده‌اند"
              }
            />
          </div>
          <div className="mb-4">
            <div className="d-flex align-items-center gap-2">
              <div className="form-switch form-check-primary">
                <Input
                  type="switch"
                  id="user-status"
                  checked={isActive}
                  onChange={() => {
                    const newStatus = !isActive;
                    setIsActive(newStatus);

                    if (newStatus) {
                      setSelectedRoles(
                        allRolesOptions.map((r) => ({
                          value: r.value,
                          label: r.label,
                        }))
                      );
                    } else {
                      setSelectedRoles([]);
                    }
                  }}
                />
              </div>
              <span>{isActive ? "فعال" : "غیرفعال"}</span>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between">
          <Button color="secondary" outline onClick={() => setOpenModal(false)}>
            انصراف
          </Button>
          <Button
            color="primary"
            onClick={() => {
              if (!selectedUser || selectedRoles.length === 0) {
                toast.error("حداقل یک نقش انتخاب کنید");
                return;
              }

              const selectedRoleValue = selectedRoles[0]?.value
                .trim()
                .toLowerCase();

              const foundRole = rolesList.find(
                (r) =>
                  r.roleName?.toLowerCase() === selectedRoleValue ||
                  r.name?.toLowerCase() === selectedRoleValue
              );

              const roleId = foundRole ? foundRole.id : null;

              if (!roleId) {
                toast.error("اطلاعات نقش‌ها بارگذاری نشده است");
                return;
              }

              const currentUserRoleNames = selectedUser.roles
                ? selectedUser.roles.map((r) => r.roleName.toLowerCase().trim())
                : [];

              if (currentUserRoleNames.includes(selectedRoleValue)) {
                toast.error(`کاربر از قبل دارای نقش ${selectedRoleValue} است.`);
                setOpenModal(false);
                return;
              }

              addRoleMutation.mutate({
                roleId,
                userId: selectedUser.id,
              });

              setOpenModal(false);
            }}
          >
            ارسال
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default UserInfoCard;
