import React from "react";
import "../assets/css/homepage.css";

import MainLayout from "../components/Layout/MainLayout.tsx";
import ContactForm from "../components/homepage/contact-form/ContactForm.tsx";

export default function Homepage() {
    return (
        <MainLayout>
            <main className="homepage">
                <h1>Hello World</h1>

                <ContactForm />
            </main>
        </MainLayout>
    );
}
