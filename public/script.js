document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('employee-form');
    const employeeList = document.getElementById('employee-list');

    // Fetch and display employees
    const fetchEmployees = async () => {
        const response = await fetch('/employees');
        const employees = await response.json();
        if (employeeList) {
            employeeList.innerHTML = '';
            employees.forEach(employee => {
                const employeeDiv = document.createElement('div');
                employeeDiv.classList.add('employee');
                employeeDiv.innerHTML = `
                    <h3>${employee.name}</h3>
                    <p>Position: ${employee.position}</p>
                    <p>Office: ${employee.office}</p>
                    <p>Salary: ${employee.salary}</p>
                    <button onclick="deleteEmployee('${employee._id}')">Delete</button>
                    <button onclick="updateEmployee('${employee._id}')">Update</button>
                `;
                employeeList.appendChild(employeeDiv);
            });
        }
    };

    // Add employee
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const position = document.getElementById('position').value;
            const office = document.getElementById('office').value;
            const salary = document.getElementById('salary').value;

            await fetch('/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, position, office, salary })
            });

            form.reset();  // Clear the form after submission
            alert("Employee added successfully!");  // Optional: Show an alert or message
        });
    }

    // Delete employee
    window.deleteEmployee = async (id) => {
        await fetch(`/employees/${id}`, {
            method: 'DELETE'
        });
        fetchEmployees();
    };

    // Update employee
    window.updateEmployee = async (id) => {
        const name = prompt("Enter new name:");
        const position = prompt("Enter new position:");
        const office = prompt("Enter new office:");
        const salary = prompt("Enter new salary:");

        await fetch(`/employees/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, position, office, salary })
        });
        fetchEmployees();
    };

    // Initial fetch
    fetchEmployees();
});








