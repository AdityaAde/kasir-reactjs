import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import { numberWithCommas } from "../utils/format";

function TotalOrders(props) {
  const navigate = useNavigate();

  const submitTotalPayments = (totalPayments) => {
    const orders = {
      total_bayar: totalPayments,
      menus: props.carts,
    };

    axios.post(API_URL + "/orders", orders).then((_) => {
      navigate("/success");
    });
  };

  const totalPayments = props.carts.reduce(function (result, item) {
    return result + item.total_harga;
  }, 0);

  return (
    <div className="fixed-bottom">
      <Row className="mb-2">
        <Col md={{ span: 3, offset: 9 }} className="px-4">
          {" "}
          <h4>
            Total Harga:{" "}
            <strong className="float-right mr-2">
              Rp. {numberWithCommas(totalPayments)}
            </strong>
          </h4>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => submitTotalPayments(totalPayments)}>
              <FontAwesomeIcon icon={faShoppingCart} />
              <strong> Bayar</strong>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default TotalOrders;
