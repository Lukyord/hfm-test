import "@/assets/css/homepage.css";
import "@/assets/css/homepage-rwd.css";

import ogImage from "@/assets/media/og.webp";

import MainLayout from "@/components/Layout/MainLayout";
import HomepageHero from "./HomepageHero";
import HomepagePhone from "./HomepagePhone";
import HomepageFaq from "./HomepageFaq";
import HomepagePrizes from "./HomepagePrizes";
import HomepageLeaderboard from "./HomepageLeaderboard";

export default function Homepage() {
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

                <main className="homepage">
                    <HomepageHero />

                    <HomepagePhone />

                    <HomepagePrizes />

                    <HomepageLeaderboard />

                    <HomepageFaq />
                </main>
            </MainLayout>
        </>
    );
}
