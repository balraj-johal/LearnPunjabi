import React, {  } from "react";
import { useThree } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';

function Caption({ children, ...props }) {
    const { width } = useThree((state) => state.viewport);

    return (
        <Billboard
            follow={true}
            lockX={false}
            lockY={false}
            lockZ={false}
        >
            <Text
                lineHeight={0.8}
                fontSize={width / 16}
                material-toneMapped={false}
                anchorX="center"
                anchorY="middle"
            >
                {children}
            </Text>
        </Billboard>
    )
}

export default Caption;