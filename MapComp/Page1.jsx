"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import useStore from "../app/store/store";
import SearchBox from "./SearchBox";
// import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { FaTag, FaUser, FaInfoCircle } from "react-icons/fa";
// import "tailwindcss";
// import "tailwindcss/tailwind.css";

const Page1 = ({ setComponent }) => {
  // Zustand store state and actions
  const {
    pickup,
    destination,
    stop,
    date,
    time,
    additionalOptions,
    vehicleType,
    vehicleDetails,
    setPickup,
    setDestination,
    setStop,
    setDate,
    setTime,
    setVehicleType,
    setVehicleDetails,
    setDistances,
    setAdditionalOptions,
  } = useStore();

  const [showAllOptions, setShowAllOptions] = useState(false);

  const options = [
    { name: "Hourly Bookings", price: "$10" },
    { name: "Add More Vehicles", price: "$15" },
    { name: "Return Trip", price: "$20" },
    { name: "Party Van", price: "$25" },
    { name: "Luggage Trailer", price: "$30" },
    { name: "Child Seat", price: "$35" },
    { name: "Disability Seat Driver", price: "$35" },
  ];

  const vehicles = {
    smallVan: {
      name: "Small Van",
      image: "/Vito1.png",
      passengerLimit: "8 Seater",
      averageCostPerPerson: "$15",
      minimumPassengers: 4,
      cardDetails: "Mercedes-Benz V-Class or Similar",
    },
    largeVan: {
      name: "Large Van",
      image: "/2.png",
      passengerLimit: "10 Seater",
      averageCostPerPerson: "$20",
      minimumPassengers: 2,
      cardDetails: "Toyota Hi- Ace or Similar",
    },
    bus: {
      name: "Bus",
      image: "/coaster.png",
      passengerLimit: "30 Seater",
      averageCostPerPerson: "$10",
      minimumPassengers: 3,
      cardDetails: "Toyota Coaster or Similar",
    },
  };

  const handleOptionChange = (option) => {
    if (additionalOptions.includes(option.name)) {
      setAdditionalOptions(
        additionalOptions.filter((opt) => opt !== option.name)
      );
    } else {
      setAdditionalOptions([...additionalOptions, option.name]);
    }
  };

  const toggleOptions = () => {
    setShowAllOptions(!showAllOptions);
  };

  useEffect(() => {
    const calculateRoute = async () => {
      if (pickup && destination) {
        const response = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup.lon},${
            pickup.lat
          };${destination.lon},${destination.lat}${
            stop ? `;${stop.lon},${stop.lat}` : ""
          }`,
          {
            params: {
              access_token:
                "pk.eyJ1IjoidGFydW4yNTA2IiwiYSI6ImNsaDdwbzlvZTAwdWkzcW8xM3Bib3k4bzIifQ.KY0XQwjRpgkn7KYvdaXDbQ",
              geometries: "geojson",
            },
          }
        );
        const data = response.data;
        const route = data.routes[0];
        const distances = {
          distanceStartToEnd: route.distance / 1000, // Convert to km
          distanceStartToStop: stop ? route.legs[0].distance / 1000 : 0,
          distanceStopToEnd: stop ? route.legs[1].distance / 1000 : 0,
        };
        setDistances(distances);
      }
    };

    calculateRoute();
  }, [pickup, destination, stop, setDistances]);

  const handleVehicleSelection = (type) => {
    setVehicleType(type);
    setVehicleDetails(vehicles[type]);
  };

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div className="">
      <div className="max-w-md p-4 mx-auto bg-white shadow-md ">
        <h2 className="text-2xl font-bold text-gray-700 ">Book a Ride</h2>
        <div className="mb-4">
          <p className="text-sm text-gray-700">
            {formattedDate || "No date selected"}
          </p>
          <p className="text-sm text-gray-700">{time}</p>
        </div>
        <div className="mb-1 ">
          <SearchBox label="" onSelect={setPickup} />
        </div>
        <div className="mb-4">
          <SearchBox label="" onSelect={setDestination} />
        </div>

        {/* STOP PART */}
        <div className="mb-4 ">
          <button
            onClick={() => setStop(stop ? null : { lat: 0, lon: 0 })}
            className="flex items-center mb-4 text-sm font-bold text-yellow-600 "
          >
            <svg
              className="w-4 h-4 mr-1 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="10"
                cy="10"
                r="9"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                fill="currentColor"
                d="M13 9H11V7A1 1 0 0 0 9 7V9H7A1 1 0 0 0 7 11H9V13A1 1 0 0 0 11 13V11H13A1 1 0 0 0 13 9Z"
              />
            </svg>
            {stop ? "Remove Stop" : "Add Stop"}
          </button>
          {stop && <SearchBox label="Stop Location" onSelect={setStop} />}
        </div>

        <p className="text-2xl font-bold text-gray-700">Select Date & Time</p>
        <p className="mb-2 text-xs text-gray-700">
          Trip must be selected two days in advance
        </p>
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {/* <FaCalendarAlt className="absolute w-5 h-5 text-gray-400 pointer-events-none left-3 top-2" /> */}
              <input
                type="date"
                className="w-full p-2 text-black border border-gray-300 rounded"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="relative">
              {/* <FaClock className="absolute w-5 h-5 text-gray-400 pointer-events-none left-3 top-2" /> */}
              <input
                type="time"
                className="w-full p-2 text-black border border-gray-300 rounded"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Vehicle Selection */}

        <div className="mb-4">
          <p className="mb-4 text-2xl font-bold text-gray-700">
            Select Vehicle Type
          </p>
          <div className="flex items-center space-x-2">
            <button
              className={`flex flex-col  justify-center w-1/3 p-2 h-30 rounded-lg  ${
                vehicleType === "smallVan"
                  ? "bg-white border border-yellow-500"
                  : "bg-gray-200 border border-gray-300"
              }`}
              onClick={() => handleVehicleSelection("smallVan")}
            >
              <Image
                src={vehicles["smallVan"].image}
                alt={vehicles["smallVan"].name}
                height={70}
                width={70}
                layout="fixed"
                className="mt-3"
              />
              <p className="mt-2 text-sm text-black">
                {vehicles["smallVan"].name}
              </p>
              <p className="text-gray-600 text-xxxs">
                {vehicles["smallVan"].passengerLimit}
              </p>
              <p className="text-xs font-bold text-black">
                {vehicles["smallVan"].averageCostPerPerson}
              </p>
            </button>
            <button
              className={`flex flex-col  justify-center w-1/3 p-2 h-30 rounded-lg ${
                vehicleType === "largeVan"
                  ? "bg-white border border-yellow-500"
                  : "bg-gray-200 border border-gray-300"
              }`}
              onClick={() => handleVehicleSelection("largeVan")}
            >
              <Image
                src={vehicles["largeVan"].image}
                alt={vehicles["largeVan"].name}
                height={70}
                width={70}
                layout="fixed"
              />
              <p className="mt-2 text-sm text-black">
                {vehicles["largeVan"].name}
              </p>
              <p className="text-gray-600 text-xxxs">
                {vehicles["largeVan"].passengerLimit}
              </p>
              <p className="text-xs font-bold text-black">
                {vehicles["largeVan"].averageCostPerPerson}
              </p>
            </button>
            <button
              className={`flex flex-col  justify-center w-1/3 p-2 h-30 rounded-lg ${
                vehicleType === "bus"
                  ? "bg-white border border-yellow-500"
                  : "bg-gray-200 border border-gray-300"
              }`}
              onClick={() => handleVehicleSelection("bus")}
            >
              <Image
                src={vehicles["bus"].image}
                alt={vehicles["bus"].name}
                height={70}
                width={70}
                layout="fixed"
              />
              <p className="mt-2 text-sm text-black">{vehicles["bus"].name}</p>
              <p className="text-gray-600 text-xxxs">
                {vehicles["bus"].passengerLimit}
              </p>
              <p className="text-xs font-bold text-black">
                {vehicles["bus"].averageCostPerPerson}
              </p>
            </button>
          </div>

          {vehicleType && (
            <div className="w-full p-1 mt-2 text-black border-yellow-600 rounded-md text-blackborder bg-yellow-500/20">
              <p className="flex items-center justify-between font-bold rounded-t-lg text-md">
                {vehicleDetails.cardDetails}
                <Image
                  src={vehicleDetails.image}
                  alt={vehicleDetails.name}
                  width={100}
                  height={100}
                />
              </p>
              <div className="">
                <p className="flex items-center text-sm">
                  <FaTag className="mr-1 text-yellow-600" />
                  <strong className="mr-1">
                    {vehicleDetails.averageCostPerPerson}
                  </strong>
                  <span className="text-xxxs">Per Person</span>
                </p>
                <p className="flex text-sm ">
                  <FaUser className="mr-1" />
                  <span>{vehicleDetails.passengerLimit}</span>
                </p>
                <p className="flex items-center text-sm">
                  Minimum {vehicleDetails.minimumPassengers} Passengers
                  <FaInfoCircle
                    className="ml-1 text-sm text-yellow-600"
                    style={{ width: "0.8em", height: "0.8em" }}
                  />
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="mb-4">
          <p className="text-2xl font-bold text-gray-700">
            Additional Services
          </p>
          <div className="p-2 mt-4 bg-gray-100 rounded-md">
            {options
              .slice(0, showAllOptions ? options.length : 3)
              .map((option, index) => (
                <div key={option.name}>
                  <div className="flex items-center justify-between p-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={additionalOptions.includes(option.name)}
                        onChange={() => handleOptionChange(option)}
                        className="w-4 h-4 text-yellow-200 border-gray-300 rounded-full"
                      />
                      <span className="text-sm text-black">{option.name}</span>
                    </label>
                    <span className="text-sm text-gray-600">
                      {option.price}
                    </span>
                  </div>
                  {index < options.length - 1 && (
                    <hr className="border-gray-400" />
                  )}
                </div>
              ))}
            {!showAllOptions ? (
              <button
                onClick={toggleOptions}
                className="w-full py-1 text-center text-black text-xxxs "
              >
                See all
              </button>
            ) : (
              <button
                onClick={toggleOptions}
                className="w-full py-1 text-center text-black text-xxxs "
              >
                Show Less
              </button>
            )}
          </div>
        </div>

        {/* Next Button */}
      </div>
      <div className="justify-center text-center bg-white">
        <button
          onClick={() => setComponent(2)}
          className="p-2 px-4 font-bold text-black bg-yellow-500 w-80"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page1;
