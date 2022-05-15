import React, { useState } from "react";
import { connect } from "react-redux";
import { useSpring, animated, config } from 'react-spring';

import GenericButton from "./GenericButton";

function AccountSummary(props) {
    let [xpAnimFinished, setXpAnimFinished] = useState(false);

    const fadeSpring = useSpring({ 
        to: { opacity: 1 }, 
        from: { opacity: 0 }, 
        delay: 200,
    });
    const XPSpring = useSpring({ 
        to: { xp: props.user.totalXP }, 
        from: { xp: 0 }, 
        delay: 500,
        config: config.molasses,
        onRest: () => setXpAnimFinished(true) 
    });

    return(
        <animated.div 
            style={{opacity: fadeSpring.opacity}}
            className="flex flex-col justify-evenly h-full top-0 w-full"
        >
            <div 
                id="acct-name" 
                className="w-full flex items-center justify-evenly md:my-8 my-2 px-4 font-normal"
            >
                <h2 className="md:text-4xl text-xl my-2">
                    Hi&nbsp;
                    <span className="font-bold">
                        {props.user.firstName}!
                    </span>
                </h2>
            </div>
            <div 
                id="total-xp" 
                className="w-full flex items-center justify-evenly no-highlight md:my-8 my-2 px-4"
            >
                <div className="md:w-4/12 w-6/12 md:mr-0 mr-10 flex flex-col items-center justify-center">
                    <div className="md:text-3xl text-xl md:my-1 w-full text-left font-normal">You have</div>
                    <div className="md:text-5xl text-2xl md:mb-1 w-full flex justify-end">
                        <animated.div className="mr-4">
                            {XPSpring.xp.to(xp => Math.floor(xp))}
                        </animated.div> XP!
                    </div>
                </div>
                <div className="md:w-3/12 w-4/12 flex flex-col items-center justify-center md:p-4">
                    { xpAnimFinished ? <Smiley /> : <Frowney /> }
                </div>
            </div>
            <div id="no-lessons" className="w-full flex items-center justify-left md:my-12 my-2 px-4">
                <p className="my-2 md:text-2xl text-lg font-normal">
                    You have completed&nbsp;
                    <span className="font-bold">
                        {props.user?.progress?.length}
                    </span>&nbsp;lessons.
                </p>
            </div>
            <GenericButton 
                handleClick={() => { props.logoutUser() }} 
                text="Logout" 
            />
        </animated.div>
    )
}

function Smiley(props) {
    return(
        <svg width="100%" viewBox="0 0 94 61" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 36.5L23.5 56.5H71L91 36.5" stroke="black" strokeWidth="8"/>
            <path d="M28 0V21M66 0V21" stroke="black" strokeWidth="8"/>
        </svg>
    )
}

function Frowney(props) {
    return(
    <svg width="100%" viewBox="0 0 94 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 56.5L23 36.5H70.5L90.5 56.5" stroke="black" strokeWidth="8"/>
        <path d="M27.5 0V21M65.5 0V21" stroke="black" strokeWidth="8"/>
    </svg>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(
    mapStateToProps,
    {}
)(AccountSummary);