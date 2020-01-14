/**************************************************
    CONTACT HELPER 
**************************************************/
import React from 'react'
import Title from '../../globalComponents/Title'

/**************************************************
    CONTACT HELPER COMPONENT
**************************************************/
export default function Contact() {
    return (
        <section className="py-5">
            <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                    <Title title="Contact Us"/>

                    <form action="https://formspree.io/codingafterthirty@gmail.com" method="POST" className="mt-5">
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="firstName" 
                                className="form-control"
                                placeholder="Your name..."
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="email" 
                                name="yourEmail" 
                                className="form-control"
                                placeholder="Your email..."
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="yourSubject" 
                                className="form-control"
                                placeholder="Subject..."
                            />
                        </div>
                        <div className="form-group">
                            <textarea 
                                type="email" 
                                name="yourMessage" 
                                className="form-control"
                                placeholder="Your message..."
                                rows="10"
                            ></textarea>
                        </div>

                        <div className="form-group mt-3">
                        <input 
                                type="submit" 
                                name="firstName" 
                                className="form-control bg-primary text-white"
                                value="Send"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
