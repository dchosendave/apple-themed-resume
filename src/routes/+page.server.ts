import { getGitHubPulse } from "$lib/server/github-pulse";
import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch, setHeaders }) => {
    setHeaders({
        "cache-control": "public, max-age=900, s-maxage=1800, stale-while-revalidate=86400",
    });

    return {
        githubPulse: await getGitHubPulse(fetch),
    };
}) satisfies PageServerLoad;
