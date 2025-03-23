import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginatedItems from "../paginate/pagination";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import transformDate from "../../helpers/TransformDate";

const TableShow = (props) => {
  const currUser = props.currUser || { name: "" };
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [date, setDate] = useState("");

  const filteredDataByDate = props.data.filter(
    (item) => transformDate(item.created_at) === date
  );

  const filteredDataByAll =
    date === ""
      ? filteredData
      : filteredData.filter((item) => transformDate(item.created_at) === date);

  const showData =
    search.length > 0
      ? filteredDataByAll
      : date !== ""
      ? filteredDataByDate
      : props.data;

  async function handleSearchData() {
    try {
      const res = await Axios.post(
        `${props.searchLink}/search?title=${search}`
      );
      setFilteredData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      search.length > 0 ? handleSearchData() : setSearchLoading(false);
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  const ShowHeader = props.header.map((item, index) => (
    <th key={index}>{item.name}</th>
  ));

  const dataShow = showData.map((item, key) => (
    <tr key={key}>
      <td data-label="ID">{item.id}</td>
      {props.header.map((item2, key2) => (
        <td key={key2} data-label={item2.name}>
          {item2.key === "image" ? (
            <img width="50px" src={item[item2.key]} alt="" />
          ) : item2.key === "images" ? (
            <div className="d-flex align-items-center justify-content-start gap-3 flex-wrap">
              {item[item2.key].map((img, imgIndex) => (
                <img key={imgIndex} width="50px" src={img.image} alt="" />
              ))}
            </div>
          ) : item2.key === "created_at" || item2.key === "updated_at" ? (
            transformDate(item[item2.key])
          ) : item[item2.key] === "1995" ? (
            "Admin"
          ) : item[item2.key] === "2001" ? (
            "User"
          ) : item[item2.key] === "1997" ? (
            "Writer"
          ) : item[item2.key] === "1999" ? (
            "Product"
          ) : (
            item[item2.key]
          )}
          {currUser && item[item2.key] === currUser.name && " (You)"}
        </td>
      ))}
      <td data-label="Action">
        <div className="d-flex align-items-center gap-2 justify-content-center">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon
              className="icons"
              cursor="pointer"
              fontSize={"20px"}
              color="#038edc"
              icon={faPenToSquare}
            />
          </Link>

          {currUser.name !== item.name && (
            <FontAwesomeIcon
              className="icons"
              cursor="pointer"
              onClick={() => props.delete(item.id)}
              fontSize={"20px"}
              color="red"
              icon={faTrash}
            />
          )}
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="table-container">
      <div className="filters-wrapper p-4 d-flex flex-column flex-md-row gap-3 align-items-center justify-content-start">
        <Form.Control
          onChange={(e) => setDate(e.target.value)}
          className="filter-input"
          style={{
            boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "20px",
            maxWidth: "200px",
          }}
          type="date"
          aria-label="Date filter"
        />
        <Form.Control
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLoading(true);
          }}
          className="filter-input"
          style={{
            boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "20px",
            maxWidth: "300px",
          }}
          type="search"
          placeholder="Search"
          aria-label="Search input"
        />
      </div>

      <div className="table-responsive">
        <Table className="fl-table" striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              {ShowHeader}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.loading ? (
              <tr style={{ textAlign: "center" }}>
                <td colSpan={12}>Loading...</td>
              </tr>
            ) : searchLoading ? (
              <tr style={{ textAlign: "center" }}>
                <td colSpan={12}>Searching...</td>
              </tr>
            ) : (
              dataShow
            )}
          </tbody>
        </Table>
      </div>

      <div className="pagination-wrapper d-flex align-items-center justify-content-end flex-wrap gap-3 mt-4">
        <div className="select-wrapper">
          <Form.Select
            onChange={(e) => props.setLimit(e.target.value)}
            aria-label="Select rows per page"
            style={{ boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.2)" }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>
        </div>
        <PaginatedItems
          itemsPerPage={props.limit}
          data={props.data}
          setPage={props.setPage}
          total={props.total}
        />
      </div>
    </div>
  );
};

export default TableShow;
