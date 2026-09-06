import { rmSync } from "node:fs";
import { resolve, relative } from "node:path";

const workspace = resolve(process.cwd());
const generatedDirectories = [
    resolve(workspace, ".svelte-kit", "cloudflare"),
    resolve(workspace, ".svelte-kit", "cloudflare-tmp"),
];

for (const directory of generatedDirectories) {
    const pathFromWorkspace = relative(workspace, directory);
    if (pathFromWorkspace.startsWith("..") || pathFromWorkspace === "") {
        throw new Error(`Refusing to remove path outside the workspace: ${directory}`);
    }
    rmSync(directory, { recursive: true, force: true });
}
