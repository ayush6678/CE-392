import { useState } from 'react';
import axios from 'axios';

function App() {

  const [count, setCount] = useState(0);
  const [percent, setPercent] = useState(0);
  const [prediction, setPrediction] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        parameter1: parseFloat(count),
        parameter2: parseFloat(percent),
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className=" h-screen bg-slate-200 flex flex-col items-center">
      <h1 className=" text-3xl text-center bg-slate-500 p-4 text-white">DroneMapping Error Predictor Model</h1>
      <div className='flex flex-col items-center shadow-2xl p-10 mt-5 bg-white w-96'>
        <div className=' flex flex-col '>
          <input
            className='input input-bordered w-full max-w-xs p-2 m-4'
            onChange={(e) => {
              setCount(e.target.value)
            }}
            placeholder='Count Value'
          ></input>

          <input className='input input-bordered w-full max-w-xs input-primary p-2 m-4'
            placeholder='Percent OverLap'
            onChange={(e) => {
              setPercent(e.target.value)
            }}></input>

        </div>

        <h2 className=' text-xl font-semibold mb-4'>Input Parameters:</h2>
        <div>
          Count value:{count}
        </div>
        <div>
          Percent Overlap:{percent}
        </div>
        <button
          onClick={handleSubmit}
          className="relative rounded m-5 px-5 py-1 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
        >
          <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span class="relative">Submit</span>
        </button>
        {prediction && <p>Predicted Error: {prediction}</p>}

      </div>
    </div>
  );
}

export default App;
