import React, { useState, useEffect } from "react";
import { Container, Button, Table } from "react-bootstrap";
import axios from "axios";

const List = ({ userList }) => {
  // const [userList, setUserList] = useState([]);

  const updateUserList = async () => {
    // const { data } = await axios.get("http://localhost:5000/user");
    // setUserList(data.values);
  };

  // useEffect(() => {
  //   updateUserList();
  // }, []);

  return (
    <Container>
      <h2>User List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Position</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user[0]}>
              <td>{user[0]}</td>
              <td>{user[1]}</td>
              <td>{user[2]}</td>
              <td>{user[3]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <div className="d-grid gap-2">
        <Button variant="success" size="lg" type="submit">
          Add User
        </Button>
      </div> */}
    </Container>
  );
};

export default List;