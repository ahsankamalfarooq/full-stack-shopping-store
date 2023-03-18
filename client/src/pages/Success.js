import React from 'react'
import { useLocation } from 'react-router-dom';

const Success = () => {
    const location = useLocation()
    console.log(location)
  return(
    <div 
      style={{
        height: "100vh",
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
      }}
    >

      <button
        style={{
          border: "none",
          width : 120,
          borderRadius : 5,
          padding : "20px",
          backgroundColor :"black",
          color : "white",
          fontWeight : "600",
          cursor : "pointer",
        }}
        >
        Successfu
      </button>
      <span>Your order is being prepeared. Thanks for chosing KHR Store</span>

    </div>
  );
};

export default Success
