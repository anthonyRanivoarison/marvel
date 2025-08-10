import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "@/pages/HomePage.tsx";
import CharacterPage from "@/pages/CharacterPage.tsx";
import CharacterFormPage from "@/pages/CharacterFormPage.tsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/character/:id" element={<CharacterPage/>}/>
        <Route path="/form" element={<CharacterFormPage />}/>
      </Routes>
    </Router>
  );
}