import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavbarCom from './components/NavbarCom'
import "./css/index.css"
// SCREENS
import Home from './screens/Home'
import Post from './screens/Post'
import NotFound from './screens/NotFound'
import CreatePost from './screens/CreatePost'
import Login from './screens/Login'
import EditPost from "./screens/EditPost"
function App() {
  return (
    <BrowserRouter>
      <NavbarCom />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
