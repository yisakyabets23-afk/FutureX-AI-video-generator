// --- Tab Functionality ---
function openTab(event, tabName) {
    // Hide all tab content
    let tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Deactivate all tab links
    let tablinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab and activate its link
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}

// Set the first tab as active by default
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.tab-link').click();
});

// --- Image Preview for Upload ---
const imageUpload = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');
const uploadLabel = document.querySelector('.upload-label');

imageUpload.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            uploadLabel.textContent = file.name; // Show file name
        }
        reader.readAsDataURL(file);
    }
});


// --- Form Submission Logic ---
const imageForm = document.getElementById('image-form');
const videoForm = document.getElementById('video-form');
const imgVideoForm = document.getElementById('img-video-form');
const loadingSpinner = document.getElementById('loading-spinner');
const resultOutput = document.getElementById('result-output');

imageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const prompt = document.getElementById('image-prompt').value;
    generateContent('image', { prompt });
});

videoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const prompt = document.getElementById('video-prompt').value;
    generateContent('video', { prompt });
});

imgVideoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const prompt = document.getElementById('img-video-prompt').value;
    const imageFile = document.getElementById('image-upload').files[0];
    if (!imageFile) {
        alert("Please upload a starting image.");
        return;
    }
    generateContent('img-to-video', { prompt, imageFile });
});


// --- The Core Generation Function (Placeholder) ---
// This is where you will connect to your backend server in the future.
async function generateContent(type, data) {
    console.log(`Generating ${type} with data:`, data);
    
    // 1. Show loading spinner and clear previous results
    loadingSpinner.style.display = 'block';
    resultOutput.innerHTML = '';

    // 2. THIS IS A SIMULATION. Replace this with a real API call to your backend.
    // We use setTimeout to pretend it takes time to generate.
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate 3-second wait

    // 3. Hide loading spinner
    loadingSpinner.style.display = 'none';

    // 4. Display fake results (for demonstration purposes)
    if (type === 'image') {
        const imageUrl = `https://picsum.photos/512/512?random=${Math.random()}`; // Random placeholder image
        resultOutput.innerHTML = `
            <p><strong>Prompt:</strong> ${data.prompt}</p>
            <img src="${imageUrl}" alt="Generated Image">
        `;
    } else if (type === 'video' || type === 'img-to-video') {
        // Since we can't easily get a placeholder video, we'll just show a message.
        resultOutput.innerHTML = `
            <p><strong>Prompt:</strong> ${data.prompt}</p>
            <div class="video-placeholder">
                Your generated video would appear here.
                <style>.video-placeholder { padding: 4rem 2rem; background: #333; text-align: center; border-radius: 4px; }</style>
            </div>
        `;
    }
}