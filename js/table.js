import { data } from "./data.js";
// import data from "./data.json" assert { type: "json" };

const table = {
    table: document.querySelector(".table"),
    body: document.querySelector(".table-body"),

    renderArray: [...data],

    previousSorter: document.querySelector("[data-heading='workationScore']"),
    currentSorter: null,
    direction: "des",
    expanded: false,
    expandButton: document.querySelector(".expand-button"),
    expandGradient: document.querySelector(".table-gradient"),

    init() {
        table.binds();
    },

    binds() {
        document
            .querySelector(".table-head-row")
            .addEventListener("click", table.handleSort);
        let radioInputs = document.querySelectorAll('[name="region"]');
        radioInputs.forEach((el) =>
            el.addEventListener("change", table.handleFilterChange)
        );
        table.expandButton.addEventListener("click", table.expandList);
    },

    expandList(e) {
        table.table.classList.toggle("expanded", !table.expanded);
        table.expandButton.classList.toggle("expanded", !table.expanded);
        table.expandGradient.classList.toggle("expanded", !table.expanded);
        table.expandButton.textContent = table.expanded
            ? "Weitere Länder anzeigen"
            : "Weniger Länder anzeigen";
        if (table.expanded) {
            document.querySelector(".table-wrapper").scrollTo({ top: 0 });
        }

        table.expanded = !table.expanded;

        table.render();
    },

    handleFilterChange(e) {
        if (e.target.value === "alle") {
            table.renderArray = [...data];
            if (table.currentSorter != null) {
                table.sort(table.currentSorter.dataset.heading, table.direction);
            }
            table.render();
            return;
        }
        table.renderArray = [...data].filter((el) => el.region === e.target.value);
        if (table.currentSorter != null) {
            table.sort(table.currentSorter.dataset.heading, table.direction);
        }

        table.render();
        // document.querySelector(".table-wrapper").scrollIntoView();
    },
    handleSort(e) {
        if (e.target.nodeName !== "TH") {
            return;
        }
        table.currentSorter = e.target;
        if (table.currentSorter === table.previousSorter) {
            table.direction = table.direction === "asc" ? "des" : "asc";
        }
        table.styleHeader();

        table.sort(table.currentSorter.dataset.heading, table.direction);
        table.previousSorter = table.currentSorter;
        table.render();
    },

    styleHeader() {
        table.previousSorter.classList.remove("active");
        table.currentSorter.classList.add("active");
        if (table.direction === "asc") {
            table.currentSorter.classList.add("asc");
            return;
        }
        table.currentSorter.classList.remove("asc");
    },

    sort(field, direction) {
        if (direction === "asc") {
            if (typeof table.renderArray[0][field] === "string") {
                table.renderArray.sort((a, b) => a[field].localeCompare(b[field]));
            }
            table.renderArray.sort((a, b) => {
                return (
                    (a[field] < b[field]) - (b[field] < a[field]) ||
                    (a.workationScore < b.workationScore) -
                    (b.workationScore < a.workationScore) ||
                    a.land.localeCompare(b.land)
                );
            });
        } else {
            if (typeof table.renderArray[0][field] === "string") {
                table.renderArray.sort((a, b) => b[field].localeCompare(a[field]));
            }
            table.renderArray.sort((a, b) => {
                return (
                    (b[field] < a[field]) - (a[field] < b[field]) ||
                    (a.workationScore < b.workationScore) -
                    (b.workationScore < a.workationScore) ||
                    a.land.localeCompare(b.land)
                );
            });
        }
    },

    render() {
        table.expandButton.classList.toggle("hide", table.renderArray.length < 10);
        table.body.innerHTML = "";
        let expandedArray = table.expanded
            ? table.renderArray
            : table.renderArray.slice(0, 10);

        let tableRows = expandedArray.map(
            (e) => `<tr class="table-row">

                <td class ='table-cell-land'><div class='land-container'><svg class="land-icon" width="16" height="12">
                            <use href="./img/flags.svg#${e.land}"></use>
                        </svg> <span class='land-name'>${e.land.replaceAll(
                "-",
                " "
            )}</span></div></td>
                <td>${e.breitbandSpeed.toFixed(2).replace(".", ",")}</td>
                <td>${e.mobileSpeed.toString().replace(".", ",")}</td>
                <td>${e.breitbandKosten.toString().replace(".", ",")} €</td>
                <td>${e.mietkosten.toString().replace(".", ",")} €</td>
                <td>${e.workingHolidayVisum}</td>
                <td>${e.happinessIndex.toFixed(2).replace(".", ",")}</td>
                <td>${
                typeof e.lgbt === "number"
                    ? e.lgbt.toFixed(2).replace(".", ",")
                    : "—"
            }</td>
                <td>${e.safetyIndex.toFixed(0)}</td>
                <td>${e.temperatur.toFixed(0)}</td>
                <td>${e.workationScore.toFixed(0)}</td>
              </tr>`
        );

        table.body.insertAdjacentHTML("afterbegin", tableRows.join(""));
    },
};

document.addEventListener("DOMContentLoaded", table.init);
