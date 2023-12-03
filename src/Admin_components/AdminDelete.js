import React from 'react'
import {useState} from 'react'
import axios from 'axios';
import '../css/AdminUpload.css'

const AdminDelete = () => {

    const[name,setName] = useState();
    const deleteTermek = () => {
        axios.post(`http://localhost:8888/delete/${name}`) 
          .then((response) => {
            console.log("SIKER");
            console.log(response.data);
          })
          .catch((error) => {
            console.log("ERRRRROR");
            console.error(error);
          });
      };
  

  return (
    <><meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /><div className='acontainer'>
      <div className="aheader">
        <div className="text">Töröljön egy terméket!</div>
        <div className="underline"></div>
      </div>
      <form>
        <div className="inputs">
          <label>Adja meg a termék nevét:</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)} />
          <div className="button-container">
            <button onClick={deleteTermek}>Törlés</button>
          </div>
        </div>
      </form>
    </div></>
  )
}

export default AdminDelete;
