import { Link } from "react-router-dom";

import appStoreImage from "@/assets/media/download-app-store-badge.webp";
import googlePlayImage from "@/assets/media/download-google-play-badge.webp";

import RenderMedia from "../common/Media";

export default function Footer() {
    return (
        <footer id="footer">
            <div className="footer-nav">
                <div className="footer-links">
                    <div className="footer-social">
                        <div className="content-ttl">
                            <h3>Find us on</h3>
                        </div>

                        <ul className="social">
                            <li>
                                <Link to="#facebook">
                                    <i className="ic ic-facebook"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to="#twitter">
                                    <i className="ic ic-twitter"></i>{" "}
                                </Link>
                            </li>
                            <li>
                                <Link to="#whatsapp">
                                    <i className="ic ic-whatsapp"></i>{" "}
                                </Link>
                            </li>
                            <li>
                                <Link to="#instagram">
                                    <i className="ic ic-instagram"></i>{" "}
                                </Link>
                            </li>
                            <li>
                                <Link to="#youtube">
                                    <i className="ic ic-youtube"></i>{" "}
                                </Link>
                            </li>
                            <li>
                                <Link to="#linkedin">
                                    <i className="ic ic-linkedin"></i>{" "}
                                </Link>
                            </li>
                            <li>
                                <Link to="#envelope">
                                    <i className="ic ic-envelope"></i>{" "}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-cta">
                        <div className="content-ttl">
                            <h3>Download HFM App</h3>
                        </div>

                        <div className="app-cta">
                            <Link to="#app-store" className="app-cta-item">
                                <RenderMedia
                                    src={appStoreImage}
                                    srcMobile={appStoreImage}
                                    alt="App Store"
                                />
                            </Link>

                            <Link to="#google-play" className="app-cta-item">
                                <RenderMedia
                                    src={googlePlayImage}
                                    srcMobile={googlePlayImage}
                                    alt="Google Play"
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="footer-disclaimer">
                    <div className="content-ttl">
                        <h3>Risk Warning</h3>
                    </div>

                    <div className="disclaimer-content">
                        <p className="size-extra-small">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing
                            elit. Aenean commodo ligula eget dolor. Aenean
                            massa. Cum sociis natoque penatibus et magnis dis
                            parturient montes, nascetur ridiculus mus. Donec
                            quam felis, ultricies nec, pellentesque eu, pretium
                            quis, sem. Nulla consequat massa quis enim. Donec
                            pede justo, fringilla vel, aliquet nec, vulputate
                            eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                            venenatis vitae, justo. Nullam dictum felis eu
                            pLorem ipsum dolor sit amet, consectetuer adipiscing
                            elit. Aenean commodo ligula eget dolor. Aenean
                            massa. Cum sociis natoque penatibus et magnis dis
                            parturient montes, nascetur ridiculus mus. Donec
                            quam felis, ultricies nec, pellentesque eu, pretium
                            quis, sem. Nulla consequat massa quis enim. Donec
                            pede justo, fringilla vel, aliquet nec, vulputate
                            eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                            venenatis vitae, justo. Nullam dictum felis eu p
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
