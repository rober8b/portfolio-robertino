import React, { useState, useEffect } from 'react'
import "./Qualifications.css"
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Qualifications = () => {
  const[toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
      setToggleState(index);
  }

  const {ref, inView} = useInView(
    {threshold: 0}
  );
  const animation = useAnimation();

  useEffect(() => {
    if(inView){
      animation.start({
        x: 0,
        transition:{
          type: 'spring', duration: 1, bounce: 0
        }
      })
    }
    if(!inView){
      animation.start({x: '-100vw'})
    }
  }, [inView])

  return (
    <section ref={ref} className='qualifiaction section'>
      <h2 className="section__title">Qualification</h2>
      <span className="section__subtitle">My personal journey</span>

      <div className="qualification__container container">
        <motion.div animate={animation} className="qualification__tabs">  
            <div className={
              toggleState === 1 
                 ? "qualification__button qualification__active button--flex" 
                 : "qualification__button button--flex"
                }
                onClick={() => toggleTab(1)}
                 >
              <i className="uil uil-graduation-cap qualification__icon"></i> Education
            </div>
        
            <div className={
              toggleState === 2 
                 ? "qualification__button qualification__active  button--flex" 
                 : "qualification__button button--flex"
                 }
                 onClick={() => toggleTab(2)}
                 >
              <i className="uil uil-briefcase-alt qualification__icon"></i> 
              Experience
            </div>
        </motion.div>
        
            <div className="qualification__sections">
              
              <div className={
                toggleState === 1 
                  ? "qualification__content qualification__content-active" 
                  : "qualification__content"}>

                <div className="qualification__data">
                  <div>
                    <h3 className="qualification__title">Programming Technicature</h3>
                    <span className="qualification__subtitle">UTN - University</span>
                    <div className="qualification__calender">
                      <i className="uil uil-calendar-alt">2021 - Present</i>
                    </div>
                  </div>

                  <div>
                    <span className="qualification__rounder"></span>
                    <span className="qualification__line"></span>
                  </div>
                </div>

                <div className="qualification__data">
                  <div></div>

                  <div>
                    <span className="qualification__rounder"></span>
                    <span className="qualification__line"></span>
                  </div>

                  <div>
                    <h3 className="qualification__title">Javascript</h3>
                    <span className="qualification__subtitle">CoderHouse - Course</span>
                    <div className="qualification__calender">
                      <i className="uil uil-calendar-alt">2022</i>
                    </div>
                  </div>
                </div>

                <div className="qualification__data">
                  <div>
                    <h3 className="qualification__title">React.js</h3>
                    <span className="qualification__subtitle">CoderHouse - Course</span>
                    <div className="qualification__calender">
                      <i className="uil uil-calendar-alt">2022</i>
                    </div>
                  </div>

                  <div>
                    <span className="qualification__rounder"></span>
                    <span className="qualification__line"></span>
                  </div>

                </div>

                <div className="qualification__data">
                  <div></div>
                  
                  <div>
                    <span className="qualification__rounder"></span>
                  </div>

                  <div>
                    <h3 className="qualification__title">Bachelor's Degree in Digital Business </h3>
                    <span className="qualification__subtitle">UCEMA - University</span>
                    <div className="qualification__calender">
                      <i className="uil uil-calendar-alt">2024 - 2027</i>
                    </div>
                  </div>
                </div>
              </div>

              <div className={
                toggleState === 2 
                  ? "qualification__content qualification__content-active" 
                  : "qualification__content"}>
                
                 <div className="qualification__data">
                  <div>
                    <h3 className="qualification__title">Front End Developer</h3>
                    <span className="qualification__subtitle">Freelance</span>
                    <div className="qualification__calender">
                      <i className="uil uil-calendar-alt">2022 - Present</i>
                    </div>
                  </div>

                  <div>
                    <span className="qualification__rounder"></span>
                  </div>
                </div>

              </div>
            </div>
      </div>
    </section>
  )
}

export default Qualifications