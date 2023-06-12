import React from "react";
import TextInput from "./components/TextInput";
import Button from "./components/Button";
import SmallFooter from "./components/SmallFooter";

function App() {
  return (
    <div>
      <SmallFooter></SmallFooter>
      <Button onClick={() => console.log("clocked")} width={400} height={50}>
        Sign In
      </Button>
    </div>
  );
}

export default App;
