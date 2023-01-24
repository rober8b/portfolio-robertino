import React, { useEffect } from 'react';
import "./Skills.css";
import FrontEnd from './FrontEnd';
import Others from './Others';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const {ref, inView} = useInView(
    {threshold: 0.1}
  );
  const animation = useAnimation();

  useEffect(() => {
    if(inView){
      animation.start({
        x: 0,
        transition:{
          type: "tween", duration: 1, bounce: 0
        }
      })
    }
    if(!inView){
      animation.start({x: '-100vw'})
    }
  }, [inView])
  return (
    <section ref={ref} className="skills section" id="skills">
        <h2 className="section__title">Skills</h2>
        <span className="section__subtitle">My stack</span>

        <motion.div animate={animation}>
        <div className="skills__container container grid">
            <FrontEnd />
            <Others />
        </div>
        </motion.div>
    </section>
  )
}

export default Skills