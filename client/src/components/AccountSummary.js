import React, { useState } from "react";
import { connect } from "react-redux";
import { useSpring, animated, config } from 'react-spring';

function AccountSummary(props) {
    let [xpAnimFinished, setXpAnimFinished] = useState(false);
    const spring = useSpring({ 
        to: { xp: props.user.totalXP }, 
        from: { xp: 0 }, 
        delay: 500, 
        config: config.molasses,
        onRest: () => setXpAnimFinished(true) 
    });

    return(
        <div className="flex flex-col justify-evenly h-full absolute top-0 w-full p-10">
            <div id="acct-name" className="w-full flex items-center justify-evenly my-8 px-4 font-normal">
                <h2 className="text-4xl my-2">
                    Hi&nbsp;
                    <span className="font-bold">
                        {props.user.firstName}!
                    </span>
                </h2>
            </div>
            <div id="total-xp" className="w-full flex items-center justify-evenly no-highlight my-8 px-4">
                <div className="w-4/12 flex flex-col items-center justify-center">
                    <div className="text-3xl my-1 w-full text-left font-normal">You have</div>
                    <div className="text-5xl mb-1 w-full flex justify-end">
                        <animated.div className="mr-4">
                            {spring.xp.to(xp => Math.floor(xp))}
                        </animated.div> XP!
                    </div>
                </div>
                <div className="w-3/12 flex flex-col items-center justify-center p-4">
                    {/* { props.user.totalXP > 0 ? <Smiley /> : <Frowney /> } */}
                    { xpAnimFinished ? <Smiley /> : <Frowney /> }
                </div>
            </div>
            <div id="no-lessons" className="w-full flex items-center justify-left my-12 px-4">
                <p className="my-2 text-2xl font-normal">
                    You have completed&nbsp;
                    <span className="font-bold">
                        {props.user.progress.length}
                    </span>&nbsp;lessons.
                </p>
            </div>
        </div>
    )
}

function Smiley(props) {
    return(
        <svg width="100%" viewBox="0 0 94 61" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 36.5L23.5 56.5H71L91 36.5" stroke="black" stroke-width="8"/>
            <path d="M28 0V21M66 0V21" stroke="black" stroke-width="8"/>
        </svg>
    )
}

function Frowney(props) {
    return(
    <svg width="100%" viewBox="0 0 94 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 56.5L23 36.5H70.5L90.5 56.5" stroke="black" stroke-width="8"/>
        <path d="M27.5 0V21M65.5 0V21" stroke="black" stroke-width="8"/>
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