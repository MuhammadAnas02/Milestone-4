var display = document.querySelector('#resume-display');
var shareUrlButton = document.querySelector('#share-url-btn');
var imageUrl = '';
function resume() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var Name = (_a = document.querySelector("#names")) === null || _a === void 0 ? void 0 : _a.value;
    var fatherName = (_b = document.querySelector("#fname")) === null || _b === void 0 ? void 0 : _b.value;
    var age = (_c = document.querySelector("#age")) === null || _c === void 0 ? void 0 : _c.value;
    var gender = (_d = document.querySelector("#gender")) === null || _d === void 0 ? void 0 : _d.value;
    var matric = (_e = document.querySelector("#matric")) === null || _e === void 0 ? void 0 : _e.value;
    var intermidiate = (_f = document.querySelector("#intermidiate")) === null || _f === void 0 ? void 0 : _f.value;
    var higher = (_g = document.querySelector("#higher")) === null || _g === void 0 ? void 0 : _g.value;
    var skills = (_h = document.querySelector("#skills")) === null || _h === void 0 ? void 0 : _h.value;
    if (!Name || !fatherName || !age || !gender || !matric || !skills) {
        ('Please fill all required fields');
        return null;
    }
    return {
        Name: Name,
        fatherName: fatherName,
        age: age,
        gender: gender,
        matric: matric,
        intermidiate: intermidiate,
        higher: higher,
        skills: skills,
        imageUrl: imageUrl
    };
}
function output(res) {
    display.innerHTML = "\n        <img src=\"".concat(res.imageUrl || '', "\" alt=\"Profile Photo\" style=\"max-width: 150px;\">\n        <h1>Name: ").concat(res.Name, "</h1>\n        <h1>Father Name: ").concat(res.fatherName, "</h1>\n        <p>Age: ").concat(res.age, "</p>\n        <p>Gender: ").concat(res.gender, "</p>\n        <p>Matric: ").concat(res.matric, "</p>\n        <p>Intermediate: ").concat(res.intermidiate || 'N/A', "</p>\n        <p>Higher Education: ").concat(res.higher || 'N/A', "</p>\n        <p>Skills: ").concat(res.skills, "</p>\n        <button id=\"download-btn\">Download Resume</button>\n    ");
    var downloadButton = document.querySelector("#download-btn");
    downloadButton.addEventListener('click', function () { return downloadResume(res); });
}
function downloadResume(res) {
    var resumeText = "\n    Name: ".concat(res.Name, "\n    Father Name: ").concat(res.fatherName, "\n    Age: ").concat(res.age, "\n    Gender: ").concat(res.gender, "\n    Matric: ").concat(res.matric, "\n    Intermediate: ").concat(res.intermidiate || 'N/A', "\n    Higher Education: ").concat(res.higher || 'N/A', "\n    Skills: ").concat(res.skills, "\n    ");
    var blob = new Blob([resumeText], { type: 'text/plain' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "".concat(res.Name, "_Resume.txt");
    link.click();
}
function handler(event) {
    event.preventDefault();
    var data = resume();
    if (data) {
        output(data);
        shareUrlButton.style.display = 'block';
        shareUrlButton.onclick = function () { return generateShareableUrl(data); };
    }
}
function addDynamicChanges() {
    var inputs = document.querySelectorAll('#resume-form input, #resume-form select');
    inputs.forEach(function (input) {
        input.addEventListener('input', function () {
            var data = resume();
            if (data)
                output(data);
        });
    });
}
function handleImageUpload() {
    var photoUpload = document.querySelector('#photo-upload');
    photoUpload.addEventListener('change', function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader_1 = new FileReader();
            reader_1.onload = function () {
                imageUrl = reader_1.result;
            };
            reader_1.readAsDataURL(file);
        }
    });
}
function prefillFromUrl() {
    var params = new URLSearchParams(window.location.search);
    if (params.has('Name')) {
        document.querySelector("#names").value = params.get('Name');
        document.querySelector("#fname").value = params.get('fatherName');
        document.querySelector("#age").value = params.get('age');
        document.querySelector("#gender").value = params.get('gender');
        document.querySelector("#matric").value = params.get('matric');
        document.querySelector("#intermidiate").value = params.get('intermidiate') || '';
        document.querySelector("#higher").value = params.get('higher') || '';
        document.querySelector("#skills").value = params.get('skills');
        var data = resume();
        if (data)
            output(data);
    }
}
function generateShareableUrl(data) {
    var query = new URLSearchParams(data).toString();
    var shareableUrl = "".concat(window.location.href.split('?')[0], "?").concat(query);
    alert("Share this URL: ".concat(shareableUrl));
}
document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('#resume-form');
    form.addEventListener('submit', handler);
    addDynamicChanges();
    handleImageUpload();
    prefillFromUrl();
});
