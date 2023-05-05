import axios from "axios";
import React, { useEffect, useState } from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

const DataTableComponent = () => {
  const [users, setUsers] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user/all");
      setUsers(response?.data?.users);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      $(document).ready(function () {
        $("#userTable").DataTable();
      });
    }
  }, [users]);

  const getFullAddress = (address, city, state, country) => {
    if (address == "" && state == "" && city == "" && country == "") {
      return "-";
    }
    const fullAddress = `${address == "" ? "" : `${address},`} ${
      city == "" ? "" : `${city},`
    } ${state == "" ? "" : `${state},`} ${country == "" ? "" : `${country}`}
    `;

    return fullAddress;
  };

  const userTableData = users?.map((user) => (
    <tr key={user._id} style={{ textAlign: "left" }}>
      <td style={{ padding: "10px 0px" }}>{user.name}</td>
      <td style={{ padding: "10px 0px" }}>{user.age}</td>
      <td style={{ padding: "10px 0px", textTransform: "capitalize" }}>
        {user.sex}
      </td>
      <td style={{ padding: "10px 0px" }}>
        {user.mobile == "" ? "-" : user.mobile}
      </td>
      <td style={{ padding: "10px 0px" }}>
        {getFullAddress(user.address, user.city, user.state, user.country)}
      </td>
      <td style={{ padding: "10px 0px" }}>
        {user.govId.idValue == "" ? "-" : user.govId.idValue}
      </td>
      <td style={{ padding: "10px 0px" }}>
        {user.guardian.name == "" ? "-" : user.guardian.name}
      </td>
      <td style={{ padding: "10px 0px" }}>
        {user.nationality == "" ? "-" : user.nationality}
      </td>
    </tr>
  ));
  return (
    <div
      style={{
        width: "96%",
        margin: "10px auto",
      }}
    >
      <table
        id="userTable"
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Govt ID</th>
            <th>Parent Name</th>
            <th>Nationality</th>
          </tr>
        </thead>

        <tbody>{userTableData}</tbody>
      </table>
    </div>
  );
};

export default DataTableComponent;
