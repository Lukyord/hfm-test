import "@/assets/css/homepage.css";
import "@/assets/css/homepage-rwd.css";

import MainLayout from "@/components/Layout/MainLayout";
import ContactForm from "@/components/homepage/contact-form/ContactForm";

export default function Homepage() {
    return (
        <MainLayout>
            <h1 className="visually-hidden">Homepage</h1>

            <main className="homepage">
                <section data-section="homepage-hero">
                    <div className="sc-inner">
                        <div className="container">
                            <ContactForm />
                        </div>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}
