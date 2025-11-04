document.addEventListener("DOMContentLoaded", function() {
    
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    // Loop through all buttons and add a click event listener
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                // Clear the display
                display.value = '';
            } else if (value === '=') {
                // Calculate the result
                try {
                    // eval() is a simple way to calculate, but be cautious with it in real projects
                    display.value = eval(display.value);
                } catch (error) {
                    display.value = 'Error';
                }
            } else {
                // Append the clicked button's value to the display
                display.value += value;
            }
        });
    });
});