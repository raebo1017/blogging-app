import Posts from "../../components/posts/Posts"
import Stories from "../../components/stories/Stories"
import home from "./home.scss"
import Share from "../../components/share/Share"
const Home = () => {
    return (
        <div>
            <Stories />
            <Share />
            <Posts />
        </div>
    )
}

export default Home