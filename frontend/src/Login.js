
import FacebookLogin from "react-facebook-login";
import React from "react";
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

function Login() {

    return (
        <div>
            <br></br>
            <h1>Login with Facebook</h1>
            <br></br>
            <FacebookLogin
                appId="684445912999982"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook} />
        </div>

    );
}
export default Login;


