import { Link } from "react-router-dom";

import LanguageSelector from "./LanguageSelector";

export default function Header() {
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

                <div className="header-content-row"></div>
            </div>
        </header>
    );
}
