import React from "react";
import { Example } from "../components/SenseComponents";

const renderExamples = (examples) => {
    let content = [];
    for (let i = 0; i < examples.length; i++) {
        content.push(<Example content={examples[i]} key={`example-${i}`} />);
    }
    return content;
};

export default renderExamples;
