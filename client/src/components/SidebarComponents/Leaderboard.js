import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import axiosClient from "../../axiosDefaults";

// component imports
import LeaderboardUI from "./LeaderboardUI";

function Leaderboard(props) {
    let [lbStyles, setLbStyles] = useState("");
    let [listStyles, setListStyles] = useState("");
    let [data, setData] = useState([]);
    let [collapsed, setCollapsed] = useState(props.mobile);

    /** Sort leaderboard by weeklyXP descending
     * @name sortData
     * @param { Array } data
     * @returns { Array } data - sorted
     */
    let sortDataByXP = (data) => {
        data.sort((a, b) => (a.weeklyXP < b.weeklyXP) ? 1 : -1);
        return data;
    }

    // if user is authenticated, get their leaderboard group
    useEffect(() => {
        if (props.isAuthenticated) {
            axiosClient.get(`/api/v1/groups/${props.user.groupID}`)
                .then(res => {
                    setData(sortDataByXP(res.data.group.users));
                })
                .catch(err => { console.log(err); })
        }
    }, [props.user.groupID, props.user.weeklyXP]);


    // NOTE: I am unhappy with these functions for generating styles. There must be a
    // more readable way of conditionally adding and removing styles in tailwind. This
    // would be simple in plain css.
    // TODO: consider just using plain css here. 
    let _calculateLeaderboardStyles = useCallback((collapsed, mobile) => {
        if (!mobile) return `border-b-[2px] border-black min-h-[35vh] 
            fixed pr-1 pointer-events-none`;
        let styles = `cursor-pointer relative transition-all 
            bg-white border-b-[2px] border-black`;
        if (collapsed) styles += " translate-y-0";
        if (!collapsed) styles += " -translate-y-[84px]";
        return styles;
    }, [collapsed, props.mobile])
    let _calculateLeaderboardListStyles = useCallback((collapsed, mobile) => {
        let styles = "";
        if (collapsed) styles += " hidden opacity-0";
        if (!collapsed) styles += " opacity-1 h-full";
        if (!mobile) styles += `h-min-[30vh] 
            h-max-[50vh] lg:px-1`;
        if (mobile) {
            styles += " relative";
            if (collapsed) {
                document.getElementById("root")
                    .classList.remove("scroll-lock");
            } else {
                styles += " h-screen";
                document.getElementById("root")
                    .classList.add("scroll-lock");
            }
        }
        return styles;
    }, [collapsed, props.mobile])
    useEffect(() => {
        setLbStyles(_calculateLeaderboardStyles(collapsed, props.mobile));
        setListStyles(_calculateLeaderboardListStyles(collapsed, props.mobile));
    }, [collapsed, props.mobile])

    return(
        <LeaderboardUI
            lbStyles={lbStyles} 
            listStyles={listStyles} 
            collapsible={props.mobile}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            data={data} 
        />
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    mobile: state.display.mobile,
    vh: state.display.singleVH,
});

export default connect(
    mapStateToProps,
    {}
)(Leaderboard);