"use client";

import Login from "@/app/auth/login/page";

import React from "react";
import { useVerifyQuery } from "../hooks/api/api";


const BackgroundVideo = () => {
  const {data:verifyUser}=useVerifyQuery(undefined)
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      > <source
          src="https://res.cloudinary.com/dmq2gxidt/video/upload/v1756411392/bg-video_gytenx.mp4"
          type="video/mp4"
        />
     
        Your browser does not support the video tag.
      </video>

      {/* Overlay content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
          padding: "0 20px",
        }}
      >
        <>
        {
          verifyUser? (  
          <h1 style={{ fontSize: "3rem", textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}>
          Welcome,<br /> Mr.Rasel
        </h1>):(
        <div style={{ marginTop: "20px 20px", width: "60%", maxWidth: "400px" }}>
          <Login />
        </div>)
        }
        </>




      
       


      </div>
    </div>
  );
};

export default BackgroundVideo;
