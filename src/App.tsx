import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home.page.tsx";
import UserPage from "./pages/User.page.tsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
