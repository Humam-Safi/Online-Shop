import { Cat, CAT } from "../../../Api/Api";
import TableShow from "../../../components/dashboard/Table";
import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";

const Categories = () => {
  const [categ, setCateg] = useState([]);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // Function Handle Delete
  async function handleDelet(id) {
    try {
      const res = await Axios.delete(`${Cat}/${id}`);
      setCateg((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      if (err.response.status === 403) {
        console.log(err);
        window.location.pathname = "/dashboard/403";
      }
    }
  }

  

  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCateg(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  const header = [
    { key: "title", name: "Title" },
    { key: "image", name: "Image" },
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Updated" },
  ];

  return (
    <div className="bg-white p-1 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Users page</h1>
      </div>
     
      <TableShow
        page={page}
        limit={limit}
        header={header}
        data={categ}
        delete={handleDelet}
        setPage={setPage}
        setLimit={setLimit}
        loading={loading}
        total={total}
        search="title"
        searchLink={Cat}
      />
    </div>
  );
};

export default Categories;
