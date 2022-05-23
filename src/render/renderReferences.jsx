import React from "react";

import { Reference } from "../components/SenseComponents";

const renderReferences = ({id, refs, handleOnClickView, input}) => {
    let refContainer = [];
    for (let i = 0; i < refs.length; i++) {
        refContainer.push(
            <Reference
                type={refs[i]["Type"]}
                value={refs[i]["Value"]}
                id={refs[i]["Id"]}
                handleOnClickView={handleOnClickView}
                lang={input.lang}
                code={input.code}
                key={`Reference-Nr${i}-${id}`}

            />
        );
    }
    return refContainer;
};

export default renderReferences;
