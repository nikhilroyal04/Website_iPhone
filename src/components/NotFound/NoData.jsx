import React from "react";
import Lottie from "react-lottie-player";
import loaderAnimation from "../../assets/animations/NoData.json"; 

const NoData = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        width: "auto",
        backgroundColor: "#fff", 
        marginTop: "150px"
      }}
    >
      <Lottie
        loop
        animationData={loaderAnimation}
        play
        style={{ width: "auto", height: 400, }}
      />
    </div>
  );
};

export default NoData;
