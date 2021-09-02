import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, FloatingLabel, Form, Toast } from "react-bootstrap";

const InputForm = ({ setUserList, userList }) => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleAlert = () => setAlert(!alert);

  const addUser = async (e) => {
    e.preventDefault();
    setSuccess(true);
    await axios.post("http://localhost:5000/user", {
      name,
      country,
      position,
      salary,
    });
  };

  const updateUserList = async () => {
    const { data } = await axios.get("http://localhost:5000/user");
    if (!data.values) {
      setUserList([]);
    } else {
      setUserList(data.values);
    }
  };

  if (success) {
    updateUserList();
    setAlert(true);
    setName("");
    setCountry("");
    setPosition("");
    setSalary(0);
    setSuccess(false);
  }

  useEffect(() => {
    updateUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <Container>
      <h2>Add User</h2>
      <Toast show={alert} onClose={toggleAlert} delay={2500} autohide>
        <Toast.Header closeButton={false}>
          <strong>User Created</strong>
        </Toast.Header>
        <Toast.Body>You've added a new user</Toast.Body>
      </Toast>
      <Form onSubmit={addUser}>
        <FloatingLabel controlId="floatingName" label="Name" className="my-3">
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
            type="number"
            value={salary}
            placeholder="Salary"
            onChange={(e) => setSalary(e.target.value)}
          />
        </FloatingLabel>
        <div className="d-grid gap-2">
          <Button variant="success" size="lg" type="submit">
            Add User
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default InputForm;
