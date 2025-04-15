import { useState } from "react";
import Cookie from "cookie-universal";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { REGISTER, baseUrl } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { validationSchema1 } from "./validationSchema1";
import CustomField from "./CustomFeild";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../Auth.css";

export default function Register() {
  const cookie = Cookie();

  const [openPasswordEye, setOpenPasswordEye] = useState(false);
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(values) {
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/${REGISTER}`, values);
      const token = res.data.token;
      setLoading(false);
      cookie.set("e-commerce", token);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response.status === 422) {
        setErr("Email is already been taken");
      } else {
        setErr("Internal Server ERR");
      }
    }
  }

  return (
    <div
      className="auth-page min-vh-100 d-flex align-items-center"
      style={{ background: "#f8f9fa" }}
    >
      <Container fluid="md">
        <Row className="justify-content-center mx-2">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-3 p-sm-4 p-md-5">
                <div className="text-center mb-3 mb-md-4">
                  <h2 className="fw-bold h3 h2-md" style={{ color: "#001f3f" }}>
                    Create Account
                  </h2>
                  <p className="text-muted fs-6">
                    Join our e-commerce community today
                  </p>
                </div>

                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                  }}
                  onSubmit={(values) => handleSubmit(values)}
                  validationSchema={validationSchema1}
                >
                  <Form className="mx-auto" style={{ maxWidth: "500px" }}>
                    <div className="mb-3 mb-md-4">
                      <CustomField
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        show={show}
                      />
                    </div>

                    <div className="mb-3 mb-md-4">
                      <CustomField
                        name="email"
                        type="text"
                        placeholder="Enter your email"
                        show={show}
                      />
                    </div>

                    <div className="mb-3 mb-md-4 position-relative">
                      <CustomField
                        name="password"
                        type={openPasswordEye ? "text" : "password"}
                        placeholder="Create password"
                        show={show}
                      />
                      <div
                        className="position-absolute"
                        style={{
                          cursor: "pointer",
                          top: "20px",
                          right: "15px",
                          transform: "translateY(-50%)",
                        }}
                        onClick={() => setOpenPasswordEye((prev) => !prev)}
                      >
                        {openPasswordEye ? <FaRegEye /> : <FaRegEyeSlash />}
                      </div>
                    </div>

                    {err && (
                      <div className="alert alert-danger py-2">{err}</div>
                    )}

                    <button
                      onClick={() => setShow(true)}
                      type="submit"
                      className="btn btn-lg w-100 mb-3 mb-md-4"
                      style={{
                        background: "#001f3f",
                        color: "white",
                        border: "none",
                      }}
                    >
                      {loading ? (
                        <div
                          className="spinner-border spinner-border-sm"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Create Account"
                      )}
                    </button>

                    <div className="text-center">
                      <p className="text-muted mb-3 mb-md-4 small">
                        Or continue with
                      </p>

                      <button
                        className="btn btn-light btn-lg w-100 d-flex align-items-center justify-content-center gap-2 mb-4"
                        style={{ border: "1px solid #dee2e6" }}
                      >
                        <FcGoogle className="fs-5" />
                        <span className="fs-6">Sign up with Google</span>
                      </button>

                      <p className="mt-3 mb-0 small">
                        Already have an account?{" "}
                        <a
                          href="/login"
                          style={{ color: "#001f3f", textDecoration: "none" }}
                          className="fw-medium"
                        >
                          Sign in
                        </a>
                      </p>
                    </div>
                  </Form>
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
