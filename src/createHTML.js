async function createHTML(id, lang, langCode) {
    const renderReference = (Reference) => {
        let refList = "";
        let n = "";
        let t = "";

        if (Reference !== null) {
            for (let i = 0; i < Reference.length; i++) {
                if (i === Reference.length - 1) {
                    n = "\n";
                }

                if (i > 0) {
                    t = `                        `;
                }

                let referenceContainer = " ";

                let url = `https://krdict.korean.go.kr/m/eng/searchResultView?ParaWordNo=${Reference[i]["Id"]}&nationCode=${langCode}&nation=${lang}&viewType=A`;
                let refClass = "";
                if (Reference[i]["Type"] !== "") {
                    referenceContainer += `            <div class="reference-type">
                                ${Reference[i]["Type"]}:
                            </div>
                            `;
                }
                if (Reference[i]["Value"] !== "") {
                    if (Reference[i]["Id"] !== "") {
                        refClass = " link";
                        referenceContainer += `<a class="reference-value${refClass}" href="${url}">
                                ${Reference[i]["Value"]}
                            </a>
                            `;
                    } else {
                        if (i !== Reference.length - 1) {
                            n = "\n";
                        }
                        referenceContainer += `<div class="reference-value${refClass}">
                                ${Reference[i]["Value"]}
                            </div>${n}`;
                    }
                }

                refList += `${t}<div class="reference">
                ${referenceContainer}
                        </div>${n}`;
            }

            return refList;
        }
    };

    const renderExamples = (Examples) => {
        let examplesContainer = "";
        let exampleList = "";
        for (let n = 0; n < Examples.length; n++) {
            if (n === Examples.length - 1) {
                examplesContainer += `        <li>${Examples[n]}</li>`;
            } else if (n === 0) {
                examplesContainer += `                <li>${Examples[n]}</li>
                    `;
            } else {
                examplesContainer += `        <li>${Examples[n]}</li>
                    `;
            }
        }
        exampleList = `<ul>
            ${examplesContainer}
                        </ul>`;
        return exampleList;
    };

    const renderSenses = (Senses) => {
        let css = "";
        let senseContainer = "";
        let index = "";
        let n = "";
        let t = "";

        for (let i = 0; i < Senses.length; i++) {
            let ref;

            if (Senses[i]["Reference"] !== null) {
                ref =  renderReference(Senses[i]["Reference"]);
            } else {
                ref = "";
            }

            if (Senses.length > 1) {
                index = `<div class="sense-nr">
                        ${i + 1}. 
                    </div>`;
            }

            if (i !== Senses.length - 1) {
                n = "\n";
            }

            css += `#sense-info-sub-${i} {
                display: none;
            }
            
            #sense-info-header-${i} {
                display: block;
            }
            `;

            if (i > 0) {
                t = `\t\t\t`;
            }

            senseContainer += `${t}<div class="sense">
                <div id="sense-info-header-${i}" onclick="expander(${i})">
                    ${index}
                    <div class="translation">
                        ${Senses[i]["Translation"]}
                    </div>
                </div>
                <div id="sense-info-sub-${i}">
                    <div class="definition">
                        ${Senses[i]["Definition"]}
                    </div>
                    <div class="krDefinition">
                        ${""}
                    </div>
                    <div class="examples">
                        ${renderExamples(Senses[i]["Examples"])}
                    </div>
                    <div class="reference-container">
                        ${ref}
                    </div>
                </div>
            </div>${n}`;
        }

        let html = `<div id="sense-content">
    <head>
        <style>
            ${css}
        </style>
    </head>

    <body>
        <div id="senses-container">
            ${senseContainer}
        </div>
    </body>
</div>`;

        return html;
    };

    const formData = new FormData();

    formData.append("id", id);
    formData.append("lang", lang);
    formData.append("langCode", langCode);

    return fetch("http://localhost:8090/view", {
        method: "POST",
        body: formData,
    })
        .then((resp) => resp.json())
        .then((json) => renderSenses(json.Senses));
}

export default createHTML;
