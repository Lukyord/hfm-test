import React from "react";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

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
