import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import medal1 from "@/assets/media/medal-1.svg";
import medal2 from "@/assets/media/medal-2.svg";
import medal3 from "@/assets/media/medal-3.svg";

import "swiper/css";
import RenderMedia from "@/components/common/Media";

export default function HomepagePrizes() {
    const price = [
        {
            media: {
                pc: medal1,
                mobile: medal1,
                alt: "Medal 1",
            },
            price: "$1000",
            subttl: "Cras dapibus & Cras dapibus",
        },
        {
            media: {
                pc: medal2,
                mobile: medal2,
                alt: "Medal 2",
            },
            price: "$1000",
            subttl: "Cras dapibus",
        },
        {
            media: {
                pc: medal3,
                mobile: medal3,
                alt: "Medal 3",
            },
            price: "$1000",
            subttl: "Cras dapibus",
        },
    ];

    return (
        <section data-section="prize" className="template-section">
            <div className="sc-inner pc-t-150 pc-b-150 mb-t-125 mb-b-125">
                <div className="container">
                    <div className="sc-ttl">
                        <h2 className="size-h2">PRIZES</h2>
                    </div>

                    <div className="card-container" data-card-layout="slider">
                        <Swiper
                            slidesPerView={"auto"}
                            centeredSlides={true}
                            centerInsufficientSlides
                            breakpoints={{
                                992: {
                                    centeredSlides: false,
                                },
                            }}
                        >
                            {price.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="card" data-card="prize">
                                        <div className="prize-media">
                                            <RenderMedia
                                                src={item.media.pc}
                                                srcMobile={item.media.mobile}
                                                alt={item.media.alt}
                                            />
                                        </div>
                                        <div className="prize">
                                            <p className="size-h2 font-body weight-bold">
                                                {item.price}
                                            </p>
                                        </div>

                                        <div className="prize-subttl">
                                            <h3 className="size-h4">
                                                {item.subttl}
                                            </h3>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="sc-cta">
                        <Link to="#join-now" className="button">
                            Join Now
                        </Link>

                        <div className="cta-subttl">
                            <p className="size-small c-gray">
                                Terms and Conditions apply
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
