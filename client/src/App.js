
import axios from 'axios';
import React , {useState} from 'react';
import './App.css';

function App() {

  const [code , setCode] = useState('');
  const [language , setLanguage] = useState('');
  const [output , setOutput] = useState('');

  const handleSubmit = async () => {
    
    const payload = {
      language,
      code,
    };
    try{
    const {data} = await axios.post("http://localhost:3003/run" , payload)
    setOutput(data.output);
    } catch ({response}){
      if(response) {
        const errMsg = response.data.err.stderr;
        setOutput(errMsg);
      }else {
        setOutput("Error connecting to server");
      }
    }
  }

  return (
    <div className="container">
      <h1>CODE ON COMPILER</h1>
      <div>
      <label>Language:</label>
        <select 
        value = {language}
        onChange={
          (e)=> {
            setLanguage(e.target.value);
            console.log(e.target.value);
          }
        }
        
        >
          <option value="cpp">C++</option>
          <option value="py">Python3</option>
        </select>
        </div>
      <br />
      <textarea  rows="20"  cols="75" value={code} onChange={(e) => setCode(e.target.value)}></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {output &&  <div className='outputbox'> 
      <p>{output}</p>
      </div>
     }
    </div>
  );
}

export default App;
