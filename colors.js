function applyAccentColorFromStorage() {
    const savedAccentColor = localStorage.getItem('accentColor');
    const savedPicture = localStorage.getItem('newPortrait')
    if (savedAccentColor) {
        changeColor(savedAccentColor);
    }
    if (savedPicture) {
        changeImage(savedPicture);
    }
  }

document.addEventListener('DOMContentLoaded', applyAccentColorFromStorage);

function changeImage(color) {
    var imagePath = '/images/portrait/francesca_' + color + '.jpg';
    document.getElementById('portrait').src = imagePath;
    localStorage.setItem('newPortrait', color);
}

function changeColor(color) {
    var newColor = 'var(--' + color + ')';
    document.documentElement.style.setProperty('--accent', newColor);
    localStorage.setItem('accentColor', color);
}

// Add event listeners to the buttons
document.getElementById('blueButton').addEventListener('click', function() {
    changeImage('blue');
    changeColor('blue');
});

document.getElementById('greenButton').addEventListener('click', function() {
    changeImage('green');
    changeColor('green');
});

document.getElementById('yellowButton').addEventListener('click', function() {
    changeImage('yellow');
    changeColor('yellow');
});

document.getElementById('pinkButton').addEventListener('click', function() {
    changeImage('pink');
    changeColor('pink');
});