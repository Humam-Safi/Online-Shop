import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { CAT, prod } from "../../../Api/Api";
import LoadingSubmit from "../../../components/loading/loading";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const [images, setImages] = useState([]);
  const [categ, setCateg] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgServer, setImgServer] = useState([]);
  const [idServer, setIdServer] = useState([]);
  const nav = useNavigate();

  console.log(idServer);

  const { id } = useParams();

  const openImage = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);

  function handleOpenImage() {
    openImage.current.click();
  }

  // get all categories
  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((data) => setCateg(data.data.data))
      .catch((err) => console.log(err));
  }, []);

  // get all input values
  useEffect(() => {
    Axios.get(`${prod}/${id}`).then((data) => {
      setForm(data.data[0]);
      setImgServer(data.data[0].images);
    });
  }, []);

  // Mapping
  const categShow = categ.map((item, key) => (
    <option value={item.id} key={key}>
      {item.title}
    </option>
  ));

  const imagesShow = images.map((image, key) => (
    <div className="border p-2 w-100">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-start align-items-center gap-2 ">
          <img src={URL.createObjectURL(image)} width="80px" />
          <div>
            <p className="mb-1">{image.name}</p>
            <p>
              {image.size / 1024 <= 1000
                ? (image.size / 1024).toFixed(2) + " KB"
                : (image.size / (1024 * 1024)).toFixed(2) + " MB"}
            </p>
          </div>
        </div>
        <Button onClick={() => handleImageDelete(key, image)} variant="danger">
          Delete
        </Button>
      </div>
      <div className="custom-progress mt-3">
        <span
          ref={(e) => (progress.current[key] = e)}
          className="inner-progress"
        ></span>
      </div>
    </div>
  ));
  const imgServerShow = imgServer.map((image, key) => (
    <div className="border p-2 w-100">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-start align-items-center gap-2 ">
          <img src={image.image} width="80px" />
          <div>
            <p className="mb-1">{image.name}</p>
          </div>
        </div>
        <Button
          onClick={() => handleImgServerDelete(image.id)}
          variant="danger"
        >
          Delete
        </Button>
      </div>
    </div>
  ));

  // handel change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // handle image change

  const j = useRef(-1);

  async function handleImageChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imageData = e.target.files;
    const data = new FormData();
    for (let i = 0; i < imageData.length; i++) {
      j.current++;
      data.append("image", imageData[i]);
      data.append("product_id", id);

      try {
        const res = await Axios.post(`product-img/add`, data, {
          onUploadProgress: (progEvent) => {
            const { loaded, total } = progEvent;
            const percent = Math.floor((loaded * 100) / total);

            progress.current[j.current].style.width = `${percent}%`;
            progress.current[j.current].setAttribute("percent", `${percent}%`);
          },
        });
        ids.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Handle Edit
  async function handleEdit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${prod}/edit/${id}`, form);
      for (let i = 0; i < idServer.length; i++) {
        await Axios.delete(`product-img/${idServer[i]}`);
      }
      window.location.pathname = "dashboard/products";
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  // handle image delete
  async function handleImageDelete(index, img) {
    const findId = ids.current[index];
    try {
      const res = await Axios.delete(`product-img/${findId}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((i) => i !== findId);
      --j.current;
    } catch (err) {
      console.log(err);
    }
  }
  // handle image server delete
  async function handleImgServerDelete(id) {
    setImgServer((prev) => prev.filter((img) => img.id !== id));
    setIdServer((prev) => {
      return [...prev, id];
    });
  }

  return (
    <Container className="p-5 my-5" style={{ background: "#f7f9fc" }}>
      {loading && <LoadingSubmit />}
      <Form  onSubmit={handleEdit}>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={form.category}
            onChange={handleChange}
            placeholder="Title..."
            name="category"
          >
            <option disabled>Select Category</option>
            {categShow}
          </Form.Select>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={form.title}
                onChange={handleChange}
                type="text"
                placeholder="Title..."
                name="title"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>description</Form.Label>
              <Form.Control
                value={form.description}
                onChange={handleChange}
                type="text"
                placeholder="Description..."
                name="description"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          {" "}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                row={6}
                value={form.price}
                onChange={handleChange}
                type="text"
                placeholder="Price..."
                name="price"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="discount">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                value={form.discount}
                onChange={handleChange}
                type="text"
                placeholder="Discount..."
                name="discount"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="About">
          <Form.Label>About</Form.Label>
          <Form.Control
            row={3}
            value={form.About}
            onChange={handleChange}
            type="text"
            placeholder="About..."
            name="About"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control
            ref={openImage}
            hidden
            multiple
            onChange={handleImageChange}
            type="file"
          />
        </Form.Group>
        <div
          onClick={handleOpenImage}
          className="d-flex justify-content-center align-items-center flex-column gap-2 py-2 w-100"
          style={{
            border: "2px dashed #0086fe",
            cursor: "pointer",
          }}
        >
          <img
            src={require("../../../Assets/Images/upload.png")}
            alt="Upload Image"
            width="100px"
            style={{ filter: "grayscale(1)" }}
          />
          <p className="fw-bolder" style={{ color: "#0086fe" }}>
            Upload Image
          </p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2 ">
          {imagesShow}
        </div>
        <div className="d-flex align-items-start flex-column gap-2 ">
          {imgServerShow}
        </div>
        <div className="mt-3">
          <button
            className="btn btn-primary"
            // disabled={title.length > 1 ? false : true}
          >
            SAVE
          </button>
        </div>
        {error !== "" && <span className="error">{error}</span>}
      </Form>
    </Container>
  );
};

export default EditProduct;
