//* Input form DO
const input_name = document.querySelector('input#name')
const input_year = document.querySelectorAll('input[name=year]')
const input_program = document.querySelectorAll('input[name=program]')
const input_gender = document.querySelectorAll('input[name=gender]')
const input_grade = document.querySelector('input#grade')
const btn_submit = document.querySelector('#submit_btn')

//* Search Query Form DO
const search_name = document.querySelector('input[name=search_name]')
const search_year = document.querySelectorAll('input[name=search_year]')
const search_program = document.querySelectorAll('input[name=search_program]')
const search_gender = document.querySelectorAll('input[name=search_gender]')
const btn_search = document.querySelector('#search_btn')

//* Data Table DO
const dtable_body = document.querySelector('tbody')
const dtable_footer = document.querySelector('td#avg_grade')

//* Error Toasts DO
const errormsg_num = document.querySelector('#errormsg_num')
const errormsg_empty = document.querySelector('#errormsg_empty')

//* Student List
var student_list = []
if (localStorage.getItem('studentList') != null) {
	student_list = JSON.parse(localStorage.getItem('studentList'))
	loadDataTable()
}

//* Events
btn_submit.addEventListener('click', () => {
	errormsg_num.classList.add('hidden')
	errormsg_empty.classList.add('hidden')

	if (input_name.value && Number.isInteger(parseInt(input_grade.value))) {
		let new_entry = {
			entry_name: input_name.value,
			entry_year: getRadioValue(input_year),
			entry_program: getRadioValue(input_program),
			entry_gender: getRadioValue(input_gender),
			entry_grade: input_grade.value
		}
		student_list.push(new_entry)
		loadDataTable()
		localStorage.setItem('studentList', JSON.stringify(student_list))
	} else {
		if (!input_name.value) errormsg_empty.classList.remove('hidden')
		if (!Number.isInteger(parseInt(input_grade.value)))
			errormsg_num.classList.remove('hidden')
	}
})

//* Methods
function getRadioValue(radio_group) {
	for (let radio_button of radio_group) {
		if (radio_button.checked) return radio_button.value
	}
}

function getAverageGrade() {
	// TODO: make a method that shows the average grade of all students in the data table's footer. Average grade is also recalculated after a search query
}

function loadDataTable() {
	dtable_body.innerHTML = ''
	for (let student of student_list) {
		let dtable_data = `
		<tr class="hover">
			<td>${student.entry_name}</td>
			<td>${student.entry_year}</td>
			<td>${student.entry_program}</td>
			<td>${student.entry_gender}</td>
			<td>${student.entry_grade}</td>
			<td class="text-center">
				<button
					class="btn btn-sm btn-outline btn-error btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-x-lg"
						viewBox="0 0 16 16">
						<path
							d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
					</svg>
				</button>
			</td>
		</tr>
		`
		dtable_body.insertAdjacentHTML('beforeend', dtable_data)
	}
}
