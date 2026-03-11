import { aboutList } from "../data/aboutList.js";

const AboutPage = () => {

    return (
        <main>
            <div id="about-container">
                <p>About The Project</p>
                <ul>
                    {aboutList.map((aboutLine, index) => (
                        <li className="about-list" key={"line-" + index}>{aboutLine}</li>
                    ))}
                </ul>
            </div>
        </main>
    )
}

export default AboutPage;