import RenderMedia from "@/components/common/Media";
import { Link } from "react-router-dom";

import trophy1 from "@/assets/media/trophy-1.svg";
import trophy2 from "@/assets/media/trophy-2.svg";
import trophy3 from "@/assets/media/trophy-3.svg";

export default function HomepageLeaderboard() {
    const trophies = [trophy1, trophy2, trophy3];

    const getOrdinalSuffix = (index: number) => {
        switch (index) {
            case 0:
                return "st";
            case 1:
                return "nd";
            case 2:
                return "rd";
            default:
                return "th";
        }
    };

    const leaderboard = [
        {
            name: "John Smith",
            gain: "1624.19%",
        },
        {
            name: "Jane Doe",
            gain: "1083.63%",
        },
        {
            name: "Jim Beam",
            gain: "635.47%",
        },
        {
            name: "John Doe",
            gain: "169.20%",
        },
        {
            name: "Jane Doe",
            gain: "158.62%",
        },
        {
            name: "Jim Beam",
            gain: "124.50%",
        },
        {
            name: "John Doe",
            gain: "100.00%",
        },
        {
            name: "Jane Doe",
            gain: "71.47%",
        },
        {
            name: "Jim Beam",
            gain: "67.05%",
        },
        {
            name: "John Doe",
            gain: "56.32%",
        },
    ];

    return (
        <section data-section="leaderboard" className="template-section">
            <div className="sc-inner pc-t-150 pc-b-75 mb-t-150 mb-b-75">
                <div className="container">
                    <div className="sc-ttl">
                        <h2 className="size-h2 uppercase">
                            Sed fringilla mauris sit
                        </h2>
                    </div>

                    <div className="content">
                        <div className="prizes">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="card"
                                    data-card="prize-hrz"
                                >
                                    <div className="prize-media">
                                        <RenderMedia
                                            src={trophies[index]}
                                            srcMobile={trophies[index]}
                                            alt={`Trophy ${index + 1}`}
                                        />
                                    </div>

                                    <div className="prize-content">
                                        <div className="prize-ttl">
                                            <h3 className="c-gold-gradient weight-bold">
                                                January {index + 1}
                                                <pre>
                                                    {getOrdinalSuffix(index)}
                                                </pre>{" "}
                                                winner
                                            </h3>
                                        </div>

                                        <div className="winner-detail">
                                            <div className="name">
                                                <p>JOHN SMITH</p>
                                            </div>
                                            <div className="id">
                                                <p className="c-gray">
                                                    5678987654
                                                </p>
                                            </div>
                                        </div>

                                        <div className="gain">
                                            <p className="weight-bold">
                                                TOTAL GAIN OF{" "}
                                                <span className="c-dark-red">
                                                    16344%
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="prize-badge">
                                        <p className="size-h3 weight-bold c-white">
                                            $1000
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="leader-board">
                            <div className="leaderboard-ttl">
                                <h3 className="size-h3 weight-bold uppercase">
                                    Aliquam lorem ant
                                </h3>
                            </div>

                            <div className="leaderboard-list">
                                <div className="leaderboard-item">
                                    <div className="item-name">
                                        <p>NAME</p>
                                    </div>

                                    <div className="item-gain">
                                        <p>GAIN</p>
                                    </div>
                                </div>

                                {leaderboard.map((item, index) => (
                                    <div
                                        className="leaderboard-item"
                                        key={item.name + item.gain}
                                    >
                                        <div className="item-name">
                                            <p>{item.name}</p>
                                        </div>

                                        <div className="item-gain">
                                            <p>{item.gain}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="leaderboard-subttl">
                                <p className="c-gray size-small">
                                    Nam quam nunc, blandit vel, luctus pulvinar
                                </p>
                            </div>
                        </div>
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
