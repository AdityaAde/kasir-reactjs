import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
  const navigate = useNavigate();
  return (
    <div className="text-center mt-4">
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
