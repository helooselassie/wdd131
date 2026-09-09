const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list'); // blank filled in

button.addEventListener('click', () => {
    // Only proceed if the input is not empty
    if (input.value.trim() !== '') {
        // Create the li element
        const li = document.createElement('li');

        // Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete');

        // Populate the li with the input value
        li.textContent = input.value;

        // Append the delete button to the li
        li.append(deleteButton);

        // Append the li to the unordered list
        list.append(li);

        // Clear the input and return focus
        input.value = '';
        input.focus();

        // Delete functionality
        deleteButton.addEventListener('click', () => {
            list.removeChild(li);
            input.focus();
        });
    }
});