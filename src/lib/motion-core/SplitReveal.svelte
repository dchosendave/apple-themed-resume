<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import type { Snippet } from 'svelte';

	type Mode = 'lines' | 'words' | 'chars';
	interface ModeConfig {
		duration: number;
		stagger: number;
	}

	let {
		mode = 'words' as Mode,
		class: className = '',
		delay = 0,
		triggerOnScroll = false,
		config: configProp = {} as Partial<Record<Mode, Partial<ModeConfig>>>,
		children,
	}: {
		mode?: Mode;
		class?: string;
		delay?: number;
		triggerOnScroll?: boolean;
		config?: Partial<Record<Mode, Partial<ModeConfig>>>;
		children?: Snippet;
	} = $props();

	const defaults: Record<Mode, ModeConfig> = {
		lines: { duration: 0.8, stagger: 0.1 },
		words: { duration: 0.65, stagger: 0.055 },
		chars: { duration: 0.4, stagger: 0.012 },
	};

	let container: HTMLElement;

	function run() {
		const cfg: ModeConfig = { ...defaults[mode], ...(configProp[mode] ?? {}) };
		const targets: HTMLElement[] = [];

		if (mode === 'lines') {
			Array.from(container.children).forEach((child) => {
				const el = child as HTMLElement;
				const wrapper = document.createElement('div');
				wrapper.style.overflow = 'hidden';
				el.parentNode!.insertBefore(wrapper, el);
				wrapper.appendChild(el);
				targets.push(el);
			});
		} else {
			const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
			const nodes: Text[] = [];
			let n: Node | null;
			while ((n = walker.nextNode())) nodes.push(n as Text);

			nodes.forEach((textNode) => {
				const text = textNode.textContent ?? '';
				if (!text.trim()) return;
				const parent = textNode.parentNode!;
				const parts = mode === 'chars' ? [...text] : text.split(/(\s+)/);
				const frag = document.createDocumentFragment();

				parts.forEach((part) => {
					if (!part) return;
					if (/^\s+$/.test(part)) {
						frag.appendChild(document.createTextNode(part));
						return;
					}
					const outer = document.createElement('span');
					outer.style.cssText =
						'overflow:hidden;display:inline-block;vertical-align:bottom;line-height:1.1em';
					const inner = document.createElement('span');
					inner.style.display = 'inline-block';
					inner.textContent = part;
					outer.appendChild(inner);
					frag.appendChild(outer);
					targets.push(inner);
				});

				parent.replaceChild(frag, textNode);
			});
		}

		if (targets.length === 0) return;

		gsap.from(targets, {
			yPercent: 110,
			duration: cfg.duration,
			stagger: cfg.stagger,
			ease: 'power3.out',
			delay,
		});
	}

	onMount(() => {
		if (triggerOnScroll) {
			const io = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						run();
						io.disconnect();
					}
				},
				{ threshold: 0.15 }
			);
			io.observe(container);
			return () => io.disconnect();
		} else {
			run();
		}
	});
</script>

<div bind:this={container} class={className}>
	{@render children?.()}
</div>
