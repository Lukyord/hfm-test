import { Link } from "react-router-dom";

import logo from "@/assets/media/logo.svg";

import LanguageSelector from "./LanguageSelector";
import RenderMedia from "../common/Media";

export default function Header() {
    const closeMenu = () => {};

    return (
        <header id="header">
            <div className="header-nav">
                <div className="header-content-row">
                    <div className="logo-desc">
                        <p className="c-gray size-tiny">
                            Member of HF Markets Group
                        </p>
                    </div>

                    <div className="header-cta">
                        <Link to="#download-app" className="download-app">
                            <i className="ic ic-iphone size-icon-xxs"></i>
                            <span className="size-description">
                                Download App
                            </span>
                        </Link>

                        <div className="cta-items">
                            <div className="cta-item">
                                <Link to="#contact-us">Contact us</Link>
                            </div>
                            <div className="cta-item">
                                <Link to="#partner-with-us">
                                    Partner with us
                                </Link>
                            </div>
                            <div className="cta-item">
                                <LanguageSelector />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="header-content-row">
                    <div className="header-logo">
                        <RenderMedia src={logo} alt="logo" className="logo" />
                    </div>

                    <nav className="header-menu">
                        <div className="panel">
                            <div className="panel-scroll" data-lenis-prevent>
                                <div className="panel-body">
                                    <ul className="menu">
                                        <li>
                                            <Link
                                                to="#markets"
                                                onClick={closeMenu}
                                            >
                                                Markets
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="#trading"
                                                onClick={closeMenu}
                                            >
                                                Trading
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="#investing"
                                                onClick={closeMenu}
                                            >
                                                Investing
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="#tools-education"
                                                onClick={closeMenu}
                                            >
                                                Tools & Education
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="#company"
                                                onClick={closeMenu}
                                            >
                                                Company
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <div className="header-customer">
                        <Link to="#login" className="customer-login">
                            <span>Login</span>
                        </Link>
                        <Link to="#register" className="customer-register">
                            <span>Register</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
