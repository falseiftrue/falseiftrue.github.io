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

const colorHex = {
    green:  '#034903',
    pink:   '#713E5A',
    blue:   '#05668D',
    yellow: '#aa7e05',
};

function buildCursor(hex) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M0,0 L0,16 L4.5,11.5 L7.5,18 L9.5,17 L6.5,10.5 L12,10.5 Z" fill="${hex}" stroke="black" stroke-width="1.2" stroke-linejoin="round"/></svg>`;
    const encoded = encodeURIComponent(svg);
    return `url("data:image/svg+xml,${encoded}") 0 0, auto`;
}

function changeColor(color) {
    var newColor = 'var(--' + color + ')';
    document.documentElement.style.setProperty('--accent', newColor);
    document.body.style.cursor = buildCursor(colorHex[color] || '#034903');
    localStorage.setItem('accentColor', color);
}

const newsSection = document.getElementById('news');
if (newsSection) {
    const h3 = newsSection.querySelector('h3');
    const DURATION = 400;
    let expandedH, expandedW, collapsedW, collapsedH;

    function lock(h, w) {
        newsSection.style.height = h + 'px';
        newsSection.style.width = w + 'px';
        newsSection.style.flex = 'none';
    }

    function unlock() {
        newsSection.style.height = '';
        newsSection.style.width = '';
        newsSection.style.flex = '';
    }

    // Disable transitions for measurement
    newsSection.style.transition = 'none';

    // Measure expanded state
    expandedH = newsSection.offsetHeight;
    expandedW = newsSection.offsetWidth;

    // Measure collapsed state: hide the ul so list items don't inflate fit-content,
    // leaving only the h3 to determine the button's natural width.
    const ul = newsSection.querySelector('ul');
    newsSection.classList.add('collapsed');
    ul.style.display = 'none';
    newsSection.style.flex = 'none'; // prevent flex:1 from inflating the measured height
    newsSection.style.width = 'fit-content';
    collapsedW = newsSection.offsetWidth + 1;
    collapsedH = newsSection.offsetHeight;
    newsSection.style.width = '';
    newsSection.style.flex = '';
    ul.style.display = '';

    // Snap to collapsed with no animation, then re-enable transitions next frame
    lock(collapsedH, collapsedW);
    requestAnimationFrame(() => { newsSection.style.transition = ''; });

    function collapse() {
        expandedH = newsSection.offsetHeight;
        expandedW = newsSection.offsetWidth;
        lock(expandedH, expandedW);
        newsSection.getBoundingClientRect(); // force reflow so transition fires
        newsSection.classList.add('collapsed');
        lock(collapsedH, collapsedW);
    }

    function expand() {
        lock(collapsedH, collapsedW);
        newsSection.classList.remove('collapsed');
        newsSection.getBoundingClientRect();
        lock(expandedH, expandedW);
        setTimeout(unlock, DURATION);
    }

    h3.addEventListener('click', () => {
        if (newsSection.classList.contains('collapsed')) expand();
        else collapse();
    });
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