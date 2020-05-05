import React from "react";
import "./App.css";
import Header from "./components/UI/Header";
import Form from "./components/Form/Form";

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
