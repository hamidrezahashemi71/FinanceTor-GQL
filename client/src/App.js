import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import FirstLayout from "./layout/FirstLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Contact from "./pages/Contact";

import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Tags from "./pages/Tags";
import CreateExpense from "./pages/CreateExpense";
import CreateTag from "./pages/CreateTag";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='' element={<FirstLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
        <Route path='/dashboard' element={<MainLayout />}>
          <Route path='/dashboard/' element={<Dashboard />} />
          <Route path='/dashboard/expenses' element={<Expenses />} />
          <Route path='/dashboard/tags' element={<Tags />} />
          <Route path='/dashboard/createxpense' element={<CreateExpense />} />
          <Route path='/dashboard/createtag' element={<CreateTag />} />
          <Route path='/dashboard/editprofile' element={<EditProfile />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
