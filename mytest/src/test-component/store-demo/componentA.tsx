import React from "react";
import Store from "./store";

export default function ComponentA({ state }: any) {
  return (
    <div>
      <button
        onClick={() => {
          Store.setStore({ a: Store.getStore().a + 1 });
        }}
      >
        click me
      </button>
      {state?.a}
    </div>
  );
}
