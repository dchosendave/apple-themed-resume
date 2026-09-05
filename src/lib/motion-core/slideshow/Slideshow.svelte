<script lang="ts">
	import { gsap } from "gsap";
	import { onDestroy, onMount } from "svelte";
	import { ensureMotionCoreEase } from "../helpers/gsap";
	import { cn } from "../utils/cn";
	interface Image {
		src: string;
		alt?: string;
	}

	interface ComponentProps {
		/**
		 * Array of images to display in the slideshow.
		 */
		images: Image[];
		/**
		 * Additional CSS classes for the container.
		 */
		class?: string;
		/** How the primary images fit within the frame. */
		imageFit?: "cover" | "contain";
		/** Called after a new slide is selected. */
		onChange?: (index: number) => void;
		[prop: string]: unknown;
	}
	let {
		images,
		class: className = "",
		imageFit = "cover",
		onChange,
		...restProps
	}: ComponentProps = $props();
	onMount(() => {
		ensureMotionCoreEase();
	});
	let rootRef: HTMLElement | undefined;
	let slidesRef: HTMLElement[] = $state([]);
	let innersRef: HTMLElement[] = $state([]);
	let currentIndex = $state(0);
	let isAnimating = false;
	let activeTimeline: gsap.core.Timeline | null = null;
	let ctx: gsap.Context | null = null;
	const animationDuration = 0.85;

	const attachRoot = (node: HTMLElement) => {
		rootRef = node;
		ctx = gsap.context(() => {}, node);
		let pointerStartX: number | null = null;
		const startSwipe = (event: PointerEvent) => {
			if (event.pointerType !== "mouse") pointerStartX = event.clientX;
		};
		const finishSwipe = (event: PointerEvent) => {
			if (pointerStartX === null) return;
			const distance = event.clientX - pointerStartX;
			pointerStartX = null;
			if (Math.abs(distance) >= 45) navigateBy(distance < 0 ? 1 : -1);
		};
		const cancelSwipe = () => (pointerStartX = null);
		node.addEventListener("pointerdown", startSwipe);
		node.addEventListener("pointerup", finishSwipe);
		node.addEventListener("pointercancel", cancelSwipe);
		return () => {
			node.removeEventListener("pointerdown", startSwipe);
			node.removeEventListener("pointerup", finishSwipe);
			node.removeEventListener("pointercancel", cancelSwipe);
			ctx?.revert();
			ctx = null;
			rootRef = undefined;
		};
	};

	const attachSlide = (index: number) => (node: HTMLElement) => {
		slidesRef[index] = node;
	};

	const attachInner = (index: number) => (node: HTMLImageElement) => {
		innersRef[index] = node;
	};
	function navigate(targetIndex: number) {
		if (isAnimating || targetIndex === currentIndex) return;
		isAnimating = true;
		const direction = targetIndex > currentIndex ? 1 : -1;
		const previousIndex = currentIndex;
		currentIndex = targetIndex;
		onChange?.(currentIndex);
		const currentSlide = slidesRef[previousIndex];
		const currentInner = innersRef[previousIndex];
		const upcomingSlide = slidesRef[currentIndex];
		const upcomingInner = innersRef[currentIndex];
		if (!ctx || !currentSlide || !currentInner || !upcomingSlide || !upcomingInner) {
			isAnimating = false;
			return;
		}
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			gsap.set(currentSlide, { zIndex: 0, xPercent: 0 });
			gsap.set(upcomingSlide, { zIndex: 10, xPercent: 0 });
			isAnimating = false;
			return;
		}
		activeTimeline?.kill();
		ctx.add(() => {
			gsap.set(upcomingSlide, { zIndex: 20 });
			gsap.set(currentSlide, { zIndex: 10 });
			const tl = gsap.timeline({
				defaults: { duration: animationDuration, ease: "motion-core-ease" },
				onComplete() {
					isAnimating = false;
					if (activeTimeline === tl) {
						activeTimeline = null;
					}
					gsap.set(currentSlide, { zIndex: 0, xPercent: 0 });
					gsap.set(currentInner, { xPercent: 0 });
					gsap.set(upcomingSlide, { zIndex: 10 });
				},
			});
			activeTimeline = tl;
			tl.to(currentSlide, { xPercent: -direction * 100 }, 0)
				.to(currentInner, { xPercent: direction * 75 }, 0)
				.fromTo(
					upcomingSlide,
					{ xPercent: direction * 100 },
					{ xPercent: 0 },
					0,
				)
				.fromTo(
					upcomingInner,
					{ xPercent: -direction * 75 },
					{ xPercent: 0 },
					0,
				);
		});
	}
	function navigateBy(offset: number) {
		navigate((currentIndex + offset + images.length) % images.length);
	}
	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
		event.preventDefault();
		navigateBy(event.key === "ArrowRight" ? 1 : -1);
	}
	onDestroy(() => {
		activeTimeline?.kill();
		activeTimeline = null;
	});
	$effect(() => {
		if (slidesRef[currentIndex]) {
			ctx?.add(() => {
				gsap.set(slidesRef[currentIndex], { zIndex: 10 });
			});
		}
	});
</script>

<div
	{@attach attachRoot}
	class={cn("relative h-full w-full overflow-hidden", className)}
	role="region"
	aria-label="Image slideshow"
	{...restProps}
>
	{#each images as image, i (image.src)}
		<div
			{@attach attachSlide(i)}
			aria-hidden={i !== currentIndex}
			class="pointer-events-none absolute inset-0 z-0 overflow-hidden will-change-[transform,opacity]"
		>
			<img
				{@attach attachInner(i)}
				src={image.src}
				alt={image.alt ?? ""}
				class={cn("absolute h-full w-full will-change-transform", imageFit === "contain" ? "object-contain" : "object-cover")}
				draggable="false"
			/>
		</div>
	{/each}
	<div class="slideshow-controls absolute inset-x-4 bottom-4 z-50 flex items-center justify-between">
		<button onclick={() => navigateBy(-1)} onkeydown={handleKeydown} class="slideshow-arrow" aria-label="Previous slide">←</button>
		<div class="flex items-center gap-2" aria-label="Choose slide">
		{#each images as _, i}
			<button
				onclick={() => navigate(i)}
				onkeydown={handleKeydown}
				class:active-dot={i === currentIndex}
				class="slideshow-dot"
				aria-label="Go to slide {i + 1}"
				aria-current={i === currentIndex ? "true" : undefined}
			></button>
		{/each}
		</div>
		<button onclick={() => navigateBy(1)} onkeydown={handleKeydown} class="slideshow-arrow" aria-label="Next slide">→</button>
	</div>
</div>

<style>
	.slideshow-arrow { display: grid; width: 36px; height: 36px; place-items: center; border: 1px solid color-mix(in srgb, var(--ios-text-primary) 16%, transparent); border-radius: 50%; color: var(--ios-text-primary); background: color-mix(in srgb, var(--ios-bg) 84%, transparent); backdrop-filter: blur(10px); cursor: pointer; }
	.slideshow-dot { width: 6px; height: 6px; border: 0; border-radius: 50%; background: color-mix(in srgb, var(--ios-text-primary) 25%, transparent); cursor: pointer; transition: width 180ms ease, background 180ms ease; }
	.slideshow-dot.active-dot { width: 20px; border-radius: 999px; background: var(--ios-blue); }
	@media (prefers-reduced-motion: reduce) { .slideshow-dot { transition: none; } }
</style>
