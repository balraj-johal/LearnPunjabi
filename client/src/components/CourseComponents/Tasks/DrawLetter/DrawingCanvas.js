import React, { useEffect, useRef } from "react";

function DrawingCanvas(props) {
    let isDrawing = useRef();
    isDrawing.current = false;
    
    let getMousePos = (canvas, event) => {
        let rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }
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
    
    let renderCanvas = () => {
        if (isDrawing.current === true) {
            ctx.moveTo(lastPos.x, lastPos.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            lastPos = mousePos;
            // setLastPos(mousePos);
        }
    }

    useEffect(() => {
        if (props.clearing) {
            let canvas = document.getElementById("drawing-canvas");
            let context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            props.setClearing(false);
        }
    }, [props.clearing])

    useEffect(() => {
        // should be using react ref here?
        let canvas = document.getElementById("drawing-canvas");
        ctx = canvas.getContext("2d");
        ctx.strokeStyle = "#222222";
        ctx.lineWidth = 6;

        canvas.addEventListener("mousedown", e => {
            isDrawing.current = true;
            lastPos = getMousePos(canvas, e);
            // setLastPos(getMousePos(canvas, e));
        });
        canvas.addEventListener("mouseup", e => {
            isDrawing.current = false;
        });
        canvas.addEventListener("mousemove", e => {
            mousePos = getMousePos(canvas, e);
            // setMousePos(getMousePos(canvas, e));
        });
        
        // Set up touch events for mobile, etc
        canvas.addEventListener("touchstart", e => {
            if (e.target === canvas) e.preventDefault();
            mousePos = getTouchPos(canvas, e);
            // setMousePos(getTouchPos(canvas, e));
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

        canvas.addEventListener("clear", e => {
            console.log("attempting to clear...")
            let canvas = document.getElementById("drawing-canvas");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
        })

        /**
         */
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
        <canvas 
            id="drawing-canvas" 
            width="320" 
            height="320" 
            style={{
                border: "1px solid black"
            }}
        />
    )
}

export default DrawingCanvas;