import { useState } from "react";
import Cookie from "cookie-universal";
import axios from "axios";
import { LOGIN, baseUrl } from "../../../Api/Api";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Formik, Form } from "formik";
import CustomField from "./CustomFeild";
import { validationSchema2 } from "./validationSchema2";
import "../Auth.css";

export default function Login() {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showErr , setShowErr] = useState(false)
  const cookie = Cookie();


  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/${LOGIN}`, values);
      const token = res.data.token;
      cookie.set("e-commerce", token);
      window.location.pathname = `/`;
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        setErr("Wrong Email Or Password");
      } else {
        setErr("Internal Server ERR");
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page min-vh-100 d-flex align-items-center" style={{background: "#f8f9fa"}}>
      <Container fluid="md">
        <Row className="justify-content-center mx-2">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-3 p-sm-4 p-md-5">
                <div className="text-center mb-3 mb-md-4">
                  <h2 className="fw-bold h3 h2-md" style={{color: "#001f3f"}}>Welcome Back</h2>
                  <p className="text-muted fs-6">Sign in to your account</p>
                </div>

                <Formik
                  initialValues={{
                    email: "",
                    password: ""
                  }}
                  validationSchema={validationSchema2}
                  onSubmit={handleSubmit}
                >
                    <Form className="mx-auto" style={{maxWidth: "500px"}}>
                      <div className="mb-3 mb-md-4">
                        <div className="form-group">
                          <CustomField
                            type="email" 
                            name="email"
                            placeholder="Enter your email"
                            show={showErr}
                          />
                        </div>
                      </div>

                      <div className="mb-3 mb-md-4 position-relative">
                        <div className="form-group">
                          <CustomField
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            show={showErr}
                          />
                          <div
                            className="position-absolute"
                            style={{
                              cursor: "pointer",
                              top: "50%",
                              right: "15px",
                              transform: "translateY(-50%)"
                            }}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                          </div>
                        </div>
                      </div>

                      {err && <div className="alert alert-danger py-2 mb-3 mb-md-4">{err}</div>}

                      <button
                        onClick={()=>setShowErr(true)}
                        type="submit"
                        className="btn btn-lg w-100 mb-3 mb-md-4"
                        style={{
                          background: "#001f3f",
                          color: "white",
                          border: "none"
                        }}
                      >
                        {loading ? (
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          "Sign In"
                        )}
                      </button>

                      <div className="text-center">
                        <p className="text-muted mb-3 mb-md-4 small">Or continue with</p>

                        <a
                          href="http://127.0.0.1:8000/login-google"
                          className="btn btn-light btn-lg w-100 d-flex align-items-center justify-content-center gap-2 mb-3 mb-md-4"
                          style={{border: "1px solid #dee2e6"}}
                        >
                          <FcGoogle className="fs-5" />
                          <span className="fs-6">Sign in with Google</span>
                        </a>

                        <p className="mb-0 small">
                          Don't have an account?{" "}
                          <a
                            href="/register"
                            style={{color: "#001f3f", textDecoration: "none"}}
                            className="fw-medium"
                          >
                            Sign up
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
