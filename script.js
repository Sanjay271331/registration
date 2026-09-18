const form = document.getElementById('registrationForm');
const teamSizeSelect = document.getElementById('teamSize');
const member2Section = document.getElementById('member2Section');
const member3Section = document.getElementById('member3Section');
const member4Section = document.getElementById('member4Section');

function updateMemberVisibility() {
    const size = parseInt(teamSizeSelect.value, 10) || 4;

    // Helper to configure a section's visibility and input states
    function configureSection(section, isVisible) {
        if (!section) return;
        const inputs = section.querySelectorAll('input');
        if (isVisible) {
            section.classList.remove('hidden');
            inputs.forEach(input => {
                input.disabled = false;
                input.required = true;
            });
        } else {
            section.classList.add('hidden');
            inputs.forEach(input => {
                input.value = '';
                input.disabled = true;
                input.required = false;
            });
        }
    }

    // Member 2 is required for all sizes (2, 3, 4)
    configureSection(member2Section, size >= 2);
    // Member 3 is required for sizes 3 and 4
    configureSection(member3Section, size >= 3);
    // Member 4 is required for size 4
    configureSection(member4Section, size >= 4);
}

// Initialise visibility based on current selection
if (teamSizeSelect) {
    teamSizeSelect.addEventListener('change', updateMemberVisibility);
    updateMemberVisibility();
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.submit-btn');
    const messageEl = document.getElementById('formMessage');
    
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    messageEl.textContent = '';
    messageEl.className = 'message';

    // Collect form data (disabled fields for hidden members are excluded automatically)
    const formData = new FormData(this);
    
    // NOTE: You need to create a Google Apps Script and deploy it as a Web App to get this URL.
    // Replace 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL' with your actual Google Script URL.
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzuUiPD-JRnaLKaZ2z71e4wXM6c24pDRnP-Q-5XgnGCKP4b2MypQXAIuYW11EUljw_y1A/exec';
    
    if (scriptURL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
        messageEl.textContent = 'Please configure the Google Apps Script URL in script.js to submit to a spreadsheet.';
        messageEl.className = 'message error';
        submitBtn.textContent = 'Register Team';
        submitBtn.disabled = false;
        return;
    }

    // Using fetch to post to Google Apps Script
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            messageEl.textContent = 'Registration Successful! Your details have been recorded.';
            messageEl.className = 'message success';
            form.reset();
            updateMemberVisibility();
            submitBtn.textContent = 'Register Team';
            submitBtn.disabled = false;
        })
        .catch(error => {
            console.error('Error!', error.message);
            messageEl.textContent = 'Error submitting the form. Please try again.';
            messageEl.className = 'message error';
            submitBtn.textContent = 'Register Team';
            submitBtn.disabled = false;
        });
});
