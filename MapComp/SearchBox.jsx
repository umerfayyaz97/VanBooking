// "use client";
// import React, { useState } from "react";
// import axios from "axios";
// import { FaMapMarkerAlt } from "react-icons/fa"; //

// const SearchBox = ({ label, onSelect }) => {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);

//   const fetchSuggestions = async (input) => {
//     try {
//       const response = await axios.get(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json`,
//         {
//           params: {
//             access_token:
//               "pk.eyJ1IjoidGFydW4yNTA2IiwiYSI6ImNsaDdwbzlvZTAwdWkzcW8xM3Bib3k4bzIifQ.KY0XQwjRpgkn7KYvdaXDbQ",
//             country: "AU",
//             autocomplete: true,
//             limit: 5,
//           },
//         }
//       );
//       setSuggestions(response.data.features);
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//       setSuggestions([]);
//     }
//   };

//   const handleChange = (e) => {
//     const inputValue = e.target.value;
//     setQuery(inputValue);
//     if (inputValue.length > 2) {
//       fetchSuggestions(inputValue);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleLocationSelect = (suggestion) => {
//     setQuery(suggestion.place_name);
//     setSuggestions([]);
//     onSelect({
//       name: suggestion.place_name,
//       lat: suggestion.center[1],
//       lon: suggestion.center[0],
//     });
//   };

//   return (
//     <div className="relative text-black">
//       <div className="flex items-center mb-3">
//         <FaMapMarkerAlt className="w-5 h-5 text-gray-700" />
//         <input
//           type="text"
//           value={query}
//           onChange={handleChange}
//           className="w-full h-10 pl-8 pr-4 border border-gray-300 rounded-md "
//           placeholder="Enter a location"
//         />
//       </div>
//       {suggestions.length > 0 && (
//         <ul className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
//           {suggestions.map((suggestion) => (
//             <li
//               key={suggestion.id}
//               className="px-4 py-2 cursor-pointer hover:bg-gray-200"
//               onClick={() => handleLocationSelect(suggestion)}
//             >
//               {suggestion.place_name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchBox;

"use client";
import { useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";

const SearchBox = ({ label = "", onSelect }) => {
  // Default value for label
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (input) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json`,
        {
          params: {
            access_token:
              "pk.eyJ1IjoidGFydW4yNTA2IiwiYSI6ImNsaDdwbzlvZTAwdWkzcW8xM3Bib3k4bzIifQ.KY0XQwjRpgkn7KYvdaXDbQ",
            country: "AU",
            autocomplete: true,
            limit: 5,
          },
        }
      );
      setSuggestions(response.data.features);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    if (inputValue.length > 2) {
      fetchSuggestions(inputValue);
    } else {
      setSuggestions([]);
    }
  };

  const handleLocationSelect = (suggestion) => {
    setQuery(suggestion.place_name);
    setSuggestions([]);
    onSelect({
      name: suggestion.place_name,
      lat: suggestion.center[1],
      lon: suggestion.center[0],
    });
  };

  return (
    <div className="relative text-black">
      <div className="flex items-center mb-3">
        <FaMapMarkerAlt className="w-5 h-5 text-gray-700" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          className="w-full h-10 pl-8 pr-4 border border-gray-300 rounded-md"
          placeholder={label || "Enter a location"} // Use label if provided
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleLocationSelect(suggestion)}
            >
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
