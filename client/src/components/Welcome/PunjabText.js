import React, { useEffect, useState } from "react";

const PunjabText = React.forwardRef((props, ref) => {
    let [text, setText] = useState("");

    useEffect(() => {
        console.log(ref.current);
    }, [ref.current, window.innerHeight])

    return(
        <div 
            id="punjab-text" 
            className=""
        >
            { text }
        </div>
    )
})

export default PunjabText;