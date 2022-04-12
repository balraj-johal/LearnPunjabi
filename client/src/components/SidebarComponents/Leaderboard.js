import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axiosClient from "../../axiosDefaults";

// component imports
import Loader from "../Loader";
import UserEntry from "./UserEntry";

function Leaderboard(props) {
    let [data, setData] = useState([]);

    /** Sort leaderboard by weeklyXP descending
     * @name sortData
     * @param { Array } data
     * @returns { Array } data - sorted
     */
    let sortData = (data) => {
        data.sort((a, b) => (a.weeklyXP < b.weeklyXP) ? 1 : -1)
        return data;
    }

    // if user is authenticated, get their leaderboard group
    useEffect(() => {
        if (props.isAuthenticated) {
            axiosClient.get(`/api/v1/groups/${props.user.groupID}`)
                .then(res => {
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
                    <div 
                        style={{
                            minHeight: "30vh",
                            maxHeight: "40vh"
                        }}
                        className="center" 
                    >
                        <Loader />
                    </div>
                ) }
            </div>
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
    {}
)(Leaderboard);