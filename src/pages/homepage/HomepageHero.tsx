import heroImage from "@/assets/media/hero-bg.webp";

import RenderMedia from "@/components/common/Media";
import ContactForm from "@/components/homepage/contact-form/ContactForm";

export default function HomepageHero() {
    return (
        <section data-section="homepage-hero" className="header-padding" aria-label="Hero section">
            <div className="sc-inner">
                <div className="cover" aria-hidden="true">
                    <RenderMedia src={heroImage} srcMobile={heroImage} alt="" />
                </div>
                <div className="container">
                    <div className="sc-ttl fadeInUp" style={{ animationDelay: "300ms" }}>
                        <h2 className="size-h1 weight-bold">
                            <span className="c-gold-gradient">Lorem ipsum dolor</span>
                            <br />
                            <span className="c-white">sit amet tosik</span>
                        </h2>
                    </div>

                    <div className="fadeInUp" style={{ animationDelay: "600ms" }}>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
