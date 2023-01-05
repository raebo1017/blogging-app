import "./update.scss"
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const Update = (props) => {
    const [text, setTexts] = useState({
        name: "",
        city: "",
        websites: "",
    })
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);

    const handleChange = (e) => {
        setTexts((prev) => { return { ...prev, [e.target.name]: [e.target.value] } })
    };

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData)
            return res.data
        } catch (err) {
            console.log(err);
        }
    }
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (user) => {
            return makeRequest.put("./users", user);
        }, {
        onSuccess: () => {
            //invalidate and fetch
            queryClient.invalidateQueries(["user"]);
        }
    })

    const handleClick = async (e) => {
        e.preventDefault();

        let coverUrl = cover ? await upload(cover) : props.user.coverPic
        let profileUrl = profile ? await upload(profile) : props.user.profilePic

        mutation.mutate({ ...text, coverPic: coverUrl, profilePic: profileUrl });
        props.setOpenUpdate(false);

    }
    return (
        <div className="update">Update
            <form>
                <input type="file" onChange={e => setCover(e.target.files[0])} />
                <input type="file" onChange={e => setProfile(e.target.files[0])} />
                <input type="text" name="name" onChange={handleChange} />
                <input type="text" name="city" onChange={handleChange} />
                <input type="text" name="website" onChange={handleChange} />
                <button onClick={handleClick}>update</button>
            </form>
            <button onClick={() => props.setOpenUpdate(false)}>X</button>
        </div>

    )
}