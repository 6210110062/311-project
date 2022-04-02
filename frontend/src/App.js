
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Header";
import About from "./pages/About";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import Sample from "./pages/Sample";
import View from "./pages/View";


import FacebookLogin from "react-facebook-login";

import axios from 'axios';

axios.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem('access_token')
  if (token)
    config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function (err) {
  return Promise.reject(err)
})

const responseFacebook = async (response) => {
  if (response.accessToken) {
    console.log('log in with accessToken= ' + response.accessToken)
    let result = await axios.post('http://localhost:3001/api/login', {
      token: response.accessToken
    })
    console.log(result.data)
    sessionStorage.setItem('access_token', result.data.access_token)
  }

}

function App() {
  return (

    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer position="top-center" />
        <FacebookLogin
          appId="684445912999982"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook} />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/add" component={AddEdit} />
          <Route path="/sample" component={Sample} />
          <Route path="/update/:id" component={AddEdit} />
          <Route path="/view/:id" component={View} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;