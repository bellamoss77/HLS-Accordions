console.clear();

function closeCurrentAccordion(accordion, tween) {
    accordion.classList.remove('active');
    tween.reverse();
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (currentItem !== null) {
            closeCurrentAccordion(items[currentItem], items[currentItem]._accordionTween);
            currentItem = null;
        }
    }
});

const items = gsap.utils.toArray(".item");
let currentItem = null;

items.forEach((e, i) => {
    const header = e.querySelector(".section-header");
    const content = e.querySelector('.section-content')
    const t = gsap.to(content, {
        height: 'auto',
        duration: 1,
        ease: "expo.out",
        paused: true
    });

    e._accordionTween = t;

    header.addEventListener('click', () => {
        if (currentItem !== null) {
            closeCurrentAccordion(items[currentItem], items[currentItem]._accordionTween);
            if (currentItem === i) {
                currentItem = null;
                return;
            }
        }
        e.classList.add('active');
        t.play();
        currentItem = i;
    });
});

const subItems = gsap.utils.toArray('.sub-item');

subItems.forEach((subItem) => {
    const subHeader = subItem.querySelector('.sub-title');
    const subContent = subItem.querySelector('.sub-content');
    const subTween = gsap.to(subContent, {
        height: 'auto',
        duration: 0.5,
        ease: 'expo.out',
        paused: true
    });

    subHeader.addEventListener('click', (event) => {
        event.stopPropagation();
        const isActive = subItem.classList.contains('active');
        subItem.classList.toggle('active', !isActive);
        if (isActive) {
            subTween.reverse();
        } else {
            subTween.play()
        }
    });
});