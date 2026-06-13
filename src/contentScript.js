// prettier-ignore
const CHROMEOS_UAS = "Mozilla/5.0 (X11; CrOS x86_64 16640.57.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.250 Safari/537.36";

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

        const propsKey = Object.keys(target).find((k) => k.startsWith("__reactProps$"));
        const props = propsKey ? target[propsKey] : null;
        const teamId = target.getAttribute("data-team");
        if (props && teamId && typeof props.onClick === "function") {
            props.onClick(teamId);
        } else {
            target.click();
        }
    },
    true,
);
