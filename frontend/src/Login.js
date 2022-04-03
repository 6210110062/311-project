import FacebookLogin from "react-facebook-login";
import React, { useState } from "react";
import axios from 'axios';
import { Card, Image } from 'react-bootstrap';

axios.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem('access_token')
    if (token)
        config.headers['Authorization'] = `Bearer ${token}`
    return config
}, function (err) {
    return Promise.reject(err)
})

function Login() {
    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState('');

    const responseFacebook = async (response) => {
        setData(response);
        setPicture(response.picture.data.url);
        if (response.accessToken) {
            console.log('log in with accessToken= ' + response.accessToken)
            let result = await axios.post('http://localhost:3001/api/login', {
                token: response.accessToken
            })
            console.log(result.data)
            sessionStorage.setItem('access_token', result.data.access_token)
            setLogin(true);
        } else {
            setLogin(false);
        }

    }

    return (<div class="container">
        <Card style={{ width: '600px' }}>
            <Card.Header>


                {!login &&


                    <FacebookLogin
                        appId="1111795056055256"
                        autoLoad={true}
                        fields="name,email,picture"
                        scope="public_profile,user_friends"
                        callback={responseFacebook}
                        icon="fa-facebook" />

                }
                {login &&
                    <Image src={picture} roundedCircle />
                }
            </Card.Header>
            {login &&
                <Card.Body>
                    <Card.Title><p>Welcome</p></Card.Title>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>

                        {data.email}
                    </Card.Text>
                </Card.Body>
            }
        </Card>
    </div>
    );
}

export default Login;