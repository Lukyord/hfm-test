import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "@/assets/media/logo.svg";

import RenderMedia from "../common/Media";
import HeaderCustomer from "./HeaderCustomer";
import HeaderMenuCtrl from "./HeaderMenuCtrl";
import HeaderCta from "./HeaderCta";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.documentElement.classList.add("header-menu-enabled");
        } else {
            document.documentElement.classList.remove("header-menu-enabled");
        }
    }, [isMenuOpen]);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header id="header">
            <div className="header-nav">
                <div className="header-content-row show-md">
                    <div className="logo-desc">
                        <p className="c-gray size-tiny">
                            Member of HF Markets Group
                        </p>
                    </div>

                    <HeaderCta className="show-md" />
                </div>

                <div className="header-content-row">
                    <Link to="/" className="header-logo">
                        <RenderMedia src={logo} alt="logo" className="logo" />
                    </Link>

                    <nav className="header-menu" aria-label="Main navigation">
                        <div className="panel" aria-hidden={!isMenuOpen}>
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

                                    <HeaderCustomer />

                                    <HeaderCta className="hidden-device-md" />
                                </div>
                            </div>
                        </div>
                    </nav>

                    <HeaderMenuCtrl
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                        className="hidden-device-md"
                    />
                </div>
            </div>
        </header>
    );
}
