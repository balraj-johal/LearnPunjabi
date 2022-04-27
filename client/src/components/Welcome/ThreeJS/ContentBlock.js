import React, { createContext, useRef, useContext } from "react";
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils } from "three";

const offsetContext = createContext(0);

/**
 * @name Block
 * @type Component
 * @param {Component} children - Child components to render
 * @param {Number} offset - index of content block used to offset content
 * @param {Number} factor - value controlling block's speed and direction
 * @param {Object} props - remaining react props
*/
let Block = React.forwardRef(({ children, offset, factor, ...props }, ref) => {
    const groupRef = useRef();
    // Fetch parent offset and the height of a single section
    const { offset: parentOffset, sectionHeight } = useBlock();
    offset !== undefined ? offset = offset : offset = parentOffset;

    // Runs every frame and lerps the inner block into its place
    useFrame(() => {
        const curY = groupRef.current.position.y;
        const curTop = ref.current;
        // groupRef.current.position.y = 
        //     MathUtils.lerp(curY, (curTop / 75) * factor, 0.1);
        //     // MathUtils.lerp(curY, (curTop / state.zoom) * factor, 0.1);
    })

    return (
        <offsetContext.Provider value={offset}>
            <group 
                {...props} 
                position={[0, -sectionHeight * offset * factor, 0]}
            >
                <group ref={groupRef} >
                    {children}
                </group>
            </group>
        </offsetContext.Provider>
    )
})

function useBlock() {
    const sections = 3;
    const pages = 3;
    const zoom = 1;
    // const { sections, pages, zoom } = {3, 3, 75};
    const { viewport } = useThree();
    const offset = useContext(offsetContext);
    const canvasWidth = viewport.width / zoom;
    const canvasHeight = viewport.height / zoom;
    console.log("canvasHeight is ", canvasHeight)
    const sectionHeight = canvasHeight * ((pages - 1) / (sections - 1));
    console.log("section height is ", sectionHeight)
    return { 
        offset, 
        canvasWidth, 
        canvasHeight, 
        sectionHeight 
    };
}

export { Block, useBlock };