import React from "react";
import "./App.css";
import Header from "./components/UI/Header";
import FormManager from "./components/Form/FormManager";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-header">
        <div className="body">
          <FormManager />
        </div>
      </main>
    </div>
  );
}

export default App;
