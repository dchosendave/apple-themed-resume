import { browser } from '$app/environment';

function createTheme() {
    let isDark = $state(true);

    function applyClass() {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    function init() {
        if (browser) {
            const saved = localStorage.getItem('portfolio-theme');
            isDark = saved !== null ? saved === 'dark' : true;
            applyClass();
        }
    }

    function toggle() {
        isDark = !isDark;
        if (browser) {
            localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
            applyClass();
        }
    }

    return {
        get isDark() {
            return isDark;
        },
        init,
        toggle
    };
}

export const theme = createTheme();
