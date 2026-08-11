
    /* ==========================
    CURSOR GLOW
    =========================== */

    const cursorGlow =
    document.getElementById("cursorGlow");

    window.addEventListener("mousemove", (event) => {

    cursorGlow.style.left =
        event.clientX + "px";

    cursorGlow.style.top =
    event.clientY + "px";

});


    /* ==========================
    SCROLL REVEAL
    =========================== */

    const revealElements =
    document.querySelectorAll(".reveal");

    const revealObserver =
    new IntersectionObserver(
    (entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

            revealObserver.unobserve(
                entry.target
            );

        }

    });

},
    {
        threshold: 0.12
    }
    );


    revealElements.forEach((element) => {

    revealObserver.observe(element);

});


    /* ==========================
    3D TILT
    =========================== */

    const cards =
    document.querySelectorAll(".tilt-card");

    cards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -5;

            const rotateY =
                ((x - centerX) / centerX) * 5;


            card.style.transform =
                `perspective(800px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;


            const glow =
                card.querySelector(".card-glow");

            if (glow) {

                glow.style.left =
                    `${x - 75}px`;

                glow.style.top =
                    `${y - 75}px`;

            }

        }
    );


    card.addEventListener(
    "mouseleave",
    () => {

    card.style.transform =
    "perspective(800px) rotateX(0) rotateY(0) translateY(0)";

}
    );

});


    /* ==========================
    MAGNETIC BUTTONS
    =========================== */

    const magneticButtons =
    document.querySelectorAll(".magnetic");

    magneticButtons.forEach((button) => {

    button.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(
                            ${x * 0.15}px,
                            ${y * 0.15}px
                        )`;

        }
    );


    button.addEventListener(
    "mouseleave",
    () => {

    button.style.transform =
    "translate(0, 0)";

}
    );

});


    /* ==========================
    COUNTERS
    =========================== */

    const counters =
    document.querySelectorAll(".counter");

    let countersStarted = false;


    function startCounters() {

    if (countersStarted) return;

    countersStarted = true;


    counters.forEach((counter) => {

    const target =
    parseFloat(counter.dataset.target);

    const decimal =
    counter.dataset.decimal === "true";

    const duration = 1800;

    const startTime =
    performance.now();


    function update(currentTime) {

    const progress =
    Math.min(
    (currentTime - startTime) /
    duration,
    1
    );

    const eased =
    1 - Math.pow(
    1 - progress,
    3
    );

    const value =
    target * eased;


    if (decimal) {

    counter.textContent =
    value.toFixed(1) + "B";

} else {

    counter.textContent =
    Math.floor(value)
    .toLocaleString();

}


    if (progress < 1) {

    requestAnimationFrame(update);

}

}


    requestAnimationFrame(update);

});

}


    const stats =
    document.getElementById("stats");


    const statsObserver =
    new IntersectionObserver(
    (entries) => {

    if (entries[0].isIntersecting) {

    startCounters();

    statsObserver.disconnect();

}

},
    {
        threshold: 0.3
    }
    );


    statsObserver.observe(stats);


    /* ==========================
    ORB PARALLAX
    =========================== */

    const orb =
    document.querySelector(".orb");


    window.addEventListener(
    "mousemove",
    (event) => {

    const x =
    (event.clientX /
    window.innerWidth - 0.5) * 20;

    const y =
    (event.clientY /
    window.innerHeight - 0.5) * 20;

    orb.style.marginLeft =
    `${x}px`;

    orb.style.marginTop =
    `${y}px`;

}
    );