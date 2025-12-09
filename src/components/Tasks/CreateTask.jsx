import { Formik } from "formik";
import React from "react";
import ReactQuill from "react-quill";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { GetCourseAssistance } from "../../core/services/api/get/Courses/GetAssistance.js";
import * as Yup from "yup";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UpdateTask } from "../../core/services/api/put/Tasks/UpdateTask.js";
import { PostTask } from "../../core/services/api/post/Tasks/PostTask.js";
import DateObject from "react-date-object";
import { toast } from "react-toastify";
const CreateTask = ({ isOpen, toggle, editData }) => {
  const queryClient = useQueryClient();
  /////// validations ////////
  const validationSchema = Yup.object({
    worktitle: Yup.string().required("پرکردن فیلد الزامیست"),
    workDescribe: Yup.string().required("پرکردن فیلد الزامیست"),
    assistanceId: Yup.string().required("انتخاب منتور الزامیست"),
    workDate: Yup.string().required("تاریخ تسک لازم است"),
  });
  ////// mentors ////////
  const { data: Assistance = [], isPending: pendingMentor } = useQuery({
    queryKey: ["GETASSISTANCE"],
    queryFn: () => GetCourseAssistance(),
  });
  /////// post and put /////
  const { mutate: upTask } = useMutation({
    mutationKey: ["UPDATETASK"],
    mutationFn: (vals) => UpdateTask(vals),
    onSuccess: (data) => {
      toast.success(data.message);
      toggle(false);
      queryClient.invalidateQueries(["ALLTASKS"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
  });
  const { mutate: crTask, isPending } = useMutation({
    mutationKey: ["POSTTASK"],
    mutationFn: (vals) => PostTask(vals),
    onSuccess: (data) => {
      toast.success(data.message);
      toggle(false);
      queryClient.invalidateQueries(["ALLTASKS"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
  });

  const convertToUTC = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new DateObject({
        date: dateString,
        format: "YYYY/MM/DD",
        calendar: persian,
        locale: persian_fa,
      });
      return date.toDate().toISOString();
    } catch (err) {
      console.error("Invalid date:", dateString);
      return "";
    }
  };
  const toJalali = (date) => {
    if (!date) return "";
    try {
      return new DateObject({
        date,
      })
        .convert(persian, persian_fa)
        .format("YYYY/MM/DD");
    } catch {
      return "";
    }
  };
  return (
    <Modal isOpen={isOpen} toggle={() => toggle(false)}>
      <ModalHeader>{editData ? "ویرایش" : "ساخت"} تسک</ModalHeader>
      <Formik
        initialValues={{
          id: editData ? editData.id : null,
          worktitle: editData?.worktitle || "",
          workDescribe: editData?.workDescribe || "",
          workDate: editData?.workDate || "",
          assistanceId: editData?.assistanceId || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          if (!editData) {
            crTask(values);
          } else {
            upTask(values);
          }
        }}
      >
        {({ errors, values, touched, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <ModalBody>
              <FormGroup>
                <Label>نام تسک</Label>
                <Input
                  value={values.worktitle}
                  onChange={(e) => setFieldValue("worktitle", e.target.value)}
                  invalid={touched.worktitle && !!errors.worktitle}
                />
                <FormFeedback>{errors.worktitle}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label>توضیحات تسک</Label>
                <ReactQuill
                  theme="snow"
                  value={values.workDescribe}
                  onChange={(content) => setFieldValue("workDescribe", content)}
                  className={errors.workDescribe ? "is-invalid" : ""}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, 4, 5, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ color: [] }, { background: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                />

                {errors.workDescribe && (
                  <div className="text-danger small mt-1">
                    {errors.workDescribe}
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                <Label>تاریخ تسک</Label>
                <DatePicker
                  value={editData ? toJalali(values.workDate) : values.workDate}
                  inputClass="form-control"
                  onChange={(d) => {
                    console.log(
                      "workDate",
                      convertToUTC(d.format("YYYY/MM/DD"))
                    );

                    setFieldValue(
                      "workDate",
                      convertToUTC(d?.format("YYYY/MM/DD"))
                    );
                  }}
                  calendar={persian}
                  locale={persian_fa}
                />
                <div className="text-danger small">{errors.workDate}</div>
              </FormGroup>
              <FormGroup>
                <Label>انتخاب منتور</Label>
                <Input
                  type="select"
                  value={values.assistanceId}
                  onChange={(e) =>
                    setFieldValue("assistanceId", e.target.value)
                  }
                  invalid={touched.assistanceId && !!errors.assistanceId}
                >
                  <option value="">انتخاب کنید</option>

                  {pendingMentor ? (
                    <option>در حال بارگزاری...</option>
                  ) : Assistance?.length > 0 ? (
                    Assistance.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.assistanceName}
                      </option>
                    ))
                  ) : (
                    <option>دپارتمانی یافت نشد</option>
                  )}
                </Input>
                <FormFeedback>{errors.assistanceId}</FormFeedback>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">
                ارسال
              </Button>
              <Button color="danger" onClick={() => toggle(false)}>
                انصراف
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateTask;
