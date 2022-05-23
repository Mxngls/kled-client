import React from "react";

const Word = ({ last, isView, content, k }) => {
    let subClass = "";
    let mode = "";
    if (isView) mode = " view"
    if (last) subClass = " last";
    return (
        <div className={`word${subClass}${mode}`} key={k}>
            {content}
        </div>
    );
};

export default Word;
