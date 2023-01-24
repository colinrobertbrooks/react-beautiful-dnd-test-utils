import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import initialData from "./initial-data";

// NOTE: no <StrictMode /> for now (see https://stackoverflow.com/a/72355197)
ReactDOM.createRoot(document.getElementById("root")).render(
  <App initialState={initialData} />
);
