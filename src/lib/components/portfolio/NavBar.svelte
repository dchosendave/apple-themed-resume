<script lang="ts">
    import ThemeToggle from "./ThemeToggle.svelte";
</script>

<nav class="navbar">
    <div class="navbar-inner page-container">
        <div class="logo">
            <!-- <span class="logo-text">LDD</span>
            <span class="logo-dot"></span> -->
        </div>
        <div class="nav-right">
            <span class="availability">
                <span class="dot-green"></span>
                Open for opportunities
            </span>
            <ThemeToggle />
        </div>
    </div>
</nav>

<style>
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: var(--ios-nav-bg);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--ios-separator);
        height: 56px;
        transition: background 0.3s ease;
    }

    .navbar-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .logo-text {
        font-size: 1rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        color: var(--ios-text-primary);
    }

    .logo-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--ios-blue);
    }

    .nav-right {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .availability {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--ios-text-secondary);
    }

    .dot-green {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #30d158;
        box-shadow: 0 0 6px #30d15880;
    }

    @media (max-width: 480px) {
        .availability {
            display: none;
        }
    }
</style>
