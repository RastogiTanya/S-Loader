import { FileUploader } from './Components/FileUploader';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (<div>
    <div className='flex-col justify-around align-center mt-10'>
      <div><FileUploader/></div>
    </div>
    <div><ToastContainer /></div>
  </div>);
  
}

export default App;
