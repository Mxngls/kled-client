import React from "react";

const WordInfo = ({ content }) => {
    return <div className="word-info">{content}</div>;
};

const Hangul = ({
    id,
    handleOnClickView,
    content,
    search,
    setSearch,
    input,
}) => {
    let s = {};
    if (search.isSearch) {
        s = { cursor: "pointer" };
    }
    return (
        <div
            onClick={() =>
                handleOnClickView({
                    id: id,
                    search: search,
                    input: input,
                    setSearch: setSearch,
                })
            }
            className={"hangul"}
            style={s}
            dangerouslySetInnerHTML={{
                __html: content,
            }}
        />
    );
};

const Hanja = ({ content }) => {
    return <div className="hanja">{content}</div>;
};

const Pronounciation = ({ content, link, handlePlay }) => {
    return (
        <div className="pronounciation" onClick={() => handlePlay(link)}>
            {content}
        </div>
    );
};

const Level = ({ level, icon }) => {
    let levContainer = [];
    for (let i = 0; i < level; i++) {
        levContainer.push(
            <div key={i} className="star-container">
                {icon}
            </div>
        );
    }
    return <div className="level">{levContainer}</div>;
};

const WordTypeEng = ({ content }) => {
    return <div className="eng-type">{content}</div>;
};

const Inflections = ({
    content,
    links,
    handleOnClickView,
    lang,
    code,
    isSearch,
    setIsSearch,
    view,
    isView,
    setIsView,
    setView,
}) => {
    if (links === null) {
        return (
            <div className="inflection-container">
                <div
                    className="inflection-content"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        );
    } else {
        let l = [];
        let el;
        let sep = "";
        for (let i = 0; i < links.length; i++) {
            if (i !== links.length - 1) {
                sep = ", ";
            }
            el = (
                <>
                    <span
                        class="inflection-link"
                        onClick={() =>
                            handleOnClickView({
                                id: links[i]["Id"],
                                lang: lang,
                                code: code,
                                isSearch: isSearch,
                                setIsSearch: setIsSearch,
                                view: view,
                                setView: setView,
                                isView: isView,
                                setIsView: setIsView,
                            })
                        }
                        dangerouslySetInnerHTML={{ __html: links[i]["Hangul"] }}
                    />
                    <span>{sep}</span>
                </>
            );
            sep = "";
            l.push(el);
        }
        return (
            <div className="inflection-container">
                <div className="inflection-content">
                    {content} {l}
                </div>
            </div>
        );
    }
};

const AnkiButton = ({
    fillSenses,
    result,
    addNote,
    input,
    index,
    invoke,
    link,
}) => {
    return (
        <div
            className="anki-button"
            onClick={async () => {
                fillSenses(result[index]["Id"], input.lang, input.code)
                    .then((senseContent) => {
                        console.log(senseContent);
                        addNote["note"]["fields"] = {
                            id: result[index]["Id"],
                            hangul: `<a href=${link}>${result[index]["Hangul"]}</a>`,
                            pronounciation: result[index]["Pronounciation"],
                            audio: result[index]["Audio"],
                            hanja: result[index]["Hanja"],
                            level: result[index]["Level"],
                            wordTypeEng: result[index]["TypeEng"],
                            senses: senseContent,
                        };
                    })
                    .then(() => {
                        invoke("addNote", 6, addNote);
                    });
            }}
        >
            + Flashcard
        </div>
    );
};

const Sense = ({ content }) => {
    return <div className={"sense"}>{content}</div>;
};

const Senses = ({ senses }) => {
    return <div className="senses">{senses}</div>;
};

export {
    WordInfo,
    Hangul,
    Hanja,
    Pronounciation,
    Level,
    WordTypeEng,
    Inflections,
    AnkiButton,
    Senses,
    Sense,
};
