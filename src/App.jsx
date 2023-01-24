import React,{ createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Services from './components/Services/Services';
import Qualifications from './components/Qualifications/Qualifications';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ScrollUp from './components/ScrollUp/ScrollUp';

export const ThemeContext = createContext(null);

function App() {
  const [darkOn, setDarkOn] = useState('light');
  const  onDarkModeChange = () =>{
    setDarkOn((curr) => (curr === 'light' ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{ darkOn, onDarkModeChange }}>

     <div className='App' id={darkOn}>
     <Header onDarkModeChange={onDarkModeChange} darkOn={darkOn} />
     <main className='main'>
      <Home />
      <About />
      <Projects />
      <Skills />
      <Services />
      <Qualifications />
      <Testimonials />
      <Contact />
     </main>

      <Footer />
      <ScrollUp />
    </div>

     </ThemeContext.Provider>
  )
}

export default App
