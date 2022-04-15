import React, {  } from "react";
import { useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';

function Caption({ children }) {
    const { width } = useThree((state) => state.viewport)
    return (
        <Text
            position={[0, 0, -5]}
            lineHeight={0.8}
            fontSize={width / 8}
            material-toneMapped={false}
            anchorX="center"
            anchorY="middle">
            {children}
        </Text>
    )
}

export default Caption;