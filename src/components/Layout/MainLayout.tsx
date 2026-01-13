import React from "react";
import Footer from "../footer/Footer.tsx";
import Header from "../header/Header.tsx";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div id="layout">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;
