import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

function DrawLetter(props) {
    // let [drawing, setDrawing] = useState(false);
    let drawingRef = useRef();
    drawingRef.current = false;

    let submitContinue = () => {
        props.submit(true);
    }

    let getMousePos = (canvas, event) => {
        let rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }
    // Get the position of a touch relative to the canvas
    let getTouchPos = (canvas, event) => {
        let rect = canvas.getBoundingClientRect();
        return {
            x: event.touches[0].clientX - rect.left,
            y: event.touches[0].clientY - rect.top
        };
    }

    let ctx;
    let mousePos = { x: 0, y: 0 };
    let lastPos = mousePos;
    // Draw to the canvas
    let renderCanvas = () => {
        console.log("renderCanvas drawing: ", drawingRef.current)
        if (drawingRef.current === true) {
            ctx.moveTo(lastPos.x, lastPos.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            lastPos = mousePos;
        }
    }

    useEffect(() => {
        // should be using react ref here
        let canvas = document.getElementById("drawing-canvas");
        ctx = canvas.getContext("2d");
        ctx.strokeStyle = "#222222";
        ctx.lineWidth = 6;

        canvas.addEventListener("mousedown", (e) => {
            console.log("drawing");
            drawingRef.current = true;
            lastPos = getMousePos(canvas, e);
        });
        canvas.addEventListener("mouseup", (e) => {
            console.log("stopping drawing");
            drawingRef.current = false;
        });
        canvas.addEventListener("mousemove", (e) => {
            mousePos = getMousePos(canvas, e);
        });
        
        // Set up touch events for mobile, etc
        canvas.addEventListener("touchstart", e => {
            if (e.target === canvas) e.preventDefault();
            mousePos = getTouchPos(canvas, e);
            let touch = e.touches[0];
            let mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        });
        canvas.addEventListener("touchend", e => {
            if (e.target === canvas) e.preventDefault();
            let mouseEvent = new MouseEvent("mouseup", {});
            canvas.dispatchEvent(mouseEvent);
        });
        canvas.addEventListener("touchmove", e => {
            if (e.target === canvas) e.preventDefault();
            let touch = e.touches[0];
            let mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        });

        let getCorrectAnimFrameFunction = () => {
            return window.requestAnimationFrame || 
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimaitonFrame 
        }
        
        let draw = () => {
            getCorrectAnimFrameFunction()(draw);
            renderCanvas();
        }

        draw();

        return () => {
            // clear all canvas event listeners
            canvas.replaceWith(canvas.cloneNode(true));
        }
    }, [])

    return(
        <div className="task draw-letter">
            { props.data.text }
            <canvas id="drawing-canvas" width="320" height="320" style={{
                border: "1px solid black"
            }}>

            </canvas>
            <div onClick={()=>{
                submitContinue();
            }}>
                Next &gt;
            </div>
        </div>
    );
}

//pull relevant props from redux state
const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {}
)(DrawLetter);