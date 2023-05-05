import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import DataTableComponent from "./components/DataTable";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/users" element={<DataTableComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
