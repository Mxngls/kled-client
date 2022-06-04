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

const renderSenses = ({ result, id, input, search, setSearch }) => {
    let senses = [];
    console.log(result)
    for (let i = 0; i < result.length; i++) {
        let sense = [];
        let senseInfo = [];
        if (result.length > 1) {
            sense.push(<SenseNr index={i} key={`SenseNr-${result["Id"]}`} />);
        }
        for (let key in result[i]) {
            switch (key) {
                case "Reference":
                    if (!search.isSearch && !!result[i]["Reference"]) {
                        senseInfo.push(
                            renderReferences({
                                id: id,
                                refs: result[i]["Reference"],
                                handleOnClickView: handleOnClickView,
                                input: input,
                                search: search,
                                setSearch: setSearch,
                            })
                        );
                    }
                    break;
                case "KrDefinition":
                    break;
                case "Examples":
                    if (result[i][key] !== null) {
                        senseInfo.push(
                            <Examples
                                content={renderExamples(result[i]["Examples"])}
                                i={i}
                                key={`Examples-${id}`}
                            />
                        );
                    }
                    break;
                case "Translation":
                    senseInfo.push(
                        <Translation
                            content={result[i]["Translation"]}
                            key={`Translation-${id}`}
                        />
                    );
                    break;
                case "Definition":
                    senseInfo.push(
                        <Definition
                            content={result[i]["Definition"]}
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
