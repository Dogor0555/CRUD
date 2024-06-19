import './App.css';
import CompShowBlogs from './blog/ShowBlogs';
import CompCreateBlog from './blog/Createblogs';
import CompEditBlog from './blog/EditBlogs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CompShowBlogs />} />
          <Route path='/create' element={<CompCreateBlog />} />
          <Route path='/edit/:id' element={<CompEditBlog />} /> {/* Add the new route */}
          {/* Add other routes here as needed */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
