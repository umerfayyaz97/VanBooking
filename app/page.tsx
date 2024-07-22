// "use client";
// import { useState } from "react";
// // import HomeScreen from "./homescreen";
// // import BookingDetails from "./BookingDetails";
// // import BookingDetails from "./bookingDetails";
// import Map from "../MapComp/Map";
// import useStore from "./store/store";
// // import Component3 from "./component3";
// import Page1 from "../MapComp/Page1";
// import Page2 from "../MapComp/Page2";
// import ReviewBooking from "../MapComp/ReviewBooking";
// // import Component5 from "./Component5";

// export default function Home() {
//   const [component, setComponent] = useState(1);
//   const state = useStore((state) => state);
//   // console.log("state", state);
//   const pointsSelected = {
//     start: { longitude: 115.8613, latitude: -31.9523 },
//     stop: { longitude: 0, latitude: 0 },
//     end: { longitude: 115.8575, latitude: -31.9505 },
//   };

//   return (
//     <div className="relative h-[500px]">
//       <Map {...pointsSelected} />
//       <div className="absolute left-0 w-[350px] h-full">
//         <div className="h-full overflow-auto scrollbar-yellow">
//           {component === 1 && <Page1 setComponent={setComponent} />}
//           {/* </div>
//         <div> */}
//           {component === 2 && <Page2 setComponent={setComponent} />}
//           {/* </div>
//         <div> */}
//           {component === 3 && <ReviewBooking setComponent={setComponent} />}
//         </div>
//       </div>
//     </div>
//   );
// }

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
  // console.log("state", state);

  return (
    <div className="relative h-[100vh]">
      {/* <Map {...pointsSelected} /> */}
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
