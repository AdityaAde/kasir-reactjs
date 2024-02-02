import axios from "axios";
import React, { useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";

function SuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/carts`)
      .then((res) => {
        const carts = res.data;
        carts.map((cart) => {
          return axios
            .delete(API_URL + "/carts/" + cart.id)
            .then((res) => {
              console.log("res");
            })
            .catch((err) => {
              console.log(`Error ${err}`);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="text-center mt-4">
      <Image src="assets//images/success.png" width={500}></Image>
      <h2>Sukses Order</h2>
      <p>Terimakasih sudah memesan!</p>
      <Button variant="primary" onClick={() => navigate("/")}>
        {" "}
        Kembali
      </Button>
    </div>
  );
}

export default SuccessPage;
