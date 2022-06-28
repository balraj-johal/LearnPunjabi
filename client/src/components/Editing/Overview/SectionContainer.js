import React, {  } from "react";

import FormInput from "../../FormComponents/FormInput";

function SectionContainer(props) {
    const [sectionType, setSectionType] = useState("oneCol");

    return(
        <div 
            className="flex justify-between items-center relative w-full
                rounded border-2 my-4 h-24 bg-white shadow-lg"
            id={`section-${props.index}`}
        >
            <FormInput
                for="sectionType"
                type="select"
                value={sectionType}
                onChange={setSectionType}
                options={["oneCol", "twoCol"]}
            />
        </div>
    )
}

export default SectionContainer;