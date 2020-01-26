import React from "react";

const Chart = ({ dimensions, children }) => {
    const { width, height, marginLeft, marginTop } = dimensions;
    return (
        <svg className="chart-base" width={width} height={height}>
            <g transform={`translate(${marginLeft}, ${marginTop})`}>{children}</g>
        </svg>
    );
};

export default Chart;
