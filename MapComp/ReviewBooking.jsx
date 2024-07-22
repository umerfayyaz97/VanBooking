// ReviewBooking.js
"use client";
import React, { useState } from "react";

import {
  FaArrowLeft,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import useStore from "../app/store/store";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

const ReviewBooking = ({ setComponent }) => {
  const {
    date,
    pickup,
    destination,
    vehicleType,
    vehicleDetails,
    occasion,
    passengers,
    contact,
    distanceStartToEnd,
    distanceStartToStop,
    distanceStopToEnd,
    additionalOptions,
  } = useStore((state) => ({
    date: state.date,
    pickup: state.pickup,
    destination: state.destination,
    vehicleType: state.vehicleType,
    vehicleDetails: state.vehicleDetails,
    occasion: state.occasion,
    passengers: state.passengers,
    contact: state.contact,
    distanceStartToEnd: state.distanceStartToEnd,
    distanceStartToStop: state.distanceStartToStop,
    distanceStopToEnd: state.distanceStopToEnd,
    additionalOptions: state.additionalOptions,
  }));

  const [showCancellationDetails, setShowCancellationDetails] = useState(false);

  const toggleCancellationDetails = () => {
    setShowCancellationDetails(!showCancellationDetails);
  };

  const orderNumber = "123456";
  const baseFare = 100;
  const distanceCharge = 50;
  const timeCharge = 20;
  const tax = 10;
  const totalAmount = baseFare + distanceCharge + timeCharge + tax;

  return (
    <div className="w-full p-4 text-black bg-white shadow-lg">
      <button onClick={() => setComponent(2)} className="mb-4 text-gray-700">
        <FaArrowLeft className="w-6 h-6" />
      </button>
      <h1 className="mb-4 text-2xl font-bold text-gray-700">Review Booking</h1>
      <div className="mb-2">
        <span className="font-semibold text-gray-700">Date:</span> {date}
        <p className="text-sm">Order #: {orderNumber}</p>
      </div>
      <div className="flex items-center mb-4">
        <FaMapMarkerAlt className="mr-2 text-gray-600" />
        <span>{pickup.name}</span>
      </div>
      <div className="flex items-center mb-4">
        <FaMapMarkerAlt className="mr-2 text-gray-600" />
        <span>{destination.name}</span>
      </div>
      {/* horizontal line */}
      <hr className="mb-4" />
      {/* horizontal line */}
      <div className="mb-4">
        <div className="flex flex-col items-center justify-center w-24 p-2 bg-white border border-yellow-600 rounded-lg h-28 ">
          <Image
            src={vehicleDetails.image}
            alt={vehicleDetails.name}
            height={70}
            width={70}
            layout="fixed"
            className="mb-2 rounded-lg"
          />

          <p className="mt-2 text-sm text-center text-black">
            {vehicleDetails.name}
          </p>
        </div>
      </div>
      {/* Cancellation Policy */}

      <div className="p-2 mb-4 rounded bg-yellow-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-1 text-sm font-semibold text-gray-700">
              Cancellation Policy
            </h2>
            <p className="mb-2 text-xs">
              Cancellations made seven days or less before a trip are not
              eligible for a refund
            </p>
          </div>
          <button
            className="flex items-center justify-center h-6 px-2 text-xs text-black bg-yellow-500 rounded-full"
            onClick={toggleCancellationDetails}
          >
            Details
          </button>
        </div>
        {showCancellationDetails && (
          <div className="p-2 mt-2 rounded">
            <p className="text-xs">
              Cancellations made seven days or less before a trip are not
              eligible for a refund
              <p>
                - 100% refund: Cancellation is at least 30 days before trip
                date.
              </p>
              <p>
                - 50% refund: Cancellation is between 29 and 8 days before trip
                date.
              </p>
              <p>- No refund: Cancellation is 7 or less days from trip date.</p>
            </p>
          </div>
        )}
      </div>

      {/* horizontal line */}
      <hr className="mb-4" />

      <div className="mb-4">
        <h2 className="font-semibold text-gray-700">Occasion</h2>
        <p>{occasion}</p>
      </div>
      <hr className="mb-4" />
      <div className="mb-4">
        <h2 className="font-semibold text-gray-700">Total Passengers</h2>
        <p>{passengers}</p>
      </div>

      <hr className="mb-4" />

      <div className="mb-4">
        <h2 className="font-semibold text-gray-700">Price Breakdown</h2>
        <div className="grid mt-2 gap-y-2">
          <div className="flex justify-between">
            <p className="text-xs">Base Fare</p>
            <p className="text-xs">${baseFare}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs">Distance Charge</p>
            <p className="text-xs">${distanceCharge}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs">Time Charge</p>
            <p className="text-xs">${timeCharge}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs">Tax</p>
            <p className="text-xs">${tax}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-semibold text-yellow-600">
              Total Amount
            </p>
            <p className="text-sm font-semibold text-yellow-600">
              ${totalAmount}
            </p>
          </div>
        </div>
      </div>

      <hr className="mb-4" />

      <div className="p-2 mb-4 border border-yellow-500 rounded">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-1 text-sm font-semibold text-gray-700">
              Have a Question?
            </h2>
            <p className="mb-2 text-xs">Feel free to contact us</p>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center justify-center h-6 px-2 text-xs text-black bg-yellow-500 rounded-full">
              <FaPhone />
            </button>
            <button className="flex items-center justify-center h-6 px-2 text-xs text-black bg-yellow-500 rounded-full">
              <FaEnvelope />
            </button>
          </div>
        </div>
      </div>

      <p className="mb-4 text-sm">
        By selecting Book Ride, you agree to our Cancellation policy and Ozove
        terms and conditions
      </p>
      {/* <div className="justify-center text-center bg-white">
        <button
          // onClick={() => setComponent(2)}
          className="p-2 px-4 font-bold text-black bg-yellow-500 w-78"
        >
          Book Ride
        </button>
      </div> */}
      <button className="w-full p-2 font-bold text-black bg-yellow-500 ">
        Book Ride
      </button>
    </div>
  );
};

export default ReviewBooking;
