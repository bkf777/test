import React from "react";
import Store from "./store";

export default function ComponentA({ state }: any) {
  return (
    <div>
      <button
        onClick={() => {
          
        }}
      >
        click me
      </button>
      {state?.a}
    </div>
  );
}
