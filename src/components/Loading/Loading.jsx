import React from "react";
import { SpinnerRoundFilled } from "spinners-react";

function Loading() {
  return (
    <div className=" flex justify-center">
      <SpinnerRoundFilled size={100} color="#74b9ff" />
    </div>
  );
}

export default Loading;
