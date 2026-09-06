import { browser } from '$app/environment';

export type SoundCue = 'hover' | 'open' | 'close' | 'confirm' | 'toggle' | 'signature';

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

    function tone(
        frequency: number,
        duration: number,
        volume: number,
        delay = 0,
        type: OscillatorType = 'sine',
        endFrequency = frequency,
    ) {
        const audio = getContext();
        if (!audio) return;

        const start = audio.currentTime + delay;
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, start);
        oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
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

        if (cue === 'hover') tone(460, 0.04, 0.0045, 0, 'triangle', 500);
        if (cue === 'open') {
            tone(330, 0.075, 0.014, 0, 'sine', 349);
            tone(494, 0.09, 0.009, 0.025, 'triangle', 523);
        }
        if (cue === 'close') tone(392, 0.075, 0.014, 0, 'triangle', 262);
        if (cue === 'confirm') {
            tone(392, 0.07, 0.014, 0, 'triangle');
            tone(523, 0.11, 0.016, 0.05, 'sine');
        }
        if (cue === 'toggle') {
            tone(330, 0.07, 0.013, 0, 'triangle');
            tone(440, 0.11, 0.015, 0.055, 'sine');
        }
        if (cue === 'signature') {
            tone(294, 0.08, 0.012, 0, 'triangle');
            tone(392, 0.1, 0.014, 0.065, 'triangle');
            tone(587, 0.16, 0.012, 0.135, 'sine', 622);
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
