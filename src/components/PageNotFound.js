import React from "react";
import "../styles/HomeAndNotFound.css";

export default function PageNotFound() {
  return (
    <div className="pageNotFound">
      <h1>
        <mark>Oops! The page you were looking for does not exist.</mark>
      </h1>
      <h2>404 Error: Page Not Found.</h2>
    </div>
  );
}
