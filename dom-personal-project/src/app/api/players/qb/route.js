export async function GET() {
    const baseUrl = process.env.ESPN_API_URL;
    const response = await fetch(
        `${baseUrl}?category=offense%3Apassing&sort=passing.passingYards%3Adesc&season=2026&seasontype=2&limit=100`
    );

    const data = await response.json();

    const players = data.athletes
        .filter((item) => {
            return item.athlete.position.abbreviation === "QB";
        })
        .map((item) => {
            return {
                id: item.athlete.id,
                name: item.athlete.displayName,
                position: item.athlete.position.displayName,
                team: item.athlete.teams[0]?.displayName,
                headshot: item.athlete.headshot?.href
            };
        });

    return Response.json(players);
}
