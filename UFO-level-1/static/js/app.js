// from data.js
var tableData = data;

var tbody = d3.select("tbody");

function buildTable() {
    tableData.forEach(datum => {
        let nDatum = tbody.append("tr");
    
        Object.entries(datum).forEach(entry => {
            let key = entry[0];
            let val = entry[1];
            nDatum.append("td").text(val);
        })
    });
}

buildTable();

let filterButton = d3.select("#filter-btn");

filterButton.on("click", () => {
    let inputElement = d3.select(".form-control");
    var inputValue = inputElement.property("value");

    if (inputValue) {
        var rows = tbody.selectAll("tr");
        rows.remove();
        var parts = inputValue.split("/");
        var filterDate = new Date(parts[2], parts[0] - 1, parts[1]);

        if (filterDate instanceof Date && !isNaN(filterDate)) {
            tableData.forEach(datum => {
                let nDatum = null;
            
                Object.entries(datum).forEach(entry => {
                    let key = entry[0];
                    let val = entry[1];
                    if (key === "datetime" && val === inputValue) {
                        nDatum = tbody.append("tr");
                        nDatum.append("td").text(val);
                    } else if (nDatum != null) {
                        nDatum.append("td").text(val);
                    }
                })
            });
        }
    } else {
        var rows = tbody.selectAll("tr");
        rows.remove();
        buildTable();
    }
});