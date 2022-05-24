import React, { useEffect, useState } from "react";

function Sub({ langSelect, handleOnClickLang }) {
    return (
        <div className="sub">
            <div className={"lang-select-wrap"}>
                <ul className={`lang-select${langSelect.class}`}>
                    <li>
                        <option
                            onClick={handleOnClickLang}
                            className="advanced-option"
                        >
                            English
                        </option>
                    </li>
                    <li>
                        <option
                            onClick={handleOnClickLang}
                            className="advanced-option"
                        >
                            Thai
                        </option>
                    </li>
                    <li>
                        <option
                            onClick={handleOnClickLang}
                            className="advanced-option"
                        >
                            Japanese
                        </option>
                    </li>
                    <li>
                        <option
                            onClick={handleOnClickLang}
                            className="advanced-option"
                        >
                            Chinese
                        </option>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function SearchForm({
    subActive,
    setSubActive,
    setSearch,
    input,
    setInput,
}) {
    const [inpVal, setInpVal] = useState("");

    const [langSelect, setlangSelect] = useState({
        active: false,
        class: "",
    });

    const langCode = {
        tha: "3",
        eng: "6",
        jpn: "7",
        chn: "11",
    };

    const lang = {
        Thai: "tha",
        English: "eng",
        Japanese: "jpn",
        Chinese: "chn",
    };

    const langReverse = {
        tha: "Thai",
        eng: "English",
        jpn: "Japanese",
        chn: "Chinese",
    };

    const langPlaceholder = {
        eng: "Korean or English",
        tha: "Korean or Thai",
        jpn: "Korean or Japanese",
        chn: "Korean or Chinese",
    };

    const handleSubmitSearch = (event) => {
        event.preventDefault();

        console.log("Search request submitted!");

        const formData = new FormData();
        formData.append("word", inpVal.replace(" ", "+"));
        formData.append("lang", input.lang);
        formData.append("langCode", input.code);
        fetch("http://localhost:8090/search", {
            method: "POST",
            body: formData,
        })
            .then((resp) => resp.json())
            .then((json) => {
                if (!!json.Results) {
                    setSearch(
                        (search) => ({
                            ...search,
                            isSearch: true,
                            resultsSearch: json.Results,
                            isView: false,
                            keyWord: inpVal,
                            resCount: json.ResCount,
                            pages: json.Pages,
                            currentPage: 1,
                        }),
                        setInput((input) => ({ ...input, word: inpVal }))
                    );
                }
            });
    };

    const handleOnChange = (event) => {
        setInpVal(event.target.value);
    };

    const handleOnClickOption = (event) => {
        setInput((input) => ({ ...input, mode: event.target.value }));
    };

    const handleOnClickLang = (event) => {
        setSubActive(
            false,
            setInput(
                (input) => ({ ...input, lang: lang[event.target.value] }),
                setInput(
                    (input) => ({
                        ...input,
                        code: langCode[lang[event.target.value]],
                    }),
                    setlangSelect({ active: false, class: "" })
                )
            )
        );
    };

    const handeOnClickLangOptions = () => {
        if (langSelect.active) {
            setSubActive(false, setlangSelect({ active: false, class: "" }));
        } else if (!langSelect.active) {
            setSubActive(
                true,
                setlangSelect({ active: true, class: " active" })
            );
        }
    };

    const displayArrowLang = () => {
        let arrowLangSelect = "";
        if (langSelect.active === true) {
            arrowLangSelect = "rotate";
        } else if (langSelect.active === false) {
            arrowLangSelect = "";
        }
        return arrowLangSelect;
    };

    let arrowLangSelect = displayArrowLang();

    useEffect(() => {
        const checkSub = (subActive) => {
            if (subActive === false) {
                setlangSelect({ active: false, class: "" });
            }
        };
        checkSub(subActive);
    }, [subActive]);

    return (
        <>
            <div
                className="search-bar-wrap"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="head">
                    <div
                        id="lang-option-button"
                        onClick={handeOnClickLangOptions}
                    >
                        {langReverse[input.lang]}{" "}
                        {<span className={`arrow ${arrowLangSelect}`}>▾</span>}
                    </div>
                    <form onSubmit={handleSubmitSearch} className="form">
                        <input
                            name="search"
                            className="search-bar"
                            type="text"
                            method="post"
                            placeholder={`Please enter a word in ${
                                langPlaceholder[input.lang]
                            }.`}
                            autoComplete="off"
                            onChange={handleOnChange}
                            value={inpVal}
                        />
                    </form>
                </div>
                <Sub
                    subActive={subActive}
                    setlangSelect={setlangSelect}
                    langSelect={langSelect}
                    handleOnClickOption={handleOnClickOption}
                    handleOnClickLang={handleOnClickLang}
                />
            </div>
        </>
    );
}

export default SearchForm;
