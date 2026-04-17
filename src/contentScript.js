// prettier-ignore
const CHROMEOS_UAS = "Mozilla/5.0 (X11; CrOS x86_64 16503.74.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.7559.172 Safari/537.36";

const scriptTag = document.createElement("script");
scriptTag.type = "text/javascript";
scriptTag.innerText = `Object.defineProperty(window.navigator, "userAgent", { get: () => "${CHROMEOS_UAS}" })`;

document.documentElement.insertBefore(scriptTag, document.documentElement.firstChild);

document.addEventListener(
    "keydown",
    (e) => {
        if (!e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
        if (!/^[1-9]$/.test(e.key)) return;
        const items = document.querySelectorAll('[data-qa="team_sidebar_item"]');
        const target = items[parseInt(e.key, 10) - 1];
        if (!target) return;
        e.preventDefault();
        e.stopPropagation();
        target.click();
    },
    true,
);
