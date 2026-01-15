import illus1 from "@/assets/media/illus-1.svg";
import illus2 from "@/assets/media/illus-2.svg";
import illus3 from "@/assets/media/illus-3.svg";
import phoneImage from "@/assets/media/mock-phone.webp";

import RenderMedia from "@/components/common/Media";
import ScrollAnimation from "@/components/common/ScrollAnimation";

export default function HomepagePhone() {
    const phoneContent = [
        {
            media: {
                pc: illus1,
                mobile: illus1,
                alt: "Phone 1",
            },
            content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
        },
        {
            media: {
                pc: illus2,
                mobile: illus2,
                alt: "Phone 2",
            },
            content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
        },
        {
            media: {
                pc: illus3,
                mobile: illus3,
                alt: "Phone 3",
            },
            content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
        },
        {
            media: {
                pc: illus1,
                mobile: illus1,
                alt: "Phone 4",
            },
            content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
        },
    ];

    return (
        <section data-section="phone">
            <div className="sc-inner pc-t-150 pc-b-0 mb-t-150 mb-b-0">
                <div className="container">
                    <ScrollAnimation animateIn="fadeInUp" className="sc-ttl">
                        <h2 className="size-h2">QUISQUE RUTRUM</h2>
                    </ScrollAnimation>

                    <div className="phone-wrapper">
                        {phoneContent.map((item, index) => (
                            <ScrollAnimation key={index} animateIn="fadeIn" className="phone-item" delay={300}>
                                <div className="media">
                                    <RenderMedia
                                        src={item.media.pc}
                                        srcMobile={item.media.mobile}
                                        alt={item.media.alt}
                                    />
                                </div>
                                <div className="content">
                                    <p className="c-gray-dark">{item.content}</p>
                                </div>
                            </ScrollAnimation>
                        ))}

                        <ScrollAnimation animateIn="fadeInUp" className="media">
                            <RenderMedia src={phoneImage} srcMobile={phoneImage} alt="Phone" />
                        </ScrollAnimation>
                    </div>
                </div>
            </div>
        </section>
    );
}
