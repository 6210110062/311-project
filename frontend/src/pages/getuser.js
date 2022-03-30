import axios from 'axios'
import React, { UseState } from "react";

function getUser(){
      const [ userList , setuserList ] = UseState([]);
      const [ name, setName ] = UseState(0);
      const [ email, setEmail ] = UseState("");
      const [ contact, setContact ] = UseState("");

    const getallUser = () =>{
        axios.get('http://localhost:3001/addUser').then((response)=>{
            setuserList(response.data);
        });
    }
   <div>
        <button onClick={getallUser}>show userList</button>
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
}export default getUser;

  