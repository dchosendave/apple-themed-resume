import { browser } from '$app/environment';

export type SoundCue = 'hover' | 'open' | 'close' | 'confirm' | 'toggle';

const STORAGE_KEY = 'portfolio-sound';

function createSound() {
    let enabled = $state(true);
    let initialized = $state(false);
    let context: AudioContext | null = null;
    let lastHoverAt = 0;

    function removeUnlockListeners() {
        if (!browser) return;
        window.removeEventListener('pointerdown', unlock, true);
        window.removeEventListener('keydown', unlock, true);
    }

    function unlock() {
        const audio = getContext();
        if (!audio) return;
        if (audio.state === 'running') {
            removeUnlockListeners();
            return;
        }
        void audio.resume().then(removeUnlockListeners).catch(() => {});
    }

    function init() {
        if (!browser || initialized) return;
        try { enabled = localStorage.getItem(STORAGE_KEY) !== 'off'; } catch { /* Storage may be unavailable. */ }
        initialized = true;
        if (enabled) {
            window.addEventListener('pointerdown', unlock, true);
            window.addEventListener('keydown', unlock, true);
        }
    }

    function getContext() {
        if (!browser || typeof AudioContext === 'undefined') return null;
        try { context ??= new AudioContext(); } catch { return null; }
        if (context.state === 'suspended') void context.resume().catch(() => {});
        return context;
    }

    function tone(frequency: number, duration: number, volume: number, delay = 0) {
        const audio = getContext();
        if (!audio) return;

        const start = audio.currentTime + delay;
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, start);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
        oscillator.connect(gain);
        gain.connect(audio.destination);
        oscillator.start(start);
        oscillator.stop(start + duration + 0.02);
    }

    function play(cue: SoundCue, force = false) {
        init();
        if (!browser || (!enabled && !force)) return;
        if (cue === 'hover' && (!context || context.state !== 'running')) return;

        if (cue === 'hover') {
            const now = performance.now();
            if (now - lastHoverAt < 80) return;
            lastHoverAt = now;
        }

        if ('vibrate' in navigator && cue !== 'hover' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            navigator.vibrate(cue === 'confirm' ? [8, 28, 8] : 8);
        }

        if (cue === 'hover') tone(520, 0.035, 0.006);
        if (cue === 'open') tone(392, 0.08, 0.022);
        if (cue === 'close') tone(294, 0.07, 0.018);
        if (cue === 'confirm') {
            tone(440, 0.08, 0.018);
            tone(587, 0.11, 0.018, 0.055);
        }
        if (cue === 'toggle') {
            tone(392, 0.08, 0.018);
            tone(523, 0.12, 0.02, 0.06);
        }
    }

    function toggle() {
        init();
        enabled = !enabled;
        try { localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off'); } catch { /* Keep the preference for this visit. */ }
        if (enabled) {
            unlock();
            play('toggle', true);
        } else {
            removeUnlockListeners();
        }
    }

    return {
        get enabled() { return enabled; },
        init,
        toggle,
        play,
    };
}

export const sound = createSound();
