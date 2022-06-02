import React, { Suspense, useRef, useEffect, useState } from "react";
import { useInViewport } from 'react-in-viewport';
import { Canvas, useThree } from '@react-three/fiber';

// import utils
import { degreesToRads } from "../../utils/math";

// import components
import ScrollPrompt from "./ScrollPrompt";
import Punjab3 from "./ThreeJS/Punjab3";
import WelcomeLogo from "./WelcomeLogo";
import SignInPrompt from "./SignInPrompt";
// import InfoPoints from "./InfoPoints";
import RiversTop from "./RiversSVGs/RiversTop";
import RiversEnd from "./RiversSVGs/RiversEnd";
import RiversMid from "./RiversSVGs/RiversMid";
import Footer from "./Footer";
import PunjabText from "./PunjabText";
import AccountManager from "../AccountManagement/AccountManager";
import Lesson from "../CourseComponents/Lesson";
import { useSpring, config, animated } from "react-spring";

const EXAMPLE_LESSON = 
{
    "name": "test all",
    "shuffle": false,
    "showInterstitials": true,
    "showPercentCorrect": true,
    "tasks": [
        {
            "taskID": "1",
            "text": "text no audio - Mutations, subscriptions, timers, logging, and other side effects are not allowed inside the main body of a function component (referred to as React’s render phase). Doing so will lead to confusing bugs and inconsistencies in the UI.",
            "type": "TextOnly",
            "audioFilename": "",
            "audio": {
                "name": ""
            }
        },
        {
            "taskID": "2",
            "text": "text audio",
            "type": "TextOnly",
            "audioFilename": "Logging_Send_For_Review.mp3",
            "audioLink": "https://balraj-portfolio-bucket.s3.eu-west-2.amazonaws.com/Logging_Send_For_Review.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUEUMUPDURSWX3FMX%2F20220602%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220602T120818Z&X-Amz-Expires=600000&X-Amz-Signature=17f41e036a29fda368e30228b8431ed74600b363996a19326afb15ddb5b59987&X-Amz-SignedHeaders=host&x-id=GetObject"
        },
        {
            "taskID": "3",
            "text": "Test 1",
            "type": "MultipleChoice",
            "audioFilename": "Error.mp3",
            "possibleAnswers": [
                {
                    "middleText": "1",
                    "bottomText": ""
                },
                {
                    "middleText": "2",
                    "bottomText": ""
                },
                {
                    "middleText": "3",
                    "bottomText": ""
                },
                {
                    "middleText": "4",
                    "bottomText": ""
                }
            ],
            "correctAnswerIndex": "0",
            "audioLink": "https://balraj-portfolio-bucket.s3.eu-west-2.amazonaws.com/Error.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUEUMUPDURSWX3FMX%2F20220602%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220602T120818Z&X-Amz-Expires=600000&X-Amz-Signature=aee43d7f292407483c201b0f615acfb1275e896b76e13d99c1dd429d3193e906&X-Amz-SignedHeaders=host&x-id=GetObject"
        },
        {
            "taskID": "interstitial-0",
            "text": "",
            "type": "Interstitial"
        },
        {
            "taskID": "4",
            "text": "gggggggggg",
            "type": "MultipleChoice",
            "audioFilename": "",
            "audio": {
                "name": ""
            },
            "possibleAnswers": [
                {
                    "middleText": "1",
                    "bottomText": ""
                },
                {
                    "middleText": "2",
                    "bottomText": ""
                },
                {
                    "middleText": "3",
                    "bottomText": ""
                },
                {
                    "middleText": "4",
                    "bottomText": ""
                }
            ],
            "correctAnswerIndex": "0"
        },
        {
            "taskID": "5",
            "text": "1234524",
            "type": "SpecifiedOrder",
            "audioFilename": "",
            "audio": {
                "name": ""
            },
            "possibleAnswers": [
                {
                    "text": "1",
                    "id": "a-0"
                },
                {
                    "text": "2",
                    "id": "a-1"
                },
                {
                    "text": "4",
                    "id": "a-2"
                },
                {
                    "text": "3",
                    "id": "a-3"
                },
                {
                    "text": "2",
                    "id": "a-4"
                },
                {
                    "text": "4",
                    "id": "a-5"
                },
                {
                    "text": "5",
                    "id": "a-6"
                }
            ],
            "correctAnswer": "1234524"
        },
        {
            "taskID": "6",
            "text": "qwerty",
            "type": "SpecifiedOrder",
            "audioFilename": "Logging_Send_For_Review.mp3",
            "possibleAnswers": [
                {
                    "text": "y",
                    "id": "a-0"
                },
                {
                    "text": "t",
                    "id": "a-1"
                },
                {
                    "text": "r",
                    "id": "a-2"
                },
                {
                    "text": "e",
                    "id": "a-3"
                },
                {
                    "text": "w",
                    "id": "a-4"
                },
                {
                    "text": "q",
                    "id": "a-5"
                }
            ],
            "correctAnswer": "qwerty",
            "audioLink": "https://balraj-portfolio-bucket.s3.eu-west-2.amazonaws.com/Logging_Send_For_Review.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUEUMUPDURSWX3FMX%2F20220602%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220602T120818Z&X-Amz-Expires=600000&X-Amz-Signature=17f41e036a29fda368e30228b8431ed74600b363996a19326afb15ddb5b59987&X-Amz-SignedHeaders=host&x-id=GetObject"
        },
        {
            "taskID": "end",
            "text": "Congrats! You've finished the lesson! Now sign up for more :)",
            "type": "End",
            "showPercentCorrect": true,
            "hideButton": true
        }
    ],
    "id": "lesson-test all",
    "requiredCompletions": 75,
    "noToSample": 0,
}

function Welcome(props) {
    let [showAccounts, setShowAccounts] = useState(false);
    let [scrollFrom, setScrollFrom] = useState(0);
    let [scrollTo, setScrollTo] = useState(0);
    // initialise listeners for scroll tracking
    const top = useRef();
    const scrollArea = useRef();
    const welcome1 = useRef();
    const welcome2 = useRef();
    const welcome3 = useRef();
    const welcome4 = useRef();

    const onScroll = e => { 
        top.current = e.target.scrollTop;
        setScrollFrom(top.current);
    };
    useEffect(() => { 
        onScroll({ target: scrollArea.current }) ;
    }, []);

    let handleClick = () => {
        setShowAccounts(!showAccounts);
    }

    const { scroll } = useSpring({
        from: { scroll: scrollFrom },
        to: { scroll: scrollTo },
        // config: config.molasses,
    })

    return(
        <animated.div 
            id="welcome" 
            ref={scrollArea} 
            onScroll={onScroll} 
            scrollTop={scroll}
        >
            <div 
                id="welcome-1" 
                className="welcome-div grad-top h-screen"
                ref={welcome1}
            >
                <WelcomeLogo />
                <RiversTop />
                { showAccounts && <AccountManager /> }
                <SignInPrompt handleClick={handleClick} />
                <ScrollPrompt 
                    text="Try a lesson on us!" 
                    ref={welcome2}
                    setScrollTo={setScrollTo}
                />
            </div>

            <div 
                id="welcome-2" 
                className="welcome-div grad-mid h-screen"
                ref={welcome2}
            >
                {/* <InfoPoints /> */}
                <Lesson lessonOverride={EXAMPLE_LESSON} />
                <RiversMid />
                <ScrollPrompt 
                    text="want to learn about Punjab?" 
                    ref={welcome3}
                    setScrollTo={setScrollTo}
                />
            </div>
            <div 
                id="welcome-3" 
                className="welcome-div grad-mid h-screen"
                ref={welcome3}
            >
                <PunjabInfo ref={top} />
            </div>
            <div 
                id="welcome-4" 
                className="welcome-div grad-end h-screen"
                ref={welcome4}
            >
                <RiversEnd />
                <Footer />
            </div>
        </animated.div>
    )
}

let ThreeJSPunjab = React.forwardRef((props, ref) => {
    // set initial camera rotation
    useThree(({camera}) => {
        camera.rotation.set(degreesToRads(0), degreesToRads(0), 0);
    });

    return(
        <Suspense fallback={null}>
            <Punjab3 
                ref={ref} 
                rotation={[0.5, 0, 0]} 
                setPageIndex={props.setPageIndex} 
            />
            <rectAreaLight
                width={3}
                height={3}
                color={"#666666"}
                intensity={54}
                position={[-2, 0, 5]}
                lookAt={[0, 0, 0]}
                penumbra={1}
                castShadow
            />
        </Suspense>
    )
})

let PunjabInfo = React.forwardRef((props, ref) => {
    let [pageIndex, setPageIndex] = useState(0);
    let [textVisible, setTextVisible] = useState(false);

    return(
        <>
            <div id="stick">
                <RiversMid />
                <div className="w-[70%] h-full relative">
                    <PunjabText 
                        ref={ref} 
                        pageIndex={pageIndex} 
                        setTextVisible={setTextVisible} 
                        textVisible={textVisible}
                    />
                    <Canvas 
                        dpr={[1, 2]} 
                        camera={{ position: [0, 0, 10], fov: 22 }}
                    >
                        <ThreeJSPunjab 
                            ref={ref} 
                            setPageIndex={setPageIndex} 
                        />
                    </Canvas>
                </div>
            </div>
            <ScrollProgressTracker index={0} setPageIndex={setPageIndex} />
            <ScrollProgressTracker index={1} setPageIndex={setPageIndex} />
            <ScrollProgressTracker index={2} setPageIndex={setPageIndex} />
            <ScrollProgressTracker index={3} setPageIndex={setPageIndex} />
            <ScrollProgressTracker index={4} setPageIndex={setPageIndex} />
        </>
    )
})

// empty component used to determine scroll position for Punjab Info position
function ScrollProgressTracker(props) {
    const ref = useRef();
    const { inViewport } = useInViewport( ref );

    useEffect(() => {
        let timeout = setTimeout(() => {
            if (!inViewport) return;
            props.setPageIndex(props.index)
        }, 200);

        return () => { clearTimeout(timeout) };
    }, [inViewport])

    return <div className="h-screen w-full" ref={ref} />
}


export default Welcome;