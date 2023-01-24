import React, { useState } from 'react';
import "./Services.css"

const Services = () => {
    const[toggleState, setToggleState] = useState(0);

    const toggleTab = (index) => {
        setToggleState(index);
    }


  return (
    <section className="services section" id="services">
        <h2 className="section__title">Services</h2>
        <span className="section__subtitle">How can I help you?</span>

        <div className="services__container container grid">
            
            <div className="services__content">
                <div>
                    <i className="uil-arrow services__icon"></i>
                    <h3 className="services__title">
                        Web <br /> Development
                    </h3>
                </div>

                <span className="services__button" onClick={() => toggleTab(1)}>View More<i className="uil uil-arrow-right services__button-icon"></i></span>

             <div className={toggleState === 1 ? "services__modal active-modal" : "services__modal" }>
                <div className="services__modal-content">
                    <i onClick={() => toggleTab(0)} className="uil uil-times services__modal-close"></i>

                    <h3 className="services__modal-title">Web Development</h3>
                    <p className="services__modal-description">Creating apps that highlight their interactivity and innovation.</p>

                    <ul className="services__modal-services-grid">
                        <li className="services__modal-service">
                            <i className="uil uil-check-circle services__modal-icon"></i>
                            <p className="services__modal-info">
                                Development of interactive applications.
                            </p>
                        </li>


                        <li className="services__modal-service">
                            <i className="uil uil-check-circle services__modal-icon"></i>
                            <p className="services__modal-info">
                                Achieve the highest positioning on the search   engines.
                            </p>
                        </li>

                        <li className="services__modal-service">
                            <i className="uil uil-check-circle services__modal-icon"></i>
                            <p className="services__modal-info">
                                Scalable and upgradable websites.
                            </p>
                        </li>
                    </ul>
                </div>
              </div>
            </div>

            <div className="services__content">
                <div>
                    <i className="uil uil uil-web-grid services__icon"></i>
                    <h3 className="services__title">
                        UI/UX <br /> Designer
                    </h3>
                </div>

                <span className="services__button" onClick={() => toggleTab(2)}>View More<i className="uil uil-arrow-right services__button-icon"></i></span>

              <div className={toggleState === 2 ? "services__modal active-modal" : "services__modal"}>
                <div className="services__modal-content">
                    <i onClick={() => toggleTab(0)} className="uil uil-times services__modal-close"></i>

                    <h3 className="services__modal-title">UI/UX Designer</h3>
                    <p className="services__modal-description">I can help you to design the aesthetics of your website.</p>

                    <ul className="services__modal-services-grid">
                        <li className="services__modal-service">
                            <i className="uil uil-check-circle services__modal-icon"></i>
                            <p className="services__modal-info">
                               Apps that follow the most recent ui/ux standards.
                            </p>
                        </li>

                        <li className="services__modal-service">
                            <i className="uil uil-check-circle services__modal-icon"></i>
                            <p className="services__modal-info">
                               I can translate your figma or Adobe XD design into code.
                            </p>
                        </li>

                    </ul>
                </div>
              </div>
            </div>
           
        </div>
    </section>
  )
}

export default Services