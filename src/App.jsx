import React, { useState } from "react";
import "./style/Sense.css";
import "./style/Word.css";
import "./style/App.css";

import SearchForm from "./components/SearchForm";
import renderSearch from "./render/renderSearch";
import renderView from "./render/renderView";

function App() {
    const [search, setSearch] = useState({
        isSearch: false,
        isView: false,
        resultsSearch: {},
        resultsView: [],
        keyWord: "",
        resCount: 0,
        pages: [],
        currentPage: 1,
    });

    const [input, setInput] = useState({
        mode: "Word",
        word: "",
        lang: "eng",
        code: "6",
        page: "1",
    });
    const [subActive, setSubActive] = useState(false);

    return (
        <div className="App" onClick={() => setSubActive(false)}>
            <SearchForm
                subActive={subActive}
                setSubActive={setSubActive}
                search={search}
                setSearch={setSearch}
                input={input}
                setInput={setInput}
            />
            {search.resultsSearch.length > 0 &&
                search.isSearch &&
                !search.isView &&
                renderSearch({
                    result: search.resultsSearch,
                    input: input,
                    search: search,
                    setSearch: setSearch,
                    isSearch: search.isSet,
                    currentPage: search.currentPage,
                    keyWord: search.keyWord,
                })}
            {search.isView &&
                search.resultsView.length > 0 &&
                search.isSearch === false &&
                renderView({
                    result: search.resultsView[search.resultsView.length - 1],
                    input: input,
                    search: search,
                    setSearch: setSearch,
                })}
        </div>
    );
}

export default App;
