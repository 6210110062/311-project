import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./AddEdit.css";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);


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

  
  

  const updateUser = async (data, id) => {
    const response = await axios.put(`http://localhost:3001/user/${id}`, data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const [ userList , setUserList ] = useState([]);
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ contact, setContact ] = useState("");
  const getUser = () =>{
      axios.get('http://localhost:3001/addUser').then((response)=>{
          setUserList(response.data);
      });
  }
  const addUser = async (data) => {
    const response = await axios.post("http://localhost:3001/addUser",{
      name: name,
      email: email,
      contact: contact
      }).then(()=>{
        setUserList([...userList,{
          name: name,
          email: email,
          contact: contact
        }])
      })
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please provide value in each input field");
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
          onChange={(event)=>{
            setName(event.target.value)
          }}
        />
        
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email..."
          value={email}
           onChange={(event)=>{
            setEmail(event.target.value)
          }}
        />

        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter Contact No. ..."
          value={contact}
           onChange={(event)=>{
            setContact(event.target.value)
          }}
        />

        <input type="submit" value={id ? "Update" : "Add"} />
      </form>
      <div>
        <button onClick={getUser}>show userList</button>
        {userList.map((val,key)=>{
          return(
            <div>
              <p>name:{val.name}</p>
              <p>email:{val.email}</p>
              <p>contact:{val.contact}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
};export default AddEdit;
