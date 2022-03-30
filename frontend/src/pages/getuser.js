import Axios from 'axios'
import { useState } from 'react'

function App(){
    const [ userList , setUserList ] = useState([]);

    const getUser = () =>{
        Axios.get('http://localhost:3001/addUser').then((response)=>{
            setUserList(response.data);
        });
    }
      <div>
        <div>show</div>
        {userList.map((val,key)=>{
        return(      
        <div>
                <p>name:{val.name}</p>
                <p>email:{val.email}</p>
                <p>contact:{val.contact}</p>
        </div>
        )
        })}
    );</div>
}

  