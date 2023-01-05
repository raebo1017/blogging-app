import Post from "../post/Post"
import "./posts.scss"
import {
    useQuery,
} from '@tanstack/react-query'
import { makeRequest } from "../../axios"

const Posts = (props) => {
    const { isLoading, error, data } = useQuery(['posts'],
        () =>
            makeRequest.get(`/posts?userid=${props.userid}`).then((res) => {
                return res.data;
            })
    )
    return (
        <div className="posts">
            {error ? "Something went wrong"
                : (isLoading
                    ? "loading"
                    : data.map((post) => {
                        return (
                            <Post post={post} key={post.id} />)
                    }))
            }
        </div>


    )
}

export default Posts;