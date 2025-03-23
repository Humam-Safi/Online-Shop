import { prod, PROD } from "../../../Api/Api";
import TableShow from "../../../components/dashboard/Table";
import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";

const Products = () => {
  const [Products, setProducts] = useState([]);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PROD}?limit=${limit}&page=${page}`)
      .then((data) => {
        setProducts(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);
  const header = [
    { key: "images", name: "Images" },
    { key: "title", name: "Title" },
    { key: "description", name: "Description" },
    { key: "price", name: "Price" },
    { key: "rating", name: "Rating" },
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Updated" },
  ];

  // Function Handle Delete
  async function handleDelet(id) {
    try {
      const res = await Axios.delete(`${prod}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      if (err.response.status === 403) {
        console.log(err);
        window.location.pathname = "/dashboard/403";
      }
    }
  }

  return (
    <div className="bg-white p-1 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Products page</h1>
      </div>
      <TableShow
        header={header}
        data={Products}
        delete={handleDelet}
        page={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
        loading={loading}
        total={total}
        search="title"
        searchLink={prod}
      />
    </div>
  );
};

export default Products;
