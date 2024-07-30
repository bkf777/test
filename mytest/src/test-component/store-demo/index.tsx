import React, { useEffect } from "react";
import ComponentA from "./componentA";
import Store from "./store";

export default function Index() {
  const [state, setState] = React.useState();
  useEffect(() => {
    console.log("change---");
    setState(Store.getStore());
  }, [Store.getStore()]);
  return (
    <div>
      <ComponentA state={state} />
    </div>
  );
}
