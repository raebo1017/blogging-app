import "./post.scss"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Comments from "../comments/Comments";
import moment from "moment";
import {
    useQuery, useMutation, useQueryClient
} from '@tanstack/react-query'
import { makeRequest } from "../../axios"
import { AuthContext } from "../../context/authContext";

const Post = (props) => {
    const [commentOpen, setCommentOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const { currentUser } = useContext(AuthContext)

    const { isLoading, error, data } = useQuery(['likes', props.post.id],
        () =>
            makeRequest.get(`/likes?postid=${props.post.id}`).then((res) => {
                return res.data;
            })
    )

    const queryClient = useQueryClient();
    const mutation = useMutation(
        (like) => {
            if (like) { return makeRequest.delete(`/likes?postid=${props.post.id}`) }
            else {
                return makeRequest.post("/likes", { postid: props.post.id })
            }
        }, {
        onSuccess: () => {
            //invalidate and fetch
            queryClient.invalidateQueries("likes");
        }
    })

    const handleLike = () => {
        mutation.mutate(data.includes(currentUser.id))
    }

    const deleteMutation = useMutation(
        (postid) => {
            return makeRequest.delete(`/posts/${props.post.id}`)
        }
        , {
            onSuccess: () => {
                //invalidate and fetch
                queryClient.invalidateQueries("posts");
            }
        })
    const handleDelete = () => {
        deleteMutation.mutate(props.post.id);
    };

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userinfo">
                        <img src={props.post.img} alt="" />
                        <div className="details">
                            <Link to={`/profile/${props.post.userid}`} style={{ textDecorattion: "none", color: "inherit" }}>
                                <span className="name">{props.post.name}</span>
                            </Link>
                            <span className="date">{moment(props.post.createDate).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
                    {menuOpen && <button onClick={handleDelete}>delete</button>}
                </div>
                <div className="content">
                    <p>{props.post.desc}</p>
                    <img src={`${process.env.PUBLIC_URL}/upload/${props.post.img}`} alt="" />
                </div>
                <div className="info">
                    <div className="item" >
                        {isLoading ? "loading" : data.includes(currentUser.id) ? <FavoriteIcon style={{ color: "red" }} onClick={handleLike} /> : <FavoriteBorderIcon onClick={handleLike} />}
                        {isLoading ? 0 : data.length} likes
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <TextsmsIcon />
                        12 comments
                    </div>
                    <div className="item">
                        <ShareIcon />
                        Share
                    </div>
                </div>
                {commentOpen && < Comments postid={props.post.id} />}
            </div>
        </div>)

}

export default Post;