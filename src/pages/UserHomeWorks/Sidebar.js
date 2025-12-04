import { useState } from "react";
import Sidebar from "@components/sidebar";
import { selectThemeColors } from "@utils";
import Select from "react-select";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";
import { Button, Label, FormText, Form, Input } from "reactstrap";
import { addUser } from "./store";
import { useDispatch } from "react-redux";
import { addUserHomeWorks } from "../../core/services/api/post/UserHomeWorks/addUserHomeWorks";
import { toast } from "react-toastify";



const defaultValues = {
  email: "",
  contact: "",
  company: "",
  homeWorkTitle: "",
  homeWorkDescribe: "",
  country: null,
};

const countryOptions = [
  { label: "Australia", value: "Australia" },
  { label: "Bangladesh", value: "Bangladesh" },
  { label: "Belarus", value: "Belarus" },
  { label: "Brazil", value: "Brazil" },
  { label: "Canada", value: "Canada" },
  { label: "China", value: "China" },
  { label: "France", value: "France" },
  { label: "Germany", value: "Germany" },
  { label: "India", value: "India" },
  { label: "Indonesia", value: "Indonesia" },
  { label: "Israel", value: "Israel" },
  { label: "Italy", value: "Italy" },
  { label: "Japan", value: "Japan" },
  { label: "Korea", value: "Korea" },
  { label: "Mexico", value: "Mexico" },
  { label: "Philippines", value: "Philippines" },
  { label: "Russia", value: "Russia" },
  { label: "South", value: "South" },
  { label: "Thailand", value: "Thailand" },
  { label: "Turkey", value: "Turkey" },
  { label: "Ukraine", value: "Ukraine" },
  { label: "United Arab Emirates", value: "United Arab Emirates" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "United States", value: "United States" },
];

const checkIsValid = (data) => {
  return Object.values(data).every((field) =>
    typeof field === "object" ? field !== null : field.length > 0
  );
};

const SidebarNewUsers = ({ open, toggleSidebar }) => {

  const [data, setData] = useState(null);
  const [plan, setPlan] = useState("basic");
  const [role, setRole] = useState("subscriber");


  const dispatch = useDispatch();


  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });


  const onSubmit = (data, {resetForm}) => {
    addUserHomeWorks(data.homeWorkTitle, homeWorkDescribe, data.sessionId),
    setData(data);
    if (checkIsValid(data)) {
      toggleSidebar();
      dispatch(
        addUser({
          role,
          avatar: "",
          status: "active",
          email: data.email,
          currentPlan: plan,
          billing: "auto debit",
          company: data.company,
          contact: data.contact,
          homeWorkTitle: data.homeWorkTitle,
          homeWorkDescribe: data.homeWorkDescribe,
          country: data.country.value,
        })
      );
      resetForm()
      toast.success('تسک جدید افزوده شد')
    } 
    else{
      for (const key in data) {
        if (data[key] === null) {
          setError("country", {
            type: "manual",
          });
        }
        if (data[key] !== null && data[key].length === 0) {
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
    setRole("subscriber");
    setPlan("basic");
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="تسک جدید"
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
            for="homeWorkTitle"
          >
            نام تسک <span className="text-danger">*</span>
          </Label>
          <Controller
            name="homeWorkTitle"
            control={control}
            render={({ field }) => (
              <Input
                id="homeWorkTitle"
                placeholder="نام تسک"
                invalid={errors.homeWorkTitle && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label
            style={{ fontSize: "17px" }}
            className="form-label"
            for="homeWorkDescribe"
          >
            توضیحات تسک<span className="text-danger">*</span>
          </Label>
          <Controller
            name="homeWorkDescribe"
            control={control}
            render={({ field }) => (
              <Input
                id="homeWorkDescribe"
                placeholder="توضیحات تسک"
                invalid={errors.homeWorkDescribe && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label
            style={{ fontSize: "17px" }}
            className="form-label"
            for="sessionId"
          >
            آیدی جلسه<span className="text-danger">*</span>
          </Label>
          <Controller
            name="sessionId"
            control={control}
            render={({ field }) => (
              <Input
                id="sessionId"
                placeholder="آیدی جلسه"
                invalid={errors.sessionId && true}
                {...field}
              />
            )}
          />
        </div>
        <Button type="submit" className="me-1" color="primary">
          تایید
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          انصراف
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
