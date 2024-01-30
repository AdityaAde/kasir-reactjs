import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import { ListGroup } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

function Icon({ category }) {
  if (category === "Makanan") return <FontAwesomeIcon icon={faUtensils} />;
  if (category === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
  if (category === "Cemilan") return <FontAwesomeIcon icon={faCheese} />;
}

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/categories`)
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, chooseCategory } = this.props;
    return (
      <Col md={2} mt="2">
        <h4>
          <strong>Kategori</strong>
        </h4>
        <hr />
        <ListGroup>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.nama)}
                className={
                  chooseCategory === category.nama && "category-active"
                }
                style={{ cursor: "pointer" }}
              >
                <Icon category={category.nama}></Icon> <h5>{category.nama}</h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
