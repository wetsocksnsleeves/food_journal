import React, { useRef, useEffect } from "react";

// @ts-expect-error: Just wanted to deploy this app fym
export default function HoldDetector({ onHold, children, className, onClick }) {
    const holdTimeout = useRef(null);

    const handleStart = () => {
        // @ts-ignore
        holdTimeout.current = setTimeout(() => {
            onHold();
        }, 600);
    };

    const handleEnd = () => {
        // @ts-ignore
        clearTimeout(holdTimeout.current);
    };

    const handleLeave = () => {
        // @ts-ignore
        clearTimeout(holdTimeout.current);
    };

    useEffect(() => {
        return () => {
            // @ts-ignore
            clearTimeout(holdTimeout.current);
        };
    }, []);

    return (
        <div
            onMouseDown={handleStart}
            onMouseUp={handleEnd}
            onMouseLeave={handleLeave}
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
            onTouchCancel={handleEnd} // Important for touch events
            onTouchMove={handleLeave} // Important for touch events
            onClick={onClick}
            className={className}
            style={{ userSelect: "none" }}
        >
            {children}
        </div>
    );
}
