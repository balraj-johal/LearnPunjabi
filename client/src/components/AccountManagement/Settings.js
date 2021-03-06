import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useSpring, animated } from 'react-spring';

// import redux actions
import { setDarkMode, setDyslexicOption } from "../../actions/optionsActions";

import Toggle from "react-toggle";
import "react-toggle/style.css";

function Settings(props) {
    const [darkMode, setDarkMode] = useState(props.options.darkMode);
    const [dyslexiaFont, setDyslexiaFont] = useState(props.options.dyslexiaFont);

    const spring = useSpring({ 
        to: { opacity: 1 }, 
        from: { opacity: 0 }, 
        delay: 200,
    });

    useEffect(() => {
        props.setDarkMode(darkMode);
        props.setDyslexicOption(dyslexiaFont);
    }, [darkMode, dyslexiaFont])

    return(
        <animated.div 
            aria-labelledby="tab-Settings"
            role="tabpanel" 
            className="mt-2" 
            style={spring}
        >
            <h1 className="visually-hidden">Account Settings</h1>
            <div className="w-full px-4 my-6 flex justify-between items-center">
                <label className="text-md md:text-lg">Dark Mode:</label>
                <Toggle
                    checked={darkMode}
                    icons={false}
                    onChange={() => {setDarkMode(!darkMode)}}
                    className="mr-3"
                />
            </div>
            <div className="w-full px-4 my-6 flex justify-between items-center">
                <label className="text-md md:text-lg">Dyslexic Support Font:</label>
                <Toggle
                    checked={dyslexiaFont}
                    icons={false}
                    onChange={() => {setDyslexiaFont(!dyslexiaFont)}}
                    className="mr-3"
                />
            </div>
        </animated.div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    options: state.options,
});

//connect to redux
export default connect(
    mapStateToProps,
    { setDarkMode, setDyslexicOption }
)(Settings);