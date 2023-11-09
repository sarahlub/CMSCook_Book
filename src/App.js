import './App.css';
import RecipeList from './recipe/RecipeList';
import RecipeDetails from './recipe/RecipeDetails';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/recipeDetails/:id" element={<RecipeDetails />} />
        <Route path="/recipeList" element={<RecipeList />} />
        <Route path="/" element={<RecipeList />} />
      </Routes>
    </Router>
  );
}

export default App;