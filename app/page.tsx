"use client";
import { useState } from "react";
import Map from "../MapComp/Map";
import useStore from "./store/store";
import Page1 from "../MapComp/Page1";
import Page2 from "../MapComp/Page2";
import ReviewBooking from "../MapComp/ReviewBooking";

export default function Home() {
  const [component, setComponent] = useState(1);
  const state = useStore((state) => state);

  return (
    <div className="relative h-[100vh]">
      <Map />
      <div className="absolute top-0 left-0 w-[350px] h-full bg-white bg-opacity-80">
        <div className="h-full overflow-auto scrollbar-yellow">
          {component === 1 && <Page1 setComponent={setComponent} />}
          {component === 2 && <Page2 setComponent={setComponent} />}
          {component === 3 && <ReviewBooking setComponent={setComponent} />}
        </div>
      </div>
    </div>
  );
}
