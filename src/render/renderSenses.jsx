import React from "react";

import renderExamples from "./renderExamples";
import renderReferences from "./renderReferences";

import {
    Translation,
    Definition,
    Examples,
    SenseInfo,
    SenseNr,
} from "../components/SenseComponents";

import { Sense } from "../components/WordComponents";
import handleOnClickView from "../handler/handleOnClickView";

const renderSenses = ({ input, id, isSearch }) => {
    let senses = [];
    for (let i = 0; i < input.length; i++) {
        let sense = [];
        let senseInfo = [];
        if (input.length > 1) {
            sense.push(<SenseNr index={i} key={`SenseNr-${input["Id"]}`} />);
        }
        for (let key in input[i]) {
            switch (key) {
                case "Reference":
                    if (!isSearch && !!input[i]["Reference"]) {
                        senseInfo.push(
                            renderReferences({
                                id: id,
                                refs: input[i]["Reference"],
                                handleOnClickView: handleOnClickView,
                                input: input,
                            })
                        );
                    }
                    break;
                case "KrDefinition":
                    break;
                case "Examples":
                    if (input[i][key] !== null) {
                        senseInfo.push(
                            <Examples
                                content={renderExamples(input[i]["Examples"])}
                                i={i}
                                key={`Examples-${id}`}
                            />
                        );
                    }
                    break;
                case "Translation":
                    senseInfo.push(
                        <Translation
                            content={input[i]["Translation"]}
                            key={`Translation-${id}`}
                        />
                    );
                    break;
                case "Definition":
                    senseInfo.push(
                        <Definition
                            content={input[i]["Definition"]}
                            key={`Definition-${id}`}
                        />
                    );
                    break;
                default:
                // none
            }
        }
        sense.push(
            <SenseInfo content={senseInfo} key={`SenseInfo-Nr${i}-${id}`} />
        );
        senses.push(<Sense content={sense} key={`Sense-Nr${i}-${id}`} />);
    }
    return senses;
};

export default renderSenses;
