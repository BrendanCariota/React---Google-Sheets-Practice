import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Modal,
  Button,
  Form,
  FloatingLabel,
} from "react-bootstrap";

const List = ({ userList, setUserList }) => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [id, setId] = useState("");
  const [indexToUpdate, setIndexToUpdate] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (
    currentId,
    currentName,
    currentCountry,
    currentPosition,
    currentSalary,
    index
  ) => {
    setShow(true);
    setName(currentName);
    setCountry(currentCountry);
    setPosition(currentPosition);
    setSalary(currentSalary);
    setId(currentId);
    setIndexToUpdate(() => index + 2);
  };

  const updateUserList = async () => {
    const { data } = await axios.get("http://localhost:5000/user");
    if (!data.values) {
      setUserList([]);
    } else {
      setUserList(data.values);
      setSuccess(false);
    }
  };

  function updateUser() {
    axios.post("http://localhost:5000/user/update", {
      indexToUpdate,
      id,
      name,
      country,
      position,
      salary,
    });

    handleClose();
    setSuccess(true);
  }

  const deleteUser = async () => {
    axios
      .post("http://localhost:5000/user/delete", {
        indexToUpdate,
      })
      .then((res) => console.log(res.data.data.replies));
    handleClose();
    setSuccess(true);
  };

  useEffect(() => {
    updateUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <Container>
      <h2>User List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Country</th>
            <th>Position</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr
              key={user[0]}
              onClick={() =>
                handleShow(user[0], user[1], user[2], user[3], user[4], index)
              }
            >
              <td>{user[0]}</td>
              <td>{user[1]}</td>
              <td>{user[2]}</td>
              <td>{user[3]}</td>
              <td>{user[4]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateUser}>
            <FloatingLabel
              controlId="floatingName"
              label="Name"
              className="my-3"
            >
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingCountry"
              label="Country"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPosition"
              label="Position"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingSalary"
              label="Salary"
              className="mb-3"
            >
              <Form.Control
                type="text"
                value={salary}
                placeholder="Salary"
                onChange={(e) => setSalary(e.target.value)}
              />
            </FloatingLabel>
          </Form>
          <div className="d-grid gap-2">
            <Button variant="danger" size="lg" onClick={deleteUser}>
              Delete User
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default List;
