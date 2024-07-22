//  store.js
import { create } from "zustand";

const useStore = create((set) => ({
  pickup: "",
  destination: "",
  stop: "",
  date: "",
  time: "",
  vehicleType: "",
  vehicleDetails: {},
  note: "",
  occasion: "",
  passengers: "",
  contact: { name: "", phone: "", email: "" },
  driverNote: "",
  distanceStartToEnd: 0,
  distanceStartToStop: 0,
  distanceStopToEnd: 0,
  additionalOptions: [],
  setPickup: (pickup) => set({ pickup }),
  setDestination: (destination) => set({ destination }),
  setStop: (stop) => set({ stop }),
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setVehicleType: (vehicleType) => set({ vehicleType }),
  setVehicleDetails: (vehicleDetails) => set({ vehicleDetails }),
  setNote: (note) => set({ note }),
  setOccasion: (occasion) => set({ occasion }),
  setPassengers: (passengers) => set({ passengers }),
  setContact: (contact) => set({ contact }),
  setDriverNote: (driverNote) => set({ driverNote }),
  setDistances: (distances) => set(distances),
  setAdditionalOptions: (additionalOptions) => set({ additionalOptions }),
}));

export default useStore;
