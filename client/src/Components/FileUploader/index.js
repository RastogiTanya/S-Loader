import {useState} from 'react';
import {toast} from 'react-toastify'
import './style.css';
import FileDetails from '../FileDetails';

const EXTENSIONS = ['xlsx','xls','csv'];

export const FileUploader = ()=>{
    
    const [files,setFiles] = useState([]);
    const [enteredText, setEnteredText] = useState('');
    
    const onInputChange = (e)=>{
        if(!(e.target.files.length)) return; 
        if(!(getExtension(e.target.files[0]))) {
            toast.error("Upload error");
            return;
        }
        setEnteredText(e.target.value);
        setFiles((files) => [...files, e.target.files[0]]);
    }

    const getExtension=(file)=>{
        const parts = file.name.split('.');
        const extension = parts[parts.length-1];
        // console.log(extension);
        return EXTENSIONS.includes(extension)
    }

    

    return(
        <div>
            <form className="flex justify-center align-middle" method="post" action="#" id="#">
                <div>
                    <label>Upload Your File</label>
                </div>
                <div>
                    <input type="file" 
                    className="ml-5 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                    onChange = {onInputChange} 
                    value={enteredText}
                    multiple/>
                </div>
                <div className='flex flex-col'>{ files.length === 0?<div></div>:
                    files.map((file, idx) => {
                        return (<div key={idx}>
                            <FileDetails file={file} />
                        </div>)
                    })
                }</div>
            </form>
        </div>
    )
}