import React from "react";

const ReturnButton = ({ search, setSearch }) => {
    const handleBack = () => {
        let clone = [...search.resultsView];
        clone.pop();
        if (search.resultsView !== null && search.resultsView.length > 1) {
            setSearch((search) => ({ ...search, resultsView: clone }));
        } else {
            setSearch((search) => ({
                ...search,
                isSearch: true,
                isView: false,
            }));
        }
    };

    return (
        <div className="return-search-button" onClick={handleBack}>
            Back
        </div>
    );
};

export default ReturnButton;
