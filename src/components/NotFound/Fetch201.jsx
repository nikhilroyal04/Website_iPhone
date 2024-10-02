import React from "react";
import Lottie from "react-lottie-player";
import loaderAnimation from "../../assets/animations/201-fetch.json"; 

const Fetch201 = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        width: "auto",
      }}
    >
      <Lottie
        loop
        animationData={loaderAnimation}
        play
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
};

export default Fetch201;
