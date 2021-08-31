import React, { useState } from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";

// Components
import InputForm from "./components/InputForm";
import List from "./components/List";

function App() {
  const [userList, setUserList] = useState([]);

  return (
    <Container className="App py-3">
      <Row className="py-3">
        <Col style={{ textAlign: "center" }}>
          <h2>User System</h2>
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          <InputForm setUserList={setUserList} userList={userList} />
        </Col>
        <Col>
          <List userList={userList} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
