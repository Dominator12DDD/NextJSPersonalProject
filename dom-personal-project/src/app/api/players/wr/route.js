export async function GET() {
    const baseUrl = process.env.ESPN_API_URL;
    const response = await fetch(
        `${baseUrl}?category=offense%3Areceiving&sort=receiving.receivingYards%3Adesc&season=2026&seasontype=2&limit=200`
    );

    const data = await response.json();
    console.log(JSON.stringify(data.athletes[0], null, 2));

    const players = data.athletes
        .filter((item) => {
            return item.athlete.position.abbreviation === "WR";
        })
        .map((item) => {
            const receivingStats = item.categories.find((category) => {
                return category.name === "receiving";
            });

            return {
                id: item.athlete.id,
                name: item.athlete.displayName,
                position: item.athlete.position.displayName,
                team: item.athlete.teams[0]?.displayName,
                headshot: item.athlete.headshot?.href,
                receivingYds: receivingStats.values[2],
                td: receivingStats.values[4]
            };
        });

    return Response.json(players);
}