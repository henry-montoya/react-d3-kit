import React, { Fragment } from "react";
import * as d3 from "d3";
import "./App.css";

const Bars = ({
    data,
    xAccessor,
    yAccessor,
    widthAccessor,
    heightAccessor
}) => {
    return (
        <Fragment>
            {data.map((d, i) => {
                return (
                    <rect
                        className="Bars__rect"
                        key={i}
                        x={xAccessor(d)}
                        y={yAccessor(d)}
                        fill="red"
                        width={d3.max([widthAccessor(d), 0])}
                        height={d3.max([heightAccessor(d), 0])}
                    />
                );
            })}
        </Fragment>
    );
};

export default Bars;