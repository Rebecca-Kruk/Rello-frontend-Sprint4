import { Link } from "react-router-dom"
import homeHero from "../../assets/img/home-hero.webp"

export const HomeHero = () => {

    return (
        <section className="flex home-hero">
            <div className="hero-text">
                <h1 className="hero-title">
                    Rello helps teams move work forward.
                </h1>

                <p className="hero-paragraph">
                    Collaborate, manage projects, and reach new productivity peaks.
                    From high rises to the home office, the way your team works is unique—accomplish it all with Rello.
                </p>

                <Link to="/template" className="btn-primary-home">Try now</Link>
            </div>

            <img src={homeHero} alt="" className="hero-img" />
        </section>
    )
}