import "@/assets/css/homepage.css";
import "@/assets/css/homepage-rwd.css";

import heroImage from "@/assets/media/hero-bg.webp";

import MainLayout from "@/components/Layout/MainLayout";
import ContactForm from "@/components/homepage/contact-form/ContactForm";
import Accordion from "@/components/common/Accordion";
import ogImage from "@/assets/media/og.webp";
import RenderMedia from "@/components/common/Media";

export default function Homepage() {
    const faq = [
        {
            title: "Question A",
            content: "<p>Answer A</p>",
        },
        {
            title: "Question B",
            content: "<p>Answer B</p>",
        },
        {
            title: "Question C",
            content: "<p>Answer C</p>",
        },
    ];
    return (
        <>
            <title>Homepage | HFM Test</title>
            <meta
                name="description"
                content="Welcome to our homepage. Contact us and explore our frequently asked questions."
            />
            <meta property="og:title" content="Homepage | HFM Test" />
            <meta
                property="og:description"
                content="Welcome to our homepage. Contact us and explore our frequently asked questions."
            />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={ogImage} />

            <MainLayout>
                <h1 className="visually-hidden">Homepage</h1>

                {/* HERO */}
                <main className="homepage">
                    <section
                        data-section="homepage-hero"
                        className="header-padding"
                    >
                        <div className="sc-inner">
                            <div className="cover">
                                <RenderMedia
                                    src={heroImage}
                                    srcMobile={heroImage}
                                    alt="Hero"
                                />
                            </div>
                            <div className="container">
                                <div className="sc-ttl">
                                    <h2 className="size-h1 weight-bold">
                                        <span className="c-gold-gradient">
                                            Lorem ipsum dolor
                                        </span>
                                        <br />
                                        <span className="c-white">
                                            sit amet tosik
                                        </span>
                                    </h2>
                                </div>
                                <ContactForm />
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section data-section="faq">
                        <div className="sc-inner">
                            <div className="container">
                                <div className="sc-ttl">
                                    <h2>FAQ</h2>
                                </div>

                                {faq.map((item) => (
                                    <Accordion
                                        key={item.title}
                                        title={item.title}
                                    >
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: item.content,
                                            }}
                                        />
                                    </Accordion>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section style={{ height: "200vh" }}></section>
                </main>
            </MainLayout>
        </>
    );
}
