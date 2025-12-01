import { useState } from "react";
import Sidebar from "@components/sidebar";
import { useForm, Controller } from "react-hook-form";
import { Button, Label, Form, Input } from "reactstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import AddUser from "../../core/services/api/post/AddUser";

const defaultValues = {
  email: "",
  contact: "",
  fullName: "",
  username: "",
  password: "",
};

const checkIsValid = (data) => {
  return Object.values(data).every(
    (field) => field && String(field).length > 0
  );
};

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  const [isStudent, setIsStudent] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

  const queryClient = useQueryClient();

  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const addUserMutation = useMutation({
    mutationFn: (userData) => AddUser(userData),
    onSuccess: () => {
      toast.success("کاربر با موفقیت افزوده شد");

      queryClient.invalidateQueries({ queryKey: ["GetAllUser"] });
      toggleSidebar();
    },
    onError: (error) => {
      toast.error("خطا در افزودن کاربر");
    },
  });

  const onSubmit = (data) => {
    if (checkIsValid(data)) {
      const payload = {
        firstName: data.fullName,
        lastName: data.username,
        gmail: data.email,
        password: data.password,
        phoneNumber: data.contact,
        isStudent: isStudent,
        isTeacher: isTeacher,
      };

      addUserMutation.mutate(payload);
    } else {
      for (const key in data) {
        if (data[key] === null) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, "");
    }

    setIsStudent(false);
    setIsTeacher(false);
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="کاربر جدید"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <Label
            style={{ fontSize: "17px" }}
            className="form-label"
            for="userEmail"
          >
            ایمیل <span className="text-danger ">*</span>
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                id="userEmail"
                placeholder="user@example.com"
                invalid={errors.email && true}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-1">
          <Label
            style={{ fontSize: "17px" }}
            className="form-label"
            for="contact"
          >
            شماره تلفن <span className="text-danger">*</span>
          </Label>
          <Controller
            name="contact"
            control={control}
            render={({ field }) => (
              <Input
                id="contact"
                placeholder="09xxxxxxxxx"
                invalid={errors.contact && true}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-1">
          <Label
            style={{ fontSize: "17px" }}
            className="form-label"
            for="fullName"
          >
            نام <span className="text-danger">*</span>
          </Label>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <Input
                id="fullName"
                placeholder=" نام"
                invalid={errors.fullName && true}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-1">
          <Label
            style={{ fontSize: "17px" }}
            className="form-label"
            for="username"
          >
            نام خانوادگی <span className="text-danger">*</span>
          </Label>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                id="username"
                placeholder=" نام خانوادگی "
                invalid={errors.username && true}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-1">
          <Label
            style={{ fontSize: "17px" }}
            className="form-label"
            for="password"
          >
            رمز عبور <span className="text-danger">*</span>
          </Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                type="password"
                id="password"
                placeholder=" رمز عبور "
                invalid={errors.password && true}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-3 mt-1">
          <p style={{ fontSize: "17px" }} className="form-label fw-bold mb-1">
            نوع کاربر
          </p>

          <div className="form-check mb-1">
            <input
              className="form-check-input"
              type="checkbox"
              id="role-student"
              checked={isStudent}
              onChange={(e) => setIsStudent(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="role-student">
              دانش‌آموز
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="role-teacher"
              checked={isTeacher}
              onChange={(e) => setIsTeacher(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="role-teacher">
              معلم
            </label>
          </div>
        </div>

        <Button
          type="submit"
          className="me-1"
          color="primary"
          disabled={addUserMutation.isPending}
        >
          {addUserMutation.isPending ? "در حال ارسال..." : "تایید"}
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          انصراف
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
