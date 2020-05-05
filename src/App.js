import React from "react";
import Header from "./components/UI/Header";
import "./App.css";
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-header">
        <Form />
      </main>
    </div>
  );
}

export default App;
