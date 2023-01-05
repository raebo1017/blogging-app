import { useContext, useState } from "react"
import { AuthContext } from "../../context/authContext"
import "./comments.scss"
import {
    useQuery, useMutation, useQueryClient
} from '@tanstack/react-query'
import { makeRequest } from "../../axios"
import moment from "moment"

const Comments = (props) => {
    const [desc, setDesc] = useState("")
    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(['comments'],
        () =>
            makeRequest.get(`/comments?postid=${props.postid}`).then((res) => {
                return res.data;
            })
    )

    const queryClient = useQueryClient();
    const mutation = useMutation(
        (newComment) => {
            return makeRequest.post("./comments", newComment);
        }, {
        onSuccess: () => {
            //invalidate and fetch
            queryClient.invalidateQueries("comments");
        }
    })

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ desc, postid: props.postid });
        setDesc("");
    }


    return (
        <div className="comments">
            <div className="write">
                <img src={currentUser.profilePic} alt="" />
                <input type="text" placeholder="Write a comment" value={desc} onChange={e => setDesc(e.target.value)} />
                <button onClick={handleClick}>Send</button>
            </div>
            {error ? "Something went wrong" : (isLoading ? "is loading" : data.map((comment) => (
                <div className="comment" key={comment.id}>
                    <img src={comment.profilePic} alt="" />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <div className="date">{moment(comment.createdAt).fromNow()}</div>
                </div>
            )))}
        </div>
    )
}

export default Comments