function invoke(action, version, params = {}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("error", () => reject("failed to issue request"));
        xhr.addEventListener("load", () => {
            try {
                const response = JSON.parse(xhr.responseText);
                if (Object.getOwnPropertyNames(response).length !== 2) {
                    throw new Error(
                        "response has an unexpected number of fields"
                    );
                }
                if (!response.hasOwnProperty("error")) {
                    throw new Error("response is missing required error field");
                }
                if (!response.hasOwnProperty("result")) {
                    throw new Error(
                        "response is missing required result field"
                    );
                }
                if (response.error === "model was not found: KLD-Parser") {
                    throw response.error;
                }
                if (response.error) {
                    throw response.error;
                }
                resolve(response.result);
            } catch (e) {
                reject(e)
            }
        });

        xhr.open("POST", "http://127.0.0.1:8765");
        xhr.send(JSON.stringify({ action, version, params }));
    });
}

export default invoke;