import axios from 'axios';
import {useState} from 'react';
import './style.css';
export const FileUploader = ()=>{
    const onInputChange = (e)=>{
       setFile(e.target.files[0])
    }
    const [file,setFile] = useState(null);

    const onSubmit = (e)=>{
        e.preventDefault();

        const data = new FormData();

        data.append('file',file);
        axios.post("//localhost:8000/upload",data).then((e)=>{
            console.log("Success1");
        })
        .catch((e)=>{
            console.log("Error ",e);
        })

    };

    return(
        <form method="post" action="#" id="#" onSubmit={onSubmit}>
           
              
              
              
        <div class="form-group files">
          <label>Upload Your File </label>
          <input type="file" 
            class="form-control"
            onChange = {onInputChange} 
            multiple=""/>
        </div>
        
        <button>Submit</button>
        </form>
        
    )
   
}