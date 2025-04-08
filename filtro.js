function renderProf(data){
    return `<a href="${data[5]}" target="_blank">${data[4]}</a>`
}
function renderCode(data, col){
    return `<small class="label info">${data[col]}</small>`
}

const COLUMNS = [
    { index: 0, title: "گروه", field: "prezi" },
    { index: 2, title: "کد", field: "code", render:renderCode },
    { index: 1, title: "درس", field: "title"},
    { index: 6, title: "زمان", field: "schedule",},
    { index: 4, title: "استاد", field: "professor", render:renderProf }
];

const table = document.getElementById("tableData");
const filterInput = document.getElementById("filterInput");

function renderRow(row) {
    const tableRow = table.insertRow();
    COLUMNS.forEach(col => {
        const cell = tableRow.insertCell();
        if (col.render)
            cell.innerHTML = col.render(row,col.index);
        else
            cell.textContent = row[col.index];  // Access value directly by index
        cell.dataset.colonna = col.index
    });
}

function renderTable(dataToRender) {
    table.innerHTML = "" // Clear existing table data
    dataToRender.sort(sortiday)
    dataToRender.forEach(row => renderRow(row))
}


sortiday = (a, b) => {
    // First, compare by iday[28] then by ibegin[29]
    if (a[27] < b[27])
      return -1; // a comes before b
    if (a[27] > b[27])
      return 1; // a comes after b
    // If iday are equal, compare by ibegin
    if (a[28] < b[28])
      return -1;
    if (a[28] > b[28])
      return 1;
    return 0; // names and ages are equal
  }

function filterData(searchTerm) {
    const SEARCH = searchTerm.toUpperCase();
    return ROWS.filter(row => {
        for (const col of COLUMNS) {
            const value = row[col.index]; // Access value by index
            if (value && value.toString().includes(SEARCH)) {
                return true;
            }
        }
        return false;
    });
}
function filterDataCol(searchTerm, searchCol) {
    return ROWS.filter(row => (row[searchCol]==searchTerm));
}
function filterDataMajor(searchTerm, searchCol) {
    return ROWS.filter(row => (row[searchCol].substring(0, 4)==searchTerm));
}

filterInput.addEventListener("input", () => {
    const searchTerm = filterInput.value;
    if (searchTerm.length >= 3) {
        const filtered = filterData(farky(searchTerm));
        renderTable(filtered);
    }
});

// Initial rendering and major select
const majorSelect = document.getElementById("majorSelect")
if (majorSelect) {
    majorSelect.addEventListener('change', (e) => {
        filterMajorTerm(e.target.value)
    });
    majorSelect.selectedIndex = 0; // Set the selected index
    const changeEvent = new Event('change', { bubbles: true }); // bubbles is important!
    majorSelect.dispatchEvent(changeEvent);
}

function filterMajorTerm(major, term){
    let MAJOR = major?? MAJOR
    const filtered = filterDataMajor(MAJOR,3);
    renderTable(filtered);
}

// click on table cell...
document.getElementById('tableData').addEventListener('click', (event) => {
    // alert(event.target.textContent)
    // var text = event.target.innerText;
    const td = event.target.closest("td") // Find the closest <td>
    let searchText = event.target.textContent
    let searchTip  = td.dataset.tooltip
    // event.preventDefault();
        filterInput.value = searchText
        const filtered = filterDataCol(searchText, td.dataset.colonna);
        renderTable(filtered);
})

/// Ya-Alef-Ka-NUM Farsi Correction
function farky(str) {
	if (!str)
		return '';
	const I = "۰۱۲۳۴۵۶۷۸۹يك";
	const O = "0123456789یک";
	let len = str.length;
	let S = "";
	for (var i = 0; i < len; i++) {
		let ch = str.charAt(i);
		let id = I.indexOf(ch);
		if (id == -1)
			S += ch;
		else
			S += O.charAt(id);
	}
	return S;
}