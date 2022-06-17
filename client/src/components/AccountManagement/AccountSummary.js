import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useSpring, animated, config } from 'react-spring';

import { useRefreshToken } from "../../actions/authActions";

import FormSubmitButton from "../FormComponents/FormSubmitButton";

import Lottie from "react-lottie-player";
import fireAnim from "../../res/animations/fire.json";

function AccountSummary(props) {
    let [xpAnimFinished, setXpAnimFinished] = useState(false);
    let [streakAnimFinished, setStreakAnimFinished] = useState(false);

    const fadeSpring = useSpring({ 
        to: { opacity: 1 }, 
        from: { opacity: 0 }, 
        delay: 200,
    });
    const XPSpring = useSpring({ 
        to: { xp: props.user.totalXP }, 
        from: { xp: 0 }, 
        delay: 750,
        config: config.molasses,
        onRest: () => setXpAnimFinished(true) 
    });
    const StreakSpring = useSpring({ 
        to: { streak: props.user.streak }, 
        from: { streak: 0 }, 
        delay: 750,
        // config: config.molasses,
        onRest: () => setStreakAnimFinished(true) 
    });

    /**
     * converts isoDate format to more readable string
     * @name ISODateToReadableStr
     * @param {String} isoDate - date in ISO format
     * @returns {String} date in DD/MM/YYYY format
     */
    let ISODateToReadableStr = (isoDate) => {
        let date = new Date(isoDate);
        return `${date.toLocaleDateString()}`
    }

    useEffect(() => {
        props.useRefreshToken();
    }, [])

    return(
        <animated.div 
            style={{opacity: fadeSpring.opacity}}
            className="h-full w-full"
        >
            <form 
                noValidate 
                onSubmit={(e) => { 
                    e.preventDefault();
                    props.logoutUser();
                }} 
                className="flex flex-col h-full top-0 w-full justify-evenly"
            >
                <div 
                    id="acct-name" 
                    className="w-full flex flex-col
                        font-normal h-2/6 justify-center"
                >
                    <h2 className="md:text-3xl text-xl my-2">
                        Hi&nbsp;
                        <span className="font-bold">
                            {props.user.firstName}!
                        </span>
                    </h2>
                    <h3 className="md:text-lg">
                        Learning since { ISODateToReadableStr(props.user.createdAt) }
                    </h3>
                </div>
                <div 
                    id="total-xp" 
                    className="w-full flex items-center py-4 px-7 relative
                        no-highlight h-1/6 rounded 
                        bg-primary dark-accent shadow-lg text-white"
                >
                    <div 
                        className="flex flex-col justify-evenly transition-all" 
                        style={{transform: streakAnimFinished ? "translate(0%, 0)" : "translate(0%, 0)"}}
                    >
                        <h2 className="text-lg md:text-xl font-normal">You're on a</h2>
                        <h2 className="text-xl md:text-2xl">
                            <animated.span className="md:text-2xl">
                                {StreakSpring.streak.to(streak => {
                                    return Math.floor(streak)
                                })}
                            </animated.span> day streak!
                        </h2>
                    </div>
                    <div className="h-full w-3/12 flex items-center justify-center">
                        <Lottie 
                            rendererSettings={{ 
                                preserveAspectRatio: 'xMidYMid slice' 
                            }}
                            className={`h-5/6 transition-all`}
                            animationData={fireAnim} 
                            loop 
                            play={streakAnimFinished}
                            style={{opacity: streakAnimFinished ? 1 : 0}}
                        />
                    </div>
                    <div className="flex flex-col justify-evenly">
                        <h2 className="text-lg md:text-xl font-normal">
                            You're on a
                        </h2>
                        <h2 className="text-xl md:text-2xl">
                            <animated.span className="md:text-2xl">
                                {StreakSpring.streak.to(streak => {
                                    return Math.floor(streak)
                                })}
                            </animated.span> day streak!
                        </h2>
                    </div>
                </div>
                <div className="flex flex-row justify-between 
                    h-1/6 py-1">
                    <SmallBubble>
                        <div className="font-normal md:text-xl">
                            You have
                        </div>
                        <div className="font-bold">
                            <animated.span className="md:text-2xl">
                                {XPSpring.xp.to(xp => Math.floor(xp))}
                            </animated.span>
                            <span className="md:text-2xl"> XP!</span>
                        </div>
                    </SmallBubble>
                    <SmallBubble>
                            <span className="md:text-xl">
                                You've done
                            </span>
                            <div>
                                <span className="md:text-2xl font-bold">
                                    {props.user?.progress?.length}
                                </span> 
                                {props.user?.progress?.length === 1 ? " lesson!" : " lessons!"}
                            </div>
                    </SmallBubble>
                </div>
                <div className="h-1/6" />
                <div className="h-1/6">
                    <FormSubmitButton for="Logout" />
                </div>
            </form>
        </animated.div>
    )
}

function SmallBubble({ children }) {
    return(
        <div 
            style={{width: "calc(50% - 5px)"}}
        className="rounded shadow-md border-[1px] border-slate-200 
            md:text-xl md:py-4
            mt-[10px] h-full flex flex-col justify-center items-start py-2 px-7
            font-normal z-10 dark-tertiary"
        >
            { children }
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(
    mapStateToProps,
    { useRefreshToken }
)(AccountSummary);