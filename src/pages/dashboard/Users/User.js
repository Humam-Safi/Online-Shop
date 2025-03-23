import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { USER } from "../../../Api/Api";
import LoadingSubmit from "../../../components/loading/loading";
import { useNavigate, useParams } from "react-router-dom";

const User = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // ID
  const {id} = useParams();


  const focus = useRef(null)

  const navigate = useNavigate();

  useEffect(() => {
    focus.current.focus();
    setLoading(true)
    Axios.get(`${USER}/${id}`)
      .then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
        setLoading(false)
      })
      .then(() => setDisable(false)).catch(()=>{
        navigate("/none" , {replace :true})
      });
  }, []);

  // Handle submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
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
    <>
      {loading && <LoadingSubmit />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name..."
            ref={focus}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option disabled value="">Select A Role</option>
            <option value="1995">Admin</option>
            <option value="1997">Wrtier</option>
            <option value="2001">User</option>
          </Form.Select>
        </Form.Group>
        <button disabled={disable} className="btn btn-primary">
          SAVE
        </button>
        {error !== "" && <span className="error">{error}</span>}
      </Form>
    </>
  );
};

export default User;
