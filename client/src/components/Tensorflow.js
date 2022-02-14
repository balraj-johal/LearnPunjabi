import React, { useEffect } from "react";
import { connect } from "react-redux";

// import useScript from 'hooks/useScript';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

import { MnistData } from "../res/tfdata";

function Tensorflow(props) {
    // useScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js');
    // useScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis@1.0.2/dist/tfjs-vis.umd.min.js');

    async function showExamples(data) {
        const surface = tfvis.visor().surface({
            name: "Input Data Examples",
            tab: "Input Data"
        })
        const examples = MnistData.nextTestBatch(20);
        const numExamples = examples.xs.shape[0]; 
    }

    useEffect(() => {
        console.log(tf);
    })

    return(
        <div id="tensorflow">
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {
    }
)(Tensorflow);