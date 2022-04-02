import React,{useState} from 'react'
import axios from 'axios'

function Quotes(){
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");
    function getQuotes(){
        axios.get('http://localhost:3001/hello',{crossdomain:true})
        .then(response=>{
            setText(response.data.text);
            setAuthor(response.data.author)
        })
    }
    return(
        <div>
            <button onClick={getQuotes}>
                Generate
            </button>
            <div>{text}</div>
            <div>{author}</div>
        </div>
    )
}
export default Quotes;