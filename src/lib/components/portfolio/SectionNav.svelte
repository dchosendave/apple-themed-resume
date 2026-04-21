<script lang="ts">
    import { onMount } from "svelte";

    const sections = [
        { id: "hero", label: "Intro" },
        { id: "skills", label: "Skills" },
        { id: "experience", label: "Experience" },
        { id: "projects", label: "Projects" },
        { id: "education", label: "Education" },
        { id: "contact", label: "Contact" },
    ];

    let activeId = $state(sections[0].id);
    let scrollProgress = $state(0);

    onMount(() => {
        function handleScroll() {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            const trigger = scrollTop + window.innerHeight * 0.3;
            let current = sections[0].id;

            for (const { id } of sections) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= trigger) {
                    current = id;
                }
            }

            activeId = current;
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    function scrollTo(id: string) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
</script>

<nav
    class="fixed right-5 top-1/2 z-[100] hidden -translate-y-1/2 flex-col items-end gap-[14px] md:flex"
    aria-label="Page sections"
>
    {#each sections as section (section.id)}
        <button
            class="group/nav flex items-center gap-2 rounded-[20px] border-0 bg-transparent p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ios-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ios-bg)]"
            aria-label="Go to {section.label}"
            aria-current={activeId === section.id ? "location" : undefined}
            onclick={() => scrollTo(section.id)}
            type="button"
        >
            <span
                class={[
                    "size-[7px] shrink-0 rounded-full [background:var(--ios-text-secondary)] opacity-[0.35] transition-[width,height,opacity,background,box-shadow] duration-200 motion-reduce:transition-none group-hover/nav:size-2 group-hover/nav:opacity-60",
                    activeId === section.id &&
                        "size-[9px] bg-[var(--ios-blue)] opacity-100 shadow-[0_0_0_3px_rgba(0,122,255,0.18)] dark:shadow-[0_0_0_3px_rgba(10,132,255,0.24)]",
                ]}
            ></span>

            <span
                class={[
                    "max-w-0 overflow-hidden whitespace-nowrap text-[0.65rem] font-semibold tracking-[0.04em] opacity-0 transition-[max-width,opacity,color] duration-200 motion-reduce:transition-none group-hover/nav:max-w-20 group-hover/nav:opacity-100 [color:var(--ios-text-secondary)]",
                    activeId === section.id &&
                        "max-w-20 opacity-100 [color:var(--ios-blue)]",
                ]}
            >
                {section.label}
            </span>
        </button>
    {/each}
</nav>

<div class="fixed inset-x-0 top-0 z-[200] h-0.5 bg-transparent md:hidden" aria-hidden="true">
    <div
        class="h-full rounded-r-[2px] bg-[var(--ios-blue)] transition-[width] duration-100 linear motion-reduce:transition-none"
        style:width={`${scrollProgress}%`}
    ></div>
</div>
