import React, { useState } from "react";
import { connect } from "react-redux";
import { useSpring, animated, config } from 'react-spring';

import FormSubmitButton from "../FormComponents/FormSubmitButton";

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
            className="h-full w-full"
        >
            <form 
                noValidate 
                onSubmit={() => { props.logoutUser() }} 
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
                        Some other statistic
                    </h3>
                    <h3 className="md:text-lg">
                        Placeholder placehold
                    </h3>
                </div>
                <div 
                    id="total-xp" 
                    className="w-full flex items-center p-4
                        no-highlight h-1/6 md:h-2/6 rounded bg-primary shadow-xl
                        text-white"
                >
                    <div className="h-full w-3/12 flex items-center justify-center">🔥</div>
                    <div className="flex flex-col justify-evenly">
                        <h2 className="text-xl font-normal">You're on a</h2>
                        <h2 className="text-2xl">X day streak!</h2>
                    </div>
                </div>
                <div className="flex justify-between h-1/6 py-1">
                    <SmallBubble>
                        Test1!
                    </SmallBubble>
                    <SmallBubble>
                        <div>
                            <span>You've finished </span>
                            <span className="font-bold">
                                {props.user?.progress?.length}
                            </span>&nbsp;lessons!
                        </div>
                    </SmallBubble>
                </div>
                {/* <div 
                    id="total-xp" 
                    className="w-full flex items-center justify-evenly 
                        no-highlight h-2/6"
                >
                    <div className="md:w-4/12 w-6/12 md:mr-0 mr-10 
                        flex flex-col items-center justify-center"
                    >
                        <div className="lg:text-3xl md:text-2xl text-xl md:my-1 
                            w-full text-left font-normal"
                        >
                            You have
                        </div>
                        <div className="lg:text-5xl md:text-4xl text-2xl md:mb-1 
                            w-full flex justify-end"
                        >
                            <animated.div className="mr-4">
                                {XPSpring.xp.to(xp => Math.floor(xp))}
                            </animated.div> XP!
                        </div>
                    </div>
                    <div className="md:w-3/12 max-w-[100px] 
                        md:max-w-sm md:min-w-[140px] w-4/12 
                        md:p-4 flex flex-col items-center justify-center"
                    >
                        { xpAnimFinished ? <Smiley /> : <Frowney /> }
                    </div>
                </div> */}
                {/* <div 
                    id="no-lessons" 
                    className="w-full flex items-center justify-left px-4 h-1/6"
                >
                    <p className="my-2 md:text-2xl text-lg font-normal">
                        You have completed&nbsp;
                        <span className="font-bold">
                            {props.user?.progress?.length}
                        </span>&nbsp;lessons.
                    </p>
                </div> */}
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
        className="rounded shadow-xl border-[1px] border-slate-300
            mt-[10px] h-full flex justify-center items-center p-2 md:p-4"
        >
            { children }
        </div>
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