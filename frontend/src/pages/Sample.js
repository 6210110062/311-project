import React, { useState } from "react";
import { useHistory, } from "react-router-dom";
import axios from "axios";
import "./AddEdit.css";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  age: "",
};

const Sample = () => {
  const [state, setState] = useState(initialState);

  const { name, email, age } = initialState;

  const history = useHistory();
  const addage = async (data) => {
    const response = await axios.post("http://localhost:3001/user", data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const handleInputChange = (e) => {
    console.log(e.target.name);
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !age) {
      toast.error("กรุณากรอกข้อมูลให้ครบ");
    } else {
      addage(state);
      history.push("/");
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name ..."
          onChange={handleInputChange}
          value={name}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email ..."
          onChange={handleInputChange}
          value={email}
        />
        <label htmlFor="age">age</label>
        <input
          type="number"
          id="age"
          name="age"
          placeholder="Your age No. ..."
          onChange={handleInputChange}
          value={age}
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default Sample;
