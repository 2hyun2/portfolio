import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ListProvider } from './Context/Lists.jsx';
import Header from './Component/Header.jsx';
import SideBar from './Component/SideBar.jsx';
import CardLayout from './Component/CardLayout.jsx';
import Home from './Pages/Home.jsx';
import Projects from './Pages/Projects.jsx';
import About from './Pages/About.jsx';
import Contact from './Pages/Contact.jsx';

// CSS
import './Css/Reset.css';
import './Css/layout.css';
import './Css/Main.css';
import './Css/Sub.css';

function setViewportHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--real-vh', `${vh}px`);
}

function App() {
  useEffect(() => {
    setViewportHeight();

    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    // cleanup 함수: 컴포넌트 언마운트 시 이벤트 해제
    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  return (
    <ListProvider>
      <Router basename="/portfolio">
        <Header />
        <SideBar />
        <CardLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </CardLayout>
      </Router>
    </ListProvider>
  );
}

export default App;
