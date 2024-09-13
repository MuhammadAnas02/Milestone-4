const display = document.querySelector('#resume-display') as HTMLElement;
const shareUrlButton = document.querySelector('#share-url-btn') as HTMLButtonElement;
let imageUrl = '';

function resume() {
    const Name = (document.querySelector("#names") as HTMLInputElement)?.value;
    const fatherName = (document.querySelector("#fname") as HTMLInputElement)?.value;
    const age = (document.querySelector("#age") as HTMLInputElement)?.value;
    const gender = (document.querySelector("#gender") as HTMLSelectElement)?.value;
    const matric = (document.querySelector("#matric") as HTMLInputElement)?.value;
    const intermidiate = (document.querySelector("#intermidiate") as HTMLInputElement)?.value;
    const higher = (document.querySelector("#higher") as HTMLInputElement)?.value;
    const skills = (document.querySelector("#skills") as HTMLInputElement)?.value;


    if (!Name || !fatherName || !age || !gender || !matric || !skills) {
        ('Please fill all required fields');
        return null;
    }

    return {
        Name,
        fatherName,
        age,
        gender,
        matric,
        intermidiate,
        higher,
        skills,
        imageUrl
    };
}


function output(res: any) {
    display.innerHTML = `
        <img src="${res.imageUrl || ''}" alt="Profile Photo" style="max-width: 150px;">
        <h1>Name: ${res.Name}</h1>
        <h1>Father Name: ${res.fatherName}</h1>
        <p>Age: ${res.age}</p>
        <p>Gender: ${res.gender}</p>
        <p>Matric: ${res.matric}</p>
        <p>Intermediate: ${res.intermidiate || 'N/A'}</p>
        <p>Higher Education: ${res.higher || 'N/A'}</p>
        <p>Skills: ${res.skills}</p>
        <button id="download-btn">Download Resume</button>
    `;
    
    const downloadButton = document.querySelector("#download-btn") as HTMLButtonElement;
    downloadButton.addEventListener('click', () => downloadResume(res));
}


function downloadResume(res: any) {
    const resumeText = `
    Name: ${res.Name}
    Father Name: ${res.fatherName}
    Age: ${res.age}
    Gender: ${res.gender}
    Matric: ${res.matric}
    Intermediate: ${res.intermidiate || 'N/A'}
    Higher Education: ${res.higher || 'N/A'}
    Skills: ${res.skills}
    `;

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${res.Name}_Resume.txt`;
    link.click();
}


function handler(event: Event) {
    event.preventDefault();
    const data = resume();
    if (data) {
        output(data);
        shareUrlButton.style.display = 'block';
        shareUrlButton.onclick = () => generateShareableUrl(data);
    }
}


function addDynamicChanges() {
    const inputs = document.querySelectorAll('#resume-form input, #resume-form select');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const data = resume();
            if (data) output(data);
        });
    });
}


function handleImageUpload() {
    const photoUpload = document.querySelector('#photo-upload') as HTMLInputElement;
    photoUpload.addEventListener('change', (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                imageUrl = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    });
}

function prefillFromUrl() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('Name')) {
        (document.querySelector("#names") as HTMLInputElement).value = params.get('Name')!;
        (document.querySelector("#fname") as HTMLInputElement).value = params.get('fatherName')!;
        (document.querySelector("#age") as HTMLInputElement).value = params.get('age')!;
        (document.querySelector("#gender") as HTMLSelectElement).value = params.get('gender')!;
        (document.querySelector("#matric") as HTMLInputElement).value = params.get('matric')!;
        (document.querySelector("#intermidiate") as HTMLInputElement).value = params.get('intermidiate') || '';
        (document.querySelector("#higher") as HTMLInputElement).value = params.get('higher') || '';
        (document.querySelector("#skills") as HTMLInputElement).value = params.get('skills')!;
        
        const data = resume();
        if (data) output(data);
    }
}
function generateShareableUrl(data: any) {
    const query = new URLSearchParams(data).toString();
    const shareableUrl = `${window.location.href.split('?')[0]}?${query}`;
    alert(`Share this URL: ${shareableUrl}`);
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#resume-form') as HTMLElement;
    form.addEventListener('submit', handler);
    addDynamicChanges();
    handleImageUpload();
    prefillFromUrl();
});
