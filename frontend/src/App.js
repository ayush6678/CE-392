import { useState } from 'react';
import axios from 'axios';

function App() {

  const [count, setCount] = useState('');
  const [prediction, setPrediction] = useState(null); // Initialize as null
  const [selection, setSelection] = useState('');
  const [percentValue, setPercentValue] = useState(0);
  const [distribution, setDistribution] = useState('');

  const handleSelectChange = (event) => {
    setDistribution(event.target.value);
  };

  const handleRadioChange = (event) => {
    setSelection(event.target.value);
  };

  const handleSliderChange = (event) => {
    setPercentValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        parameter1: parseFloat(count),
        parameter2: selection,
        parameter3: selection === "percent" ? parseFloat(percentValue) : selection,
        parameter4: distribution
      });

      console.log(response.data);
      setPrediction(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1521405924368-64c5b84bec60?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
      }}
      className="min-h-screen flex flex-col items-center"
    >
      <h1 className="text-3xl text-center bg-slate-500 p-4 rounded-b-lg text-white">
        DroneMapping Error Predictor Model
      </h1>

      <div className='flex flex-col items-center shadow-md p-10 mt-5 bg-white bg-opacity-70 w-1/3 rounded-xl '>
        <div className='flex flex-col '>
          <p className='text-center text-lg font-medium'>Enter the number of GCP</p>
          <input
            type='number'
            className='border-2 input input-bordered max-w-xs p-2 m-4 rounded-md'
            onChange={(e) => setCount(e.target.value)}
            placeholder='Count Value'
          />

          <p className='text-center text-lg font-medium'>Select Drone Mode</p>
          <div className='text-left m-4'>
            <div>
              <input
                type="radio"
                id="percent"
                value="percent"
                checked={selection === 'percent'}
                onChange={handleRadioChange}
              />
              <label htmlFor="percent" className='m-2'>Percent Overlap</label>
            </div>

            {selection === 'percent' && (
              <div className=''>
                <input
                  className='h-1 m-4'
                  type="range"
                  min="0"
                  max="100"
                  value={percentValue}
                  onChange={handleSliderChange}
                />
                <p>Percent Value: {percentValue}</p>
              </div>
            )}

            <div>
              <input
                type="radio"
                id="rtk"
                value="rtk"
                checked={selection === 'rtk'}
                onChange={handleRadioChange}
              />
              <label htmlFor="rtk" className='m-2'>RTK</label>
            </div>
          </div>

          <p className='text-center text-lg font-medium'>Select Distribution type:</p>
          <div className='m-4'>
            <select
              className='rounded-md border-2 p-2 m-4'
              id="options"
              value={distribution}
              onChange={handleSelectChange}
            >
              <option value="">--Select--</option>
              <option value="Uniform-Distribution">Uniform Distribution</option>
              <option value="Half-of-Area">Half of Area</option>
              <option value="Corner-Distribution">Corner Distribution</option>
              <option value="Center-Distribution">Center Distribution</option>
            </select>
          </div>
        </div>

        <h2 className='text-md font-semibold mb-4'>Input Parameters:</h2>
        <div>
          {count && <p>Count value: {count}</p>}
        </div>
        <div>
          {selection && (
            <div>
              {selection === "percent" ? (
                <p className='text-center'>Drone Mode:<br /> Percent Overlap: {percentValue}</p>
              ) : (
                <p>Drone Mode: RTK</p>
              )}
            </div>
          )}
        </div>
        <div>
          {distribution && <p>Distribution Type: {distribution}</p>}
        </div>

        <button
          onClick={handleSubmit}
          className="relative rounded m-5 px-5 py-1 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative">Submit</span>
        </button>

        <div className=''>
          <p className='text-center text-md font-medium m-2'>Predicted Error:</p>
          {prediction && (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-600 uppercase bg-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-3">RMSEx</th>
                    <th scope="col" className="px-6 py-3">RMSEy</th>
                    <th scope="col" className="px-6 py-3">RMSEz</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50 text-black border-b">
                    <td className="px-6 py-4">{prediction.x}</td>
                    <td className="px-6 py-4">{prediction.y}</td>
                    <td className="px-6 py-4">{prediction.z}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
