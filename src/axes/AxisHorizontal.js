import React from "react";
import * as d3 from "d3";

const AxisHorizontal = ({ dimensions, label, formatTick, scale }) => {
    const { boundedWidth, boundedHeight } = dimensions;

    const tickCount =
        boundedWidth < 500 ? boundedWidth / 100 : boundedWidth / 200;

    const ticks = scale.ticks(tickCount);

    return (
        <g transform={`translate(0, ${boundedHeight})`}>
            <line className="Axis__line" stroke="black" x2={boundedWidth} />
            {ticks.map(tick => (
                <text
                    key={tick}
                    className="Axis__tick"
                    transform={`translate(${scale(tick)}, 25)`}
                >
                    {formatTick(tick)}
                </text>
            ))}
            {label && (
                <text
                    className="Axis__label"
                    transform={`translate(${dimensions.boundedWidth / 2}, 60)`}
                >
                    {label}
                </text>
            )}
        </g>
    );
};

export default AxisHorizontal;
