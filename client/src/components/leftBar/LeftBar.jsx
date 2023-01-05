import "./leftBar.scss";
import friends from "../../assets/friends.jpeg";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const LeftBar = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <div className="leftbar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img src={currentUser.profilePic} alt="" />
                        <span>{currentUser.name}</span>
                    </div>
                    <div className="item">
                        <img src={friends} alt="" />
                        <span>Friends</span>
                    </div>
                    <div className="item">
                        <img src={friends} alt="" />
                        <span>Groups</span>
                    </div>
                    <div className="item">
                        <img src={friends} alt="" />
                        <span>Marketplace</span>
                    </div>
                    <div className="item">
                        <img src={friends} alt="" />
                        <span>Watch</span>
                    </div>
                    <div className="item">
                        <img src={friends} alt="" />
                        <span>Memories</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Your shortcuts</span>
                    <div className="item">
                        <img src={friends} alt="" />
                        <span>Events</span>
                    </div>
                    <div className="item">
                        <img src={friends} alt="" />
                        <span>Gaming</span>
                    </div>
                    <div className="item">
                        <img src={friends} alt="" />
                        <span>Gallery</span>
                    </div>
                    <div className="item">
                        <img src={friends} alt="" />
                        <span>Videos</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Others</span>
                    <div className="item">
                        <img src={friends} alt="" />
                        <span>Fundraiser</span>
                    </div>
                    <div className="item">
                        <img src={friends} alt="" />
                        <span>Tutorials</span>
                    </div>
                    <div className="item">
                        <img src={friends} alt="" />
                        <span>Courses</span>
                    </div>
                    <div className="item">
                        <img src={friends} alt="" />
                        <span>Videos</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftBar;