import React, { Component } from "react";
import { Col, ListGroup, Row, Badge } from "react-bootstrap";
import { numberWithCommas } from "../utils/format";

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
            {carts.map((cart) => (
              <ListGroup.Item key={cart.id}>
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill bg="success">
                        {cart.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{cart.product.nama}</h5>
                    <p></p>
                  </Col>
                  <Col>
                    <strong className="float-right">
                      <p>Rp.{numberWithCommas(cart.total_harga)}</p>
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    );
  }
}
