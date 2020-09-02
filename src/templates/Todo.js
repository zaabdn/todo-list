import Header from "../components/Header";
import Card from "../components/Card";
import { Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";

export default function Todo() {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return (
    <React.Fragment>
      <Container>
        <Header title="Todo" />
        {token ? (
          <main>
            <Card />
          </main>
        ) : (
          <div></div>
        )}
      </Container>
    </React.Fragment>
  );
}
