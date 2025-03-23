import { useEffect, useRef, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { USER } from "../../../Api/Api";
import LoadingSubmit from "../../../components/loading/loading";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  }, []);
  // Handle submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/add`, {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      window.location.pathname = "/dashboard";
    } catch (err) {
      setLoading(false);
      if (err.response.status === 422) {
        setError("Invalid User Name Or Email");
      }
    }
  }

  return (
    <Container className="p-5 my-5" style={{ background: "#f7f9fc" }}>
      {loading && <LoadingSubmit />}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name..."
            ref={focus}
          />
        </Form.Group>
        <Row className="mt-3">
          <Col md={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email..."
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Pssword..."
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Role</Form.Label>
          <Form.Select row={3} value={role} onChange={(e) => setRole(e.target.value)}>
            <option disabled value="">
              Select A Role
            </option>
            <option value="1995">Admin</option>
            <option value="1997">Wrtier</option>
            <option value="2001">User</option>
            <option value="1999">Product Maneger</option>
          </Form.Select>
        </Form.Group>
        <button
          className="btn btn-primary"
          // disabled={
          //   name.length > 1 &&
          //   email.length > 1 &&
          //   password.length > 6 &&
          //   role !== ""
          //     ? false
          //     : true
          // }
        >
          SAVE
        </button>
        {error !== "" && <span className="error">{error}</span>}
      </Form>
    </Container>
  );
};

export default AddUser;
