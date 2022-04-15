import React, { useEffect, useRef, useState } from "react";

const TRANSLATIONS = [
    {
        punjabi: "ਪੰਜਾਬੀ ਸਿੱਖੋ",
        english: "punjabi sikho"
    },
    {
        punjabi: "ਪੰਜਾਬੀ ਸਿੱਖੋ",
        english: "punjabi sikho2"
    },
    {
        punjabi: "ਪੰਜਾਬੀ ਸਿੱਖੋ",
        english: "punjabi sikho3"
    },
]

function TranslationsScroller(props) {
    let [changing, setChanging] = useState(false);
    let [translationIndex, setTranslationIndex] = useState(0);

    let changeToNextTranslation = e => {
        console.log(e.animationName);
        if (e.animationName === "moveUpAndFadeOut") {
            setChanging(false);
            if (translationIndex + 1 === TRANSLATIONS.length) return setTranslationIndex(0);
            return setTranslationIndex(translationIndex + 1);
        }
        setTimeout(() => {
            setChanging(true);
        }, 2000);
    }

    return(
        <div 
            id="examples-scroller" 
            className={`${changing ? "moveUpAndFadeOut" : "fadeIn"}`}
            onAnimationEnd={changeToNextTranslation}
        >
            <div id="punjabi">{TRANSLATIONS[translationIndex].punjabi}</div>
            <div id="translation">- {TRANSLATIONS[translationIndex].english}</div>
        </div>
    )
}

export default TranslationsScroller;