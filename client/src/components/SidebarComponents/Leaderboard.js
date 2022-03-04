import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axiosClient from "../../axiosDefaults";

import Loader from "../Loader";

function Leaderboard(props) {
    let [data, setData] = useState([]);

    let sortData = (data) => {
        data.sort((a, b) => (a.weeklyXP < b.weeklyXP) ? 1 : -1)
        return data;
    }

    useEffect(() => {
        if (props.isAuthenticated) {
            axiosClient.get(`/api/users/group_data/${props.user.groupID}`)
                .then(res => {
                    console.log(res.data);
                    setData(sortData(res.data.group.users));
                })
                .catch(err => { console.log(err); })
        }
    }, [props.user.groupID, props.user.weeklyXP])

    return(
        <div id="leaderboard">
            <div className="header">Weekly Leaderboard</div>
            <div id="leaderboard-list">
                { data.length > 0 ? (
                    data.map((user, index) => 
                        <UserEntry 
                            user={user}
                            key={index} 
                        />
                    )
                ) : (
                    <div className="center" style={{
                        minHeight: "30vh", 
                        maxHeight: "40vh"
                    }}>
                        <Loader />
                    </div>
                ) }
            </div>
        </div>
    )
}

function UserEntry(props) {
    return(
        <div className="user-entry">
            <p>{props.user.username}</p>
            <p>{props.user.weeklyXP}XP</p>
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(
    mapStateToProps,
    {
    }
)(Leaderboard);