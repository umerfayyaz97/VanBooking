"use client";
import React, { useState } from "react";
import useStore from "../app/store/store";
import { FaMinusCircle, FaPlusCircle, FaArrowLeft } from "react-icons/fa";

const Page2 = ({ setComponent }) => {
  const setOccasion = useStore((state) => state.setOccasion);
  const setPassengers = useStore((state) => state.setPassengers);
  const setContact = useStore((state) => state.setContact);
  const setDriverNote = useStore((state) => state.setDriverNote);
  const setPaymentDetails = useStore((state) => state.setPaymentDetails);

  const occasion = useStore((state) => state.occasion);
  const passengers = useStore((state) => state.passengers);
  const contact = useStore((state) => state.contact);
  const driverNote = useStore((state) => state.driverNote);
  const paymentDetails = useStore((state) => state.paymentDetails);

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showOccasions, setShowOccasions] = useState(false);

  const handleContactChange = (field, value) => {
    setContact({ ...contact, [field]: value });
  };

  const incrementPassengers = () => {
    setPassengers(passengers + 1);
  };

  const decrementPassengers = () => {
    if (passengers > 0) {
      setPassengers(passengers - 1);
    }
  };

  const handlePassengersChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setPassengers(isNaN(value) ? 0 : Math.max(0, value));
  };

  return (
    <div>
      <div className="w-full p-4 text-black bg-white shadow-lg">
        <button onClick={() => setComponent(1)} className="mb-4 text-gray-700">
          <FaArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="mb-4 text-2xl font-bold text-gray-700">
          Booking Details
        </h1>

        <h2 className="mb-2 text-xl font-semibold text-gray-700">
          Select Occasion
        </h2>
        <div className="relative mb-4">
          <button
            className="w-full p-2 text-center bg-gray-200 rounded"
            onClick={() => setShowOccasions(!showOccasions)}
          >
            {occasion ? occasion : "Select Occasion"}
          </button>
          {showOccasions && (
            <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
              <select
                value={occasion}
                onChange={(e) => {
                  setOccasion(e.target.value);
                  setShowOccasions(false);
                }}
                className="w-full p-2"
                size="7"
              >
                <option value="">Select Occasion</option>
                <option value="airport-transfer">Airport Transfer</option>
                <option value="wedding">Wedding</option>
                <option value="party">Party</option>
                <option value="business">Business</option>
                <option value="vacation">Vacation</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}
        </div>

        <h2 className="mb-2 text-xl font-semibold text-gray-700">
          Specify Number of Passengers
        </h2>
        <p className="mb-2 text-sm">
          Kindly specify number of people travelling
        </p>
        <div className="flex items-center mb-4 space-x-4">
          <button
            onClick={decrementPassengers}
            className="text-gray-600 rounded-full focus:outline-none"
          >
            <FaMinusCircle className="w-6 h-6" />
          </button>
          <input
            type="number"
            value={passengers}
            onChange={handlePassengersChange}
            className="w-20 p-2 text-center border border-gray-300 rounded"
          />
          <button
            onClick={incrementPassengers}
            className="text-gray-600 rounded-full focus:outline-none"
          >
            <FaPlusCircle className="w-6 h-6 " />
          </button>
        </div>

        <h2 className="mb-2 text-xl font-semibold text-gray-700">
          Contact Details
        </h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={contact.name}
            onChange={(e) => handleContactChange("name", e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Phone"
            value={contact.phone}
            onChange={(e) => handleContactChange("phone", e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={contact.email}
            onChange={(e) => handleContactChange("email", e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
        </div>

        <h2 className="mb-2 text-xl font-semibold text-gray-700">
          Note to Driver
        </h2>
        <textarea
          value={driverNote}
          onChange={(e) => setDriverNote(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
      </div>
      <div className="justify-center text-center bg-white">
        <button className="p-2 px-4 font-bold text-black bg-customYellow w-80">
          Total Price
        </button>
        <button
          onClick={() => setComponent(3)}
          className="p-2 px-4 font-bold text-black bg-yellow-500 w-80"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page2;
