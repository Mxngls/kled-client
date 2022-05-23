export default async function handleOnClickView({
    id,
    input,
    setSearch,
    search,
}) {
    if (
        search.isSearch &&
        search.resultsView.length !== 0 &&
        search.resultsView[search.resultsView.length - 1]["Id"] === id
    ) {
        console.log("View link clicked! 1 ");
        setSearch((search) => ({ ...search, isSearch: false, isView: true }));
    } else if (!search.isSearch && search.isView) {
        console.log("View link clicked! 2 ");

        const formData = new FormData();
        formData.append("id", id);
        formData.append("lang", input.lang);
        formData.append("langCode", input.code);

        await fetch("http://localhost:8090/view", {
            method: "POST",
            body: formData,
        })
            .then((resp) => resp.json())
            .then((json) =>
                setSearch((search) => ({
                    ...search,
                    resultsView: [...search.resultsView, json],
                }))
            );
    } else if (search.isSearch && !search.isView) {
        console.log("View link clicked! 3 ");

        const formData = new FormData();
        formData.append("id", id);
        formData.append("lang", input.lang);
        formData.append("langCode", input.code);

        await fetch("http://localhost:8090/view", {
            method: "POST",
            body: formData,
        })
            .then((resp) => resp.json())
            .then((json) =>
                setSearch((search) => ({
                    ...search,
                    resultsView: [json],
                    isView: true,
                    isSearch: false,
                }))
            );
    }
}
