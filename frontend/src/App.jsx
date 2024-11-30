import React, { useState } from 'react';
import { MapPinIcon, HomeIcon, CurrencyDollarIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

const App = () => {
  const [location, setLocation] = useState('Mumbai');
  const [flatType, setFlatType] = useState('Flats');
  const [rent, setRent] = useState('Price');
  const [loading, setloading] = useState(false);
  const [flatsData, setFlatsData] = useState([]);
  
  const hanldeSearch = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
        const result = await axios.post('http://localhost:3000/search', {
        location,
        flatType,
        rent,
      });
      setFlatsData(result.data);
      setloading(false);
      console.log(result.data);
    } catch (error) {
      console.log(error);
      setloading(false);
      console.error(error.response?.data || error.message);
      alert("An error occurred while sending the data to the server. Please check the console.");
    }
  }

  return (
    <div className="flex justify-center items-center py-5">
    <div className="flex items-center bg-white border-1 border-gray-300 rounded-full p-3 shadow-2xl w-full max-w-4xl relative top-64">
      
      {/* Location Dropdown */}
      <div className="relative flex-1 flex items-center space-x-2 px-3">
        <MapPinIcon className="h-6 w-6 text-purple-600" />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full appearance-none bg-transparent focus:outline-none cursor-pointer"
        >
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Pune">Pune</option>
        </select>
        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
      </div>

      {/* Separator */}
      <div className="h-6 border-l border-gray-300"></div>

      {/* Flat Type Dropdown */}
      <div className="relative flex-1 flex items-center space-x-2 px-3">
        <HomeIcon className="h-6 w-6 text-purple-600" />
        <select
          value={flatType}
          onChange={(e) => setFlatType(e.target.value)}
          className="w-full appearance-none bg-transparent focus:outline-none cursor-pointer"
        >
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
          <option value="Custom">Custom</option>
        </select>
        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
      </div>

      {/* Separator */}
      <div className="h-6 border-l border-gray-300"></div>

      {/* Price Dropdown */}
      <div className="relative flex-1 flex items-center space-x-2 px-3">
        <CurrencyDollarIcon className="h-6 w-6 text-purple-600" />
        <select
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          className="w-full appearance-none bg-transparent focus:outline-none cursor-pointer"
        >
          <option value="Price">Price</option>
          <option value="10k-20k">10k-20k</option>
          <option value="20k-30k">20k-30k</option>
          <option value="Above 30k">Above 30k</option>
        </select>
        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
      </div>

      {/* Search Button */}
      <button onClick={hanldeSearch} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-full ml-3">
        Search
      </button>
    </div>



    <div className="flex flex-col items-center py-5">
    {/* Search Bar Component */}
    {/* ... */}

    {/* Display Search Results */}
    <div className="mt-10 w-full max-w-4xl">
      {loading ? (
        <p>Loading...</p>
      ) : flatsData.length > 0 ? (
        <ul>
          {flatsData.map((property, index) => (
            <li key={index} className="border p-4 mb-2 rounded-lg shadow-md">
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Flat Type:</strong> {property.flatType}</p>
              <p><strong>Price:</strong> ₹{property.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  </div>

  </div>
  )
}

export default App