import React from "react";

import handleOnClickView from "../handler/handleOnClickView";
import handleOnPlay from "../handler/handleOnPlay";

import renderSenses from "./renderSenses";

import ViewContainer from "../components/ViewContainer";
import Word from "../components/Word";

import {
    WordInfo,
    Hangul,
    Hanja,
    Pronounciation,
    Level,
    WordTypeEng,
    Inflections,
    Senses,
} from "../components/WordComponents";

import ReturnButton from "../components/ReturnButton";

import { Star } from "../icons/Star.jsx";

const renderView = ({ result, input, search, setSearch}) => {
    console.log("renderView was called.");
    let content = [];
    let word = [];
    let wordInfo = [];
    let senses = [];
    let type;
    let inflections;
    for (let key in result) {
        switch (key) {
            case "Id":
                break;
            case "Hangul":
                wordInfo.push(
                    <Hangul
                        handleOnClickView={handleOnClickView}
                        content={result["Hangul"]}
                        id={result["Id"]}
                        key={`Hangul-${result["Id"]}`}
                        setSearch={setSearch}
                        search={search}
                        input={input}
                    />
                );
                break;
            case "Hanja":
                wordInfo.push(
                    <Hanja
                        content={result["Hanja"]}
                        key={`Hanja-${result["Id"]}`}
                    />
                );
                break;
            case "Pronounciation":
                wordInfo.splice(
                    0,
                    0,
                    <Pronounciation
                        handlePlay={handleOnPlay}
                        pron={result["Pronounciation"]}
                        link={result["Audio"]}
                        key={`Pronounciation-${result["Id"]}`}
                    />
                );
                break;

            case "Level":
                wordInfo.push(
                    <Level
                        level={result["Level"]}
                        icon={<Star />}
                        key={`Level-${result["Id"]}`}
                    />
                );
                break;
            case "TypeEng":
                type = (
                    <WordTypeEng
                        content={result["TypeEng"]}
                        key={`WordTypeEng-${result["Id"]}`}
                    />
                );
                break;
            case "Senses":
                if (result["Senses"] != null) {
                    senses.push(
                        renderSenses({
                            input: result[key],
                            id: result["Id"],
                            isSearch: search.isSearch,
                        })
                    );
                }
                break;
            case "Inflections":
                if (result["Inflections"] !== "")
                    inflections = (
                        <Inflections
                            content={result["Inflections"]}
                            links={result["InflectionLinks"]}
                            handleOnClickView={() => handleOnClickView()}
                            lang={result.lang}
                            code={result.code}
                        />
                    );
                break;
            default:
            // none
        }
    }
    senses.unshift(type);
    word.push(<WordInfo content={wordInfo} key={result["Id"] + "-info"} />);
    word.push(inflections);
    if (result["Senses"] != null) {
        word.push(<Senses senses={senses} key={result["Id"] + "-senses"} />);
    }
    content.push(
        <ReturnButton
            setSearch={setSearch}
            search={search}
            key={result["Id"] + "-return"}
        />
    );
    content.push(<Word isView={search.isView} content={word} key={result["Id"]} />);
    return <ViewContainer content={content} />;
};

export default renderView;
