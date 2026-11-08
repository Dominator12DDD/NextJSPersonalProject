export async function GET() {
    const baseUrl = process.env.ESPN_API_URL;
    const response = await fetch(
        `${baseUrl}?category=offense%3Arushing&sort=rushing.rushingYards%3Adesc&season=2026&seasontype=2&limit=200`
    );

    const data = await response.json();

    const players = data.athletes
        .filter((item) => {
            return item.athlete.position.abbreviation === "RB";
        })
        .map((item) => {
            const rushingStats = item.categories.find((category) => {
                return category.name === "rushing";
            });

            return {
                id: item.athlete.id,
                name: item.athlete.displayName,
                position: item.athlete.position.displayName,
                team: item.athlete.teams[0]?.displayName,
                headshot: item.athlete.headshot?.href,
                rushingYds: rushingStats.values[1],
                td: rushingStats.values[5]
            };
        });

    return Response.json(players);
}