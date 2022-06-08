import React, { useState } from "react";
import { connect } from "react-redux";
import { useSpring, animated, config } from 'react-spring';

import FormSubmitButton from "../FormComponents/FormSubmitButton";

import Lottie from "react-lottie-player";
import fireAnim from "../../res/animations/fire.json";

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
                        no-highlight h-1/6 rounded 
                        bg-primary dark-accent shadow-lg text-white"
                >
                    <div className="h-full w-3/12 flex items-center justify-center">
                        <Lottie 
                            rendererSettings={{ 
                                preserveAspectRatio: 'xMidYMid slice' 
                            }}
                            className={`h-5/6`}
                            animationData={fireAnim} 
                            loop 
                            play={xpAnimFinished}
                        />
                    </div>
                    <div className="flex flex-col justify-evenly">
                        <h2 className="text-xl font-normal">You're on a</h2>
                        <h2 className="text-2xl">X day streak!</h2>
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
                                You've finished
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
        className="rounded shadow-md border-[1px] border-slate-200 md:text-xl
            mt-[10px] h-full flex flex-col justify-center items-start p-2 px-4 md:p-4
            font-normal z-10 dark-elevated"
        >
            { children }
        </div>
    )
}

// function Smiley(props) {
//     return(
//         <svg width="100%" viewBox="0 0 94 61" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M3.5 36.5L23.5 56.5H71L91 36.5" stroke="black" strokeWidth="8"/>
//             <path d="M28 0V21M66 0V21" stroke="black" strokeWidth="8"/>
//         </svg>
//     )
// }

// function Frowney(props) {
//     return(
//     <svg width="100%" viewBox="0 0 94 60" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M3 56.5L23 36.5H70.5L90.5 56.5" stroke="black" strokeWidth="8"/>
//         <path d="M27.5 0V21M65.5 0V21" stroke="black" strokeWidth="8"/>
//     </svg>
//     )
// }

//pull relevant props from redux state
const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(
    mapStateToProps,
    {}
)(AccountSummary);