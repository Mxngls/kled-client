import React from "react";

const SenseNr = ({ index }) => {
    return <span className="sense-nr">{`${index + 1}.`}</span>;
};

const SenseInfo = ({ content }) => {
    return <div className={"sense-info"}>{content}</div>;
};

const Definition = ({ content }) => {
    return <span className="english-definition">{" " + content}</span>;
};

const Translation = ({ content }) => {
    return <span className="english-translation"> {content}</span>;
};

const Examples = ({ content }) => {
    return <ul className="examples">{content}</ul>;
};

const Example = ({ content }) => {
    return (
        <li
            className="example"
            dangerouslySetInnerHTML={{
                __html: content,
            }}
        />
    );
};

const Reference = ({
    type,
    value,
    id,
    handleOnClickView,
    search,
    setSearch,
    input,
}) => {
    let refClass = "";
    let r = [];
    if (type !== "") {
        r.push(
            <div className="reference-type" key={"ref-type"}>
                {type}
            </div>
        );
    }
    if (value !== "") {
        if (id !== "") {
            refClass = " link";
        }
        r.push(
            <div
                onClick={() => {
                    if (id !== "") {
                        handleOnClickView({
                            id: id,
                            search: search,
                            input: input,
                            setSearch: setSearch,
                        });
                    } else {
                        return null;
                    }
                }}
                className={`reference-value${refClass}`}
                key={"ref-value"}
            >
                {value}
            </div>
        );
    }
    return <div className="reference">{r}</div>;
};

export {
    SenseNr,
    SenseInfo,
    Definition,
    Translation,
    Examples,
    Example,
    Reference,
};
