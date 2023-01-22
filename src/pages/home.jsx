import { HomeHeader } from "../cmps/home/home-header"
import { HomeHero } from "../cmps/home/home-hero"
import { HomeDemonstration } from "../cmps/home/home-demonstration"
import { HomeFeatures } from "../cmps/home/home-features"

export const Home = () => {

    return (
        <div className="home-layout home">
            <HomeHeader />
            <HomeHero />
            <HomeDemonstration />
            <HomeFeatures />
        </div>
    )
}