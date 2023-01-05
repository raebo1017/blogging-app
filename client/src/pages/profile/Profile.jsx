import "./profile.scss"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Posts from "../../components/posts/Posts";
import { useContext, useState } from "react";
import {
    useQuery, useMutation, useQueryClient
} from '@tanstack/react-query'
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { Update } from "../../components/update/Update";

const Profile = () => {
    const { currentUser } = useContext(AuthContext)
    const [openUpdate, setOpenUpdate] = useState(false)
    const userid = parseInt(useLocation().pathname.split("/")[2]);

    const { isLoading, error, data } = useQuery(['user'],
        () =>
            makeRequest.get(`/users/find/${userid}`).then((res) => {
                return res.data;
            })
    )

    const { isLoading: loading, error: err, data: relationships } = useQuery(['relationship'],
        () =>
            makeRequest.get(`/relationships?followedUserId=${userid}`).then((res) => {
                return res.data;
            })
    )

    const queryClient = useQueryClient();
    const mutation = useMutation(
        (following) => {
            if (following) { return makeRequest.delete(`/relationships?userid=${userid}`) }
            else {
                return makeRequest.post("/relationships", { userid })
            }
        }, {
        onSuccess: () => {
            //invalidate and fetch
            queryClient.invalidateQueries("relationship");
        }
    })

    const handleFollow = () => {
        mutation.mutate(relationships.includes(currentUser.id))
    }

    return (
        <div className='profile'>
            {isLoading ? "is loading" :
                <>
                    <div className="images">
                        <img src={data.coverPic} alt="" className="cover" />
                        <img src={data.profilePic} alt="" className="profile" />
                    </div>
                    <div className="profileContainer">
                        <div className="uinfo">
                            <div className="left">
                                <a href="http://facebook.com">
                                    <FacebookIcon fontSize="large" />
                                </a>
                                <a href="http://facebook.com">
                                    <TwitterIcon fontSize="large" />
                                </a>
                                <a href="http://facebook.com">
                                    <LinkedInIcon fontSize="large" />
                                </a>
                                <a href="http://facebook.com">
                                    <EmailIcon fontSize="large" />
                                </a>
                            </div>
                            <div className="center">
                                <span>{data.username}</span>
                                <div className="info">
                                    <div className="item">
                                        <PlaceIcon />
                                        <span>{data.city}</span>
                                    </div>
                                    <div className="item">
                                        <LanguageIcon />
                                        <span>{data.website}</span>
                                    </div>
                                </div>
                                {userid === currentUser.id ? (<button onClick={() => setOpenUpdate(true)}> update</button>) :
                                    <button onClick={handleFollow}>{loading ? "is loading" : relationships.includes(currentUser.id) ? "Following" : "Follow"}</button>}


                            </div>

                            <div className="right">
                                <EmailIcon />
                                <MoreHorizIcon />

                            </div>
                        </div>

                        <Posts userid={userid} />
                    </div>
                </>}

            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
        </div>


    )
}

export default Profile