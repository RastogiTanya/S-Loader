import axios from 'axios';
import {useState} from 'react';
import {toast} from 'react-toastify'
import './style.css';

const EXTENSIONS = ['xlsx','xls','csv'];

export const FileUploader = ()=>{
    const onInputChange = (e)=>{
        setEnteredText(e.target.value)
       setFiles(e.target.files)
    }
    const [files,setFiles] = useState([]);
    const [enteredText, setEnteredText] = useState(''); 

    const getExtension=(file)=>{
        const parts = file.name.split('.');
        const extension = parts[parts.length-1];
        // console.log(extension);
        return EXTENSIONS.includes(extension)
    }

    const onSubmit = (e)=>{
        e.preventDefault();

        const data = new FormData();
        var ext = true;
        for(let i =0;i<files.length;i++){
            ext = ext && getExtension(files[i])
        }
        if(ext && files.length){
            for(let i =0;i<files.length;i++){
                data.append('file',files[i]);
            }
    
            
            axios.post("//localhost:8000/upload",data).then((res)=>{
                toast.success("Upload Success");
               
            })
            .catch((e)=>{
                // console.log("Error ",e);
                toast.error("Upload error")
            })
        }
        else{
            alert('Invalid File Format')
        }
        setEnteredText('');
    };

    return(
        <form method="post" action="#" id="#" onSubmit={onSubmit}>
           
              
              
              
        <div class="form-group files">
          <label>Upload Your File </label>
          <input type="file" 
          
            class="form-control"
            onChange = {onInputChange} 
            value={enteredText}
            multiple/>
        </div>
        
        <button>Submit</button>
        </form>
        
    )
   
}