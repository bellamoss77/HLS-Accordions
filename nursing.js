console.clear();

const items = gsap.utils.toArray(".item");
let currentItem = null;

items.forEach((e, i) => {
    const content = e.querySelector(".section-content");
    const t = gsap.to(content, {
        height: 'auto',
        duration: 1,
        ease: "expo.out",
        paused: true
    });

    e._accordionTween = t;

    e.addEventListener('click', () => {
        if (currentItem !== null) {
            items[currentItem].classList.toggle('active');
            if (currentItem === i) {
                currentItem = null;
                return t.reverse();
            }
            items[currentItem]._accordionTween.reverse();
        }
        e.classList.toggle('active');
        t.play();
        currentItem = i;
    });
});