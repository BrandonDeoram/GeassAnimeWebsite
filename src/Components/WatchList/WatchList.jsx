import React from "react";
import { useNavigate } from "react-router-dom";
export default function WatchList() {
  //Call MongoDB API

  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}
