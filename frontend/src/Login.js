import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";


export default class Facebook extends Component {
    state = {
        isLoggedIn: false,
        userID: "",
        name: "",
        email: "",
        picture: ""
    };

    responseFacebook = response => {
        // console.log(response);

        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        });
    };

    componentClicked = () => console.log("clicked");

    render() {
        let fbContent;

        if (this.state.isLoggedIn) {
            fbContent = (
                <div
                    style={{
                        width: "500px",
                        margin: "auto",
                        background: "#e0f9ff",
                        padding: "60px"
                    }}
                >
                    <img src={this.state.picture} alt={this.state.name} />
                    <h2>Welcome {this.state.name}</h2>
                    <form>
                        <fieldset>
                            <legend>ADD POST</legend>
                            <input type="text" name="post" />
                            <button>SUBMIT</button>
                        </fieldset>
                    </form>
                </div>
            );
        } else {
            fbContent = (
                <FacebookLogin
                    appId="1111795056055256"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                />
            );
        }

        return <div>{fbContent}</div>;

    }
}