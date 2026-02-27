const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const iconMap: Record<string, string> = {
    // Languages
    'C#': `${BASE}/csharp/csharp-original.svg`,
    'JavaScript': `${BASE}/javascript/javascript-original.svg`,
    'TypeScript': `${BASE}/typescript/typescript-original.svg`,
    'SQL': `${BASE}/azuresqldatabase/azuresqldatabase-original.svg`,
    'PHP': `${BASE}/php/php-original.svg`,
    'VB.NET': `${BASE}/visualstudio/visualstudio-plain.svg`,
    'HTML': `${BASE}/html5/html5-original.svg`,
    'CSS': `${BASE}/css3/css3-original.svg`,

    // Libraries & Frameworks
    '.NET 8 / .NET Core': `${BASE}/dotnetcore/dotnetcore-original.svg`,
    'ASP.NET Web API': `${BASE}/dotnetcore/dotnetcore-original.svg`,
    'ASP.NET MVC': `${BASE}/dotnetcore/dotnetcore-original.svg`,
    'ASP.NET Web Forms': `${BASE}/dotnetcore/dotnetcore-original.svg`,
    'Angular': `${BASE}/angular/angular-original.svg`,
    'Alpine.js': `${BASE}/alpinejs/alpinejs-original.svg`,
    'jQuery': `${BASE}/jquery/jquery-original.svg`,

    // Databases
    'MS SQL': `${BASE}/microsoftsqlserver/microsoftsqlserver-original.svg`,
    'PostgreSQL': `${BASE}/postgresql/postgresql-original.svg`,
    'Oracle SQL': `${BASE}/oracle/oracle-original.svg`,
    'MySQL': `${BASE}/mysql/mysql-original.svg`,

    // Others
    'Git': `${BASE}/git/git-original.svg`,
    'GitHub': `${BASE}/github/github-original.svg`,
    'Postman': `${BASE}/postman/postman-original.svg`,

    // Stack chip aliases used in experience / projects
    '.NET Web API': `${BASE}/dotnetcore/dotnetcore-original.svg`,
    'SvelteKit': `${BASE}/svelte/svelte-original.svg`,
    'TailwindCSS': `${BASE}/tailwindcss/tailwindcss-original.svg`,
};

/** Returns a Devicons CDN URL for a tech label, or null if none exists. */
export function getIcon(tech: string): string | null {
    return iconMap[tech] ?? null;
}
