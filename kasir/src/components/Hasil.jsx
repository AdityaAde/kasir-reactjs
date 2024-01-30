import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";

export default class Hasil extends Component {
  render() {
    const { carts } = this.props;
    console.log({ clog: carts });
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {carts.length !== 0 && (
          <ListGroup variant="flush">
            {carts.map((value) => (
              <ListGroup.Item key={value.id}>
                {value.product.nama}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    );
  }
}
