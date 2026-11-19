const ROOM_VIEWS = {
    center: { left: 'left', right: 'right', behind: 'back', image: 'assets/images/room_center.png'},
    left: { left: 'back', right: 'center', behind: 'right', image: 'assets/images/room_left.png'},
    right: { left: 'center', right: 'back', behind: 'left', image: 'assets/images/room_right.png'},
    back: { left: 'right', right: 'left', behind: 'center', image: 'assets/images/room_back.png'}
}

let currentView = 'center';

const bgElement = document.getElementById;getElementById('room-background');
const btnLeft = document.getlElementById('btn-left');
const btnRight = document.getElementById('btn-right');
const btnBehind = document.getElementById('btn-behind');

function updateView(newViewKey) {
    if (!ROOM_VIEWS[newViewKEy]) return;

    currentView = newViewKey;
    const viewData = ROOM_VIEWS[currentView];

    bgElement.src = viewData.image;
}

btnLeft.addEventListener('click', () => updateView(ROOM_VIEWS[currentView].left));
btnRight.addEventListener('click', () => updateView(ROOM_VIEWS[currentView].right));
btnBehind.addEventListener('click', () => upateView(ROOM_VIEWS[currentView].behind));