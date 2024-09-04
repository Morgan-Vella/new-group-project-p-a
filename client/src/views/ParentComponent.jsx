import React, { useState, useEffect } from "react";
import CreateArt from "./CreateArt";
import UserService from "../services/UserService";

const ParentComponent = () => {
    const [userId, setUserId] = useState("");

    useEffect(() => {
        // Fetch user ID or some other logic to set userId
        // For example, after login or user selection
        const fetchUserId = async () => {
            const user = await UserService.getUserId(someId); // Replace someId with actual ID
            setUserId(user._id); // Assume user._id is the user ID
        };

        fetchUserId();
    }, []);

    return (
        <div>
            <CreateArt userId={userId} />
        </div>
    );
};

export default ParentComponent;
