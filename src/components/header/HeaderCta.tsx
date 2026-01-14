import { Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";

type HeaderCtaProps = {
    className?: string;
};

export default function HeaderCta({ className = "" }: HeaderCtaProps) {
    return (
        <div className={`header-cta ${className}`}>
            <Link to="#download-app" className="download-app">
                <i className="ic ic-iphone size-icon-xxs"></i>
                <span className="size-description">Download App</span>
            </Link>

            <div className="cta-items">
                <div className="cta-item">
                    <Link to="#contact-us">Contact us</Link>
                </div>
                <div className="cta-item">
                    <Link to="#partner-with-us">Partner with us</Link>
                </div>
                <div className="cta-item">
                    <LanguageSelector />
                </div>
            </div>
        </div>
    );
}
