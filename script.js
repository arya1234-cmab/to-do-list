document.addEventListener('DOMContentLoaded', () => {

    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const noTasksImage = document.getElementById('noTasksImage');

    const progressbar = document.getElementById('progress');
    const progressnumbers = document.getElementById('numbers');


    // SHOW / HIDE IMAGE
    const toggleImageVisibility = () => {

        if (taskList.children.length === 0) {
            noTasksImage.style.display = 'block';
        } else {
            noTasksImage.style.display = 'none';
        }

    };


    // UPDATE PROGRESS
    const updateProgress = () => {

        const totalTasks = taskList.children.length;

        const completedTasks =
            taskList.querySelectorAll('.checkbox:checked').length;

        const percentage = totalTasks
            ? (completedTasks / totalTasks) * 100
            : 0;

        progressbar.style.width = `${percentage}%`;

        progressnumbers.textContent =
            `${completedTasks} / ${totalTasks}`;
    };


    // ADD TASK
    const addTask = (event) => {

        event.preventDefault();

        const taskText = taskInput.value.trim();

        if (!taskText) {
            return;
        }


        // CREATE TASK
        const li = document.createElement('li');

        li.innerHTML = `
            <input type="checkbox" class="checkbox">

            <span>${taskText}</span>

            <div class="task-buttons">

                <button type="button" class="edit-btn">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button type="button" class="delete-btn">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;


        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn');

        let taskSpan = li.querySelector('span');

        let isEditing = false;


        // COMPLETE TASK
        checkbox.addEventListener('change', () => {

            const isChecked = checkbox.checked;

            li.classList.toggle('completed', isChecked);


            // Disable edit when completed
            editBtn.disabled = isChecked;

            if (isChecked) {

                editBtn.style.opacity = '0.5';
                editBtn.style.pointerEvents = 'none';

            } else {

                editBtn.style.opacity = '1';
                editBtn.style.pointerEvents = 'auto';

            }


            updateProgress();

        });


        // DELETE TASK
        deleteBtn.addEventListener('click', () => {

            li.remove();

            toggleImageVisibility();

            updateProgress();

        });


        // EDIT / SAVE TASK
        editBtn.addEventListener('click', () => {

            // Don't edit completed task
            if (checkbox.checked) {
                return;
            }


            // EDIT MODE
            if (!isEditing) {

                const input = document.createElement('input');

                input.type = 'text';

                input.value = taskSpan.textContent;

                input.className = 'edit-input';


                taskSpan.replaceWith(input);

                input.focus();

                editBtn.innerHTML =
                    '<i class="fa-solid fa-check"></i>';

                isEditing = true;


                // SAVE MODE
                editBtn.onclick = null;

            } else {

                const input = li.querySelector('.edit-input');

                const newText = input.value.trim();


                if (newText !== '') {

                    taskSpan.textContent = newText;

                    input.replaceWith(taskSpan);

                    editBtn.innerHTML =
                        '<i class="fa-solid fa-pen"></i>';

                    isEditing = false;

                }

            }

        });


        // ADD TASK TO LIST
        taskList.appendChild(li);

        taskInput.value = '';

        toggleImageVisibility();

        updateProgress();

    };


    // FORM
    const form = document.getElementById('input-area');

    form.addEventListener('submit', addTask);


    // INITIAL STATE
    toggleImageVisibility();

    updateProgress();

});