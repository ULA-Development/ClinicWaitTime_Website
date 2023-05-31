import React from "react";
import TextInput from "./components/TextInput";
import Button from "./components/Button";

function App() {
  return (
    <div>
      <Button onClick={() => console.log("click")}>Sign in </Button>
    </div>
  );
}

export default App;
