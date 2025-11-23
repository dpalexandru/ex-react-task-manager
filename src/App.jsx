import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTask from "./pages/AddTask";
import TaskList from "./pages/TaskList"
import NavBar from "./components/NavBar";
import { GlobalProvider } from "./context/GlobalContext";


function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/addtask" element={<AddTask />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>

  )
}

export default App
