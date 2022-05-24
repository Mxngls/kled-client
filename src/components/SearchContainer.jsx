import React from "react";

const SearchContainer = ({
    resCount,
    setSearch,
    input,
    content,
    pages,
    currentPage,
    keyWord,
    k,
}) => {
    const handleSubmitSearch = (event, page) => {
        if (page !== currentPage) {
            event.preventDefault();
            console.log("test");
            console.log("Search request submitted!");
            const formData = new FormData();
            formData.append("word", input.word.replace(" ", "+"));
            formData.append("lang", input.lang);
            formData.append("langCode", input.code);
            formData.append("page", page);
            fetch("http://localhost:8090/search", {
                method: "POST",
                body: formData,
            })
                .then((resp) => resp.json())
                .then((json) => {
                    json.Results !== null &&
                        setSearch((search) => ({
                            ...search,
                            isSearch: true,
                            isView: false,
                            resultsSearch: json.Results,
                            resCount: json.ResCount,
                            pages: json.Pages,
                            keyWord: input.word,
                            currentPage: page,
                        }));
                });
        }
    };
    let s = "one result";
    let p = [];
    let results = "";
    for (let i = 0; i < pages.length; i++) {
        if (pages[i] > 0) {
            p.push(
                <div
                    key={i}
                    onClick={(event) => handleSubmitSearch(event, pages[i])}
                >
                    {<div className={`page ${currentPage === pages[i] ? "active" : ""}`}>{pages[i]}</div>}
                </div>
            );
        } else if (pages[i] === -4) {
            p.push(
                <div key={i} onClick={(event) => handleSubmitSearch(event, 1)}>
                    {<div className="page">{"<<"}</div>}
                </div>
            );
        } else if (pages[i] === -3) {
            let inpPage = 0;
            if (currentPage % 10 !== 0) {
                inpPage = currentPage - (currentPage % 10);
            } else {
                inpPage = currentPage - 10;
            }
            p.push(
                <div
                    key={i}
                    onClick={(event) => handleSubmitSearch(event, inpPage)}
                >
                    {<div className="page">{"<"}</div>}
                </div>
            );
        } else if (pages[i] === -2) {
            let diff = currentPage % 10;
            let inpPage = currentPage + (10 - diff) + 1;
            p.push(
                <div
                    key={i}
                    onClick={(event) => handleSubmitSearch(event, inpPage)}
                >
                    {<div className="page">{">"}</div>}
                </div>
            );
        } else if (pages[i] === -1) {
            p.push(
                <div
                    key={i}
                    onClick={(event) =>
                        handleSubmitSearch(event, Math.ceil(resCount / 10))
                    }
                >
                    {<div className="page">{">>"}</div>}
                </div>
            );
        }
    }
    if (resCount > 1) {
        results = resCount.toLocaleString();
        s = "results";
    }
    return (
        <div className={"search-content-container"} key={k}>
            <div className="result-notice">
                Found {results} {s} for "
                <span style={{ fontWeight: "bold" }}>{keyWord}"</span>.
            </div>
            {content}
            <div className="pages">{p}</div>
        </div>
    );
};

export default SearchContainer;
