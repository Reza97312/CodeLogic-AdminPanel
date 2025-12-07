import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate } from "react-router-dom";
import bahr from "../assets/images/A/Bahr.png";
import { Facebook, Twitter, Mail, GitHub } from "react-feather";
import InputPasswordToggle from "@components/input-password-toggle";
import {
  Row,
  Col,
  Form,
  CardTitle,
  CardText,
  Label,
  Input,
  Button,
  Toast,
} from "reactstrap";
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";
import "@styles/react/pages/page-authentication.scss";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import http from "../core/interceptor/interceptor.js";
import { useState } from "react";
import { setItem } from "../utility/helper/storage.services";
const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const postLoginInfo = async (payload) => {
    try {
      setIsLoading(true);
      const result = await http.post("/Sign/Login", payload);
      console.log(result);
      if (result.token) {
        setItem("token", result.token);
      }
      if (result.success) {
        navigate("/home");
        toast.success(result.message);
      }
      return result;
    } catch (err) {
      setIsLoading(false);
      toast.error(err.response?.data?.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const { skin } = useSkin();
  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("لطفا فیلد را پر کنید")
      .min(8, "باید حداقل شامل 8 باشد"),
    phoneOrGmail: Yup.string()
      .required("لطفا فیلد را پر کنید")
      .min(4, "باید حداقل شامل 4 کاراکتر باشد"),
  });

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img style={{ height: "50px" }} src={bahr} alt="Logo" />
            <h2
              style={{ marginTop: "6px" }}
              className="brand-text text-primary ms-1"
            >
              آکادمی بحر
            </h2>
          </div>
        </Link>

        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>

        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <Formik
              initialValues={{
                phoneOrGmail: "",
                password: "",
                rememberMe: false,
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
                postLoginInfo(values);
              }}
            >
              {({ handleSubmit }) => (
                <>
                  <CardTitle tag="h1" className="fw-bold mb-1">
                    سلام به پنل ادمین خوش آمدید ! 👋
                  </CardTitle>

                  <CardText className="mb-2">لطفا ابتدا وارد شوید</CardText>

                  <Form
                    className="auth-login-form mt-2"
                    onSubmit={handleSubmit}
                  >
                    <div style={{ position: "relative" }} className="mb-1">
                      <Label tag={"h3"} className="form-label">
                        ایمیل یا شماره تماس
                      </Label>
                      <Field
                        type="text"
                        name="phoneOrGmail"
                        placeholder="john@example.com"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="phoneOrGmail"
                        component="span"
                        style={{
                          color: "#EF5350",
                          fontSize: "12px",
                          right: "5px",
                          top: "-1px",
                          position: "absolute",
                        }}
                      />
                    </div>

                    <div style={{ position: "relative" }} className="mt-2">
                      <div className="d-flex justify-content-between mt-2">
                        <Label
                          tag={"h3"}
                          className="form-label"
                          for="login-password"
                        >
                          رمز عبور
                        </Label>
                        <Link to="/forgot-password">
                          <small>رمز عبورتان را فراموش کردید ؟</small>
                        </Link>
                      </div>

                      <Field name="password">
                        {({ field }) => (
                          <InputPasswordToggle
                            className="input-group-merge"
                            id="login-password"
                            {...field}
                          />
                        )}
                      </Field>

                      <ErrorMessage
                        name="password"
                        component="span"
                        style={{
                          color: "#EF5350",
                          fontSize: "12px",
                          right: "5px",
                          top: "65px",
                          position: "absolute",
                        }}
                      />
                    </div>
                    <div className="form-check mt-1 mb-2">
                      <Field
                        type="checkbox"
                        id="remember-me"
                        name="rememberMe"
                        className="form-check-input"
                      />
                      <Label className="form-check-label" for="remember-me">
                        مرا به خاطر بسپار
                      </Label>
                    </div>

                    <Button type="submit" color="primary" block>
                      وارد شوید
                    </Button>
                  </Form>
                </>
              )}
            </Formik>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
