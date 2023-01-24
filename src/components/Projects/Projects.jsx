import React, { useEffect } from 'react';
import './Projects.css'
import { Data } from './Data';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Projects = () => {
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
    <section ref={ref} className="projects section" id="projects">
        <h2 className="section__title">Projects</h2>
        <span className="section__subtitle">My latest work</span>

        <motion.div animate={animation}>
        <div className="projects__container container grid">
          <div className="projects__content">
          {Data.map(({id, image, title, description, code, demo}) => {
                return (
                <div className='project__card' key={id}>
                        <img src={image} alt="project" className='project__img'/>
                        <div className="project__info">
                            <h3 className='project__name'>{title}</h3>
                            <p className='project__description'>{description}</p>
                            <div className="project__buttons">
                              <button className='project__button-code'>
                                <a className='project__link-code'  target="_blank" href={code}>Code</a>
                              </button>
                              <button className='project__button-demo'>
                                <a className='project__link-demo'  target="_blank" href={demo}>Demo<i className="uil uil-external-link-alt project__link-icon"></i></a>
                              </button>
                            </div>
                        </div>
                </div>
                )
            })}
          </div>
        </div>
        </motion.div>
    </section>
  )
}

export default Projects