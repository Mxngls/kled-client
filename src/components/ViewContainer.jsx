import React from "react";

const ViewContainer = ({ content, k }) => {
    return (
        <div className={"view-content-container"} key={k}>
            {content}
        </div>
    );
};

export default ViewContainer;
