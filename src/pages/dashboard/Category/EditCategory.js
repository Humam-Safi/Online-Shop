import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { Cat } from "../../../Api/Api";
import LoadingSubmit from "../../../components/loading/loading";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState([]); 
  const [loading, setLoading] = useState(false);

  const openImage = useRef(null);

  
// ID
const { id } = useParams();
  
const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Axios.get(`${Cat}/${id}`)
      .then((data) => {
        setTitle(data.data.title);
        setLoading(false);
      })
      .catch(() => {
        navigate("/none", { replace: true });
      });
  }, []);

  function handleOpenImage() {
    openImage.current.click();
  }

  console.log(image);

  const imagesShow = image.map((img, key) => (
    <div className="border p-2 w-100" key={key}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-start align-items-center gap-2">
          <img src={URL.createObjectURL(img)} width="80px" alt={img.name} />
          <div>
            <p className="mb-1">{img.name}</p>
            <p>
              {img.size / 1024 <= 1000
                ? (img.size / 1024).toFixed(2) + " KB"
                : (img.size / (1024 * 1024)).toFixed(2) + " MB"}
            </p>
          </div>
        </div>
        <Button onClick={() => setImage((prev) => prev.filter((image) => image !== img))} variant="danger">
          Delete
        </Button>
      </div>
    </div>
  ));

  // Handle submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    image.forEach((img) => form.append("image", img)); // Append each image
    try {
      const res = await Axios.post(`${Cat}/edit/${id}`, form);
      window.location.pathname = "/dashboard/categories";
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      {loading && <LoadingSubmit />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Image</Form.Label>
          <Form.Control
            hidden
            ref={openImage}
            onChange={(e) => setImage([...e.target.files])} // Spread files into array
            type="file"
            multiple
          />
        </Form.Group>
        <div
          onClick={handleOpenImage}
          className="d-flex justify-content-center align-items-center flex-column gap-2 py-2 w-100 mt-3 mb-3"
          style={{
            border: "2px dashed #0086fe",
            cursor: "pointer",
          }}
        >
          <img
            src={require("../../../Assets/Images/upload.png")}
            alt="Upload Image"
            width="100px"
          />
          <p className="fw-bolder" style={{ color: "#0086fe" }}>
            Upload Image
          </p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2 mt-3 mb-3">
          {imagesShow}
        </div>
        <button
          className="btn btn-primary"
          disabled={title.length > 1 ? false : true}
        >
          SAVE
        </button>
      </Form>
    </>
  );
};


export default EditCategory;
