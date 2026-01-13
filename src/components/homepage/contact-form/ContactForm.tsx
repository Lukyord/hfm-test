import React from "react";

export default function ContactForm() {
    return (
        <form className="contact-form">
            <h2>Contact Us</h2>
            <div className="fields">
                <div className="field">
                    <label htmlFor="name">
                        <span className="field-label">
                            <span>First Name</span>
                        </span>
                    </label>
                    <input type="text" id="first-name" name="first-name" />
                </div>
                <div className="field">
                    <label htmlFor="last-name">
                        <span className="field-label">
                            <span>Last Name</span>
                        </span>
                    </label>
                    <input type="text" id="last-name" name="last-name" />
                </div>
                <div className="field">
                    <label htmlFor="country">
                        <span className="field-label">
                            <span>Country</span>
                        </span>
                    </label>
                    <select id="country" name="country">
                        <option value="us">United States</option>
                        <option value="ca">Canada</option>
                        <option value="uk">United Kingdom</option>
                        <option value="au">Australia</option>
                        <option value="nz">New Zealand</option>
                    </select>
                </div>
                <div className="field">
                    <div className="subfield">
                        <label htmlFor="country-code">
                            <span className="field-label">
                                <span>Country Code</span>
                            </span>
                        </label>
                        <select id="country-code" name="country-code">
                            <option value="us">+1</option>
                            <option value="ca">+1</option>
                            <option value="uk">+44</option>
                            <option value="au">+61</option>
                            <option value="nz">+64</option>
                        </select>
                    </div>
                    <div className="subfield">
                        <label htmlFor="phone">
                            <span className="field-label">
                                <span>Phone</span>
                            </span>
                        </label>
                        <input type="text" id="phone" name="phone" />
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="email">
                        <span>
                            <span className="field-label">Email</span>
                        </span>
                    </label>
                    <input type="email" id="email" name="email" />
                </div>
                <div className="field">
                    <label htmlFor="experience">
                        <span className="field-label">
                            <span>Experience</span>
                        </span>
                    </label>
                    <select id="experience" name="experience">
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                    </select>
                </div>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}
