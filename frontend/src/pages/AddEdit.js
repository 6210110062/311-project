import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./AddEdit.css";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  age: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, age } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:3001/user/${id}`);
    if (response.status === 200) {
      setState({ ...response.data[0] });
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const addUser = async (data) => {
    const response = await axios.post("http://localhost:3001/user", data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const updateUser = async (data, id) => {
    const response = await axios.put(`http://localhost:3001/user/${id}`, data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !age) {
      toast.error("กรุณากรอกข้อมูลให้ครบ");
    } else {
      if (!id) {
        addUser(state);
      } else {
        updateUser(state, id);
      }

      setTimeout(() => history.push("/"), 500);
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
          placeholder="Enter Name..."
          value={name}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email..."
          value={email}
          onChange={handleInputChange}
        />

        <label htmlFor="age">age</label>
        <input
          type="number"
          id="age"
          name="age"
          placeholder="Enter age ..."
          value={age}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Add"} />
      </form>
    </div>
  );
};

export default AddEdit;
