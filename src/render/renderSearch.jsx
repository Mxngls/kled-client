import React from "react";

import handleOnClickView from "../handler/handleOnClickView";
import handleOnPlay from "../handler/handleOnPlay";

import renderSenses from "./renderSenses";

import createHTML from "../createHTML";
import addNote from "../addNote.json";
import invoke from "../invoke";

import SearchContainer from "../components/SearchContainer";
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
    AnkiButton,
} from "../components/WordComponents";

import { Star } from "../icons/Star.jsx";

const renderSearch = ({
    result,
    input,
    search,
    setSearch,
    currentPage,
    keyWord,
    setKeyWord,
}) => {
    console.log("renderSearch was called.");
    let words = [];
    for (let i = 0; i < result.length; i++) {
        let wordInfo = [];
        let word = [];
        let link = `https://krdict.korean.go.kr/m/eng/searchResultView?ParaWordNo=${result[i]["Id"]}&nationCode=${input.code}&nation=${input.lang}&viewType=A`;
        let senses = [];
        let type;
        let inflections;
        for (let key in result[i]) {
            switch (key) {
                case "Id":
                    break;
                case "Hangul":
                    wordInfo.push(
                        <Hangul
                            handleOnClickView={handleOnClickView}
                            content={result[i]["Hangul"]}
                            id={result[i]["Id"]}
                            key={`Hangul-${result["Id"]}`}
                            setSearch={setSearch}
                            search={search}
                            input={input}
                        />
                    );
                    break;
                case "Hanja":
                    if (result[i][key] !== "") {
                        wordInfo.push(
                            <Hanja
                                content={result[i]["Hanja"]}
                                key={`Hanja-${result["Id"]}`}
                            />
                        );
                    }
                    break;
                case "Pronounciation":
                    wordInfo.splice(
                        0,
                        0,
                        <Pronounciation
                            handlePlay={handleOnPlay}
                            content={result[i]["Pronounciation"]}
                            link={result[i]["Audio"]}
                            key={`Pronounciation-${result["Id"]}`}
                        />
                    );
                    break;
                case "Level":
                    wordInfo.push(
                        <Level
                            level={result[i]["Level"]}
                            icon={<Star />}
                            key={`Level-${result["Id"]}`}
                        />
                    );
                    break;
                case "TypeEng":
                    if (result[i]["TypeEng"] !== "") {
                        type = (
                            <WordTypeEng
                                content={result[i]["TypeEng"]}
                                key={`Type-${result["Id"]}`}
                            />
                        );
                    }
                    break;
                case "Inflections":
                    if (result[i]["Inflections"] !== "")
                        inflections = (
                            <Inflections
                                content={result[i]["Inflections"]}
                                links={null}
                            />
                        );
                    break;
                case "Senses":
                    if (result[i]["Senses"] !== null)
                        senses.push(
                            renderSenses({
                                result: result[i]["Senses"],
                                id: result[i]["Id"],
                                input: input,
                                search: search,
                                setSearch: setSearch
                            })
                        );
                    break;
                default:
                    break;
            }
        }
        if (result[i]["Senses"] !== null && result[i]["Hangul"][0] !== "-") {
            wordInfo.push(
                <AnkiButton
                    fillSenses={createHTML}
                    result={result}
                    addNote={addNote}
                    key={`Word-Info-${result["Id"]}`}
                    input={input}
                    index={i}
                    invoke={invoke}
                    link={link}
                />
            );
        }
        word.push(<WordInfo content={wordInfo} key={result[i]["Id"]} />);
        inflections && word.push(inflections);
        senses.unshift(type);
        if (result[i]["Senses"] !== null) {
            word.push(
                <Senses senses={senses} key={result[i]["Id"] + "-senses"} />
            );
        }
        if (i === result.length - 1) {
            words.push(
                <Word
                    last={true}
                    content={word}
                    key={result[i]["Id"] + "-word"}
                />
            );
        } else {
            words.push(<Word content={word} key={result[i]["Id"] + "-word"} />);
        }
    }
    return (
        <SearchContainer
            input={input}
            resCount={search.resCount}
            pages={search.pages}
            content={words}
            setSearch={setSearch}
            currentPage={currentPage}
            keyWord={keyWord}
            setKeyWord={setKeyWord}
        />
    );
};

export default renderSearch;
