import { FileUploader } from './Components/FileUploader';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div >
      <FileUploader/>
      <ToastContainer />
    </div>
  );
}

export default App;
