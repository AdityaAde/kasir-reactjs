import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, SuccessPage } from "./pages/pages";
import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/success" element={<SuccessPage />}></Route>
        </Routes>
      </Router>
    )
  }
}
