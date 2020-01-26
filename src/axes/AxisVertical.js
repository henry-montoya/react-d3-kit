import React from 'react';
import * as d3 from "d3";

const AxisVertical = ({ dimensions, label, formatTick, scale, showTickMarks }) => {
    const { boundedWidth, boundedHeight } = dimensions;

    const tickCount = dimensions.boundedHeight / 70;

    const ticks = scale.ticks(tickCount);

    return (
        <g className="Axis AxisVertical" transform={`translate(0, 0)`}>
            <line className="Axis__line" y2={boundedHeight} stroke="black" />
            {ticks.map(tick => (
                <>
                    <text
                        key={tick}
                        className="Axis__tick"
                        transform={`translate(-16, ${scale(tick)})`}
                    >
                        {formatTick(tick)}
                    </text>
                    {showTickMarks && (
                        <line
                            className="vert-tick"
                            x1={-5}
                            x2={0}
                            y1={scale(tick)}
                            y2={scale(tick)}
                            stroke="black"
                        />
                    )}
                </>
            ))}
            {label && (
                <text
                    className="Axis__label"
                    style={{
                        transform: `translate(-56px, ${boundedHeight / 2}px) rotate(-90deg)`
                    }}
                >
                    {label}
                </text>
            )}
        </g>
    );
};

export default AxisVertical;