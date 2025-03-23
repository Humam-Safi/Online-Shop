import { useEffect, useState } from "react";
import { USER, USERS } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import TableShow from "../../../components/dashboard/Table";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);
  const [currUser, setCurrUser] = useState("");
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // Fetch current user data
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setCurrUser(data.data))
      .catch((err) => {
        if (err.response.status === 403) {
          console.log("Current user fetch error:", err);
        }
      });
  }, []);

  // Fetch users with pagination
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setUsers(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          console.log("Users fetch error:", err);
        }
      })
      .finally(() => setLoading(false));
  }, [deleteUser, limit, page]);

  const Header = [
    { key: "name", name: "User Name" },
    { key: "email", name: "Email" },
    { key: "role", name: "Role" },
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Updated" },
  ];

  // Function Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      if (err.response.status === 403) {
        console.log("Delete error:", err);
        window.location.pathname = "/dashboard/403";
      }
    }
  }

  return (
    <div className="bg-white p-1 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Users page</h1>
      </div>
      <TableShow
        header={Header}
        data={users}
        delete={handleDelete}
        currUser={currUser}
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        loading={loading}
        total={total}
        search="name"
        searchLink={USER}
      />
    </div>
  );
};

export default Users;
