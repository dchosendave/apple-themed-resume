<script lang="ts">
    import { onMount } from "svelte";
    import type * as Three from "three";

    let canvas: HTMLCanvasElement;

    type SteamMesh = Three.Mesh<Three.TubeGeometry, Three.MeshStandardMaterial>;

    onMount(() => {
        let cleanup = () => {};
        let cancelled = false;

        async function init() {
            const THREE = await import("three");
            if (cancelled) return;

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            const scene = new THREE.Scene();

            const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
            camera.position.set(0, 0.45, 4.2);
            camera.lookAt(0, 0.28, 0);

            const renderer = new THREE.WebGLRenderer({
                canvas,
                antialias: true,
                alpha: true,
            });

            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x000000, 0);

            const group = new THREE.Group();
            group.rotation.x = -0.08;
            scene.add(group);

            const cupMaterial = new THREE.MeshStandardMaterial({
                color: 0xb7e4c7,
                roughness: 0.38,
                metalness: 0.05,
            });

            const cup = new THREE.Mesh(
                new THREE.CylinderGeometry(0.42, 0.34, 0.8, 48),
                cupMaterial,
            );
            cup.position.y = 0.25;
            group.add(cup);

            const coffeeMaterial = new THREE.MeshStandardMaterial({
                color: 0x5a3b24,
                roughness: 0.52,
                metalness: 0.02,
            });

            const coffee = new THREE.Mesh(
                new THREE.CylinderGeometry(0.36, 0.36, 0.025, 48),
                coffeeMaterial,
            );
            coffee.position.y = 0.665;
            group.add(coffee);

            const saucerMaterial = new THREE.MeshStandardMaterial({
                color: 0x2f4635,
                roughness: 0.45,
                metalness: 0.02,
            });

            const saucer = new THREE.Mesh(
                new THREE.CylinderGeometry(0.72, 0.72, 0.08, 64),
                saucerMaterial,
            );
            saucer.position.y = -0.22;
            group.add(saucer);

            const handle = new THREE.Mesh(
                new THREE.TorusGeometry(0.22, 0.045, 12, 32, Math.PI * 1.25),
                cupMaterial,
            );
            handle.position.set(0.42, 0.25, 0);
            handle.rotation.y = Math.PI / 2;
            group.add(handle);

            const glowMaterial = new THREE.MeshBasicMaterial({
                color: 0xb7e4c7,
                transparent: true,
                opacity: 0.18,
                depthWrite: false,
            });

            const glow = new THREE.Mesh(
                new THREE.TorusGeometry(0.76, 0.012, 8, 96),
                glowMaterial,
            );
            glow.position.y = -0.16;
            glow.rotation.x = Math.PI / 2;
            group.add(glow);

            const steamMaterial = new THREE.MeshStandardMaterial({
                color: 0xb7e4c7,
                transparent: true,
                opacity: 0.45,
                roughness: 0.2,
                depthWrite: false,
            });

            const steamLines: SteamMesh[] = [];

            function createSteamLine(x: number, z: number, height: number) {
                const curve = new THREE.CatmullRomCurve3([
                    new THREE.Vector3(x, 0.75, z),
                    new THREE.Vector3(x + 0.08, 0.95, z + 0.02),
                    new THREE.Vector3(x - 0.06, 1.15, z - 0.02),
                    new THREE.Vector3(x + 0.04, height, z),
                ]);

                const geometry = new THREE.TubeGeometry(curve, 24, 0.012, 8, false);
                const mesh: SteamMesh = new THREE.Mesh(geometry, steamMaterial);

                steamLines.push(mesh);
                group.add(mesh);
            }

            createSteamLine(-0.12, 0, 1.35);
            createSteamLine(0.02, 0.04, 1.45);
            createSteamLine(0.16, -0.03, 1.3);

            scene.add(new THREE.AmbientLight(0xffffff, 1.6));

            const mintLight = new THREE.PointLight(0xb7e4c7, 2, 6);
            mintLight.position.set(1.5, 1.8, 2);
            scene.add(mintLight);

            const warmLight = new THREE.PointLight(0xd6a84f, 0.55, 4);
            warmLight.position.set(-1.4, 0.8, 1.4);
            scene.add(warmLight);

            function resize() {
                const parent = canvas.parentElement;
                if (!parent) return;

                const width = parent.clientWidth;
                const height = parent.clientHeight;
                if (width === 0 || height === 0) return;

                renderer.setSize(width, height, false);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }

            const observer = new ResizeObserver(resize);
            const parent = canvas.parentElement;
            if (parent) observer.observe(parent);
            resize();

            let frame = 0;

            function animate() {
                group.rotation.y += 0.006;

                const time = performance.now() * 0.001;

                steamLines.forEach((steam, index) => {
                    steam.position.y = Math.sin(time * 1.4 + index) * 0.025;
                    steam.material.opacity = 0.32 + Math.sin(time * 1.8 + index) * 0.08;
                });

                glow.rotation.z += 0.004;
                renderer.render(scene, camera);
                frame = requestAnimationFrame(animate);
            }

            if (prefersReducedMotion) {
                renderer.render(scene, camera);
            } else {
                animate();
            }

            cleanup = () => {
                cancelAnimationFrame(frame);
                observer.disconnect();
                cup.geometry.dispose();
                coffee.geometry.dispose();
                saucer.geometry.dispose();
                handle.geometry.dispose();
                glow.geometry.dispose();
                steamLines.forEach((steam) => steam.geometry.dispose());
                cupMaterial.dispose();
                coffeeMaterial.dispose();
                saucerMaterial.dispose();
                glowMaterial.dispose();
                steamMaterial.dispose();
                renderer.dispose();
            };
        }

        void init();

        return () => {
            cancelled = true;
            cleanup();
        };
    });
</script>

<div class="h-24 w-full overflow-hidden rounded-[18px]" aria-hidden="true">
    <canvas bind:this={canvas} class="block h-full w-full"></canvas>
</div>
