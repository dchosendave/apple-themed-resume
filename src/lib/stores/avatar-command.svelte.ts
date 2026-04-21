export type AvatarCommandMode = "idle" | "command" | "searching";

function createAvatarCommand() {
    let mode = $state<AvatarCommandMode>("idle");

    function syncFromPalette(open: boolean, search: string) {
        if (!open) {
            mode = "idle";
            return;
        }

        mode = search.trim().length > 0 ? "searching" : "command";
    }

    function reset() {
        mode = "idle";
    }

    return {
        get mode() {
            return mode;
        },
        syncFromPalette,
        reset
    };
}

export const avatarCommand = createAvatarCommand();
