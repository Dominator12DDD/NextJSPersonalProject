
export async function GET() {
    const baseUrl = process.env.ESPN_API_URL;

    const qbResponse = await fetch(
        `${baseUrl}?category=offense%3Apassing&sort=passing.passingYards%3Adesc&season=2026&seasontype=2&limit=3`
    );

    const rbResponse = await fetch(
        `${baseUrl}?category=offense%3Arushing&sort=rushing.rushingYards%3Adesc&season=2026&seasontype=2&limit=3`
    );

    const wrResponse = await fetch(
        `${baseUrl}?category=offense%3Areceiving&sort=receiving.receivingYards%3Adesc&season=2026&seasontype=2&limit=3`
    );

    const qbData = await qbResponse.json();
    const rbData = await rbResponse.json();
    const wrData = await wrResponse.json();

    const qbs = qbData.athletes.map((item) => {
        return{
            name: item.athlete.displayName,
            passingYds: item.categories.find((category) => {return category.name === "passing";}).values[3]
            
        };
    });

    const rbs = rbData.athletes.map((item) => {
        return{
            name: item.athlete.displayName,
            rushingYds: item.categories.find((category) => {return category.name === "rushing";}).values[1]
        };
    });

    const wrs = wrData.athletes.map((item) => {
        return{
            name: item.athlete.displayName,
            receivingYds: item.categories.find((category) => {return category.name === "receiving";}).values[2]
        };
    });

    return Response.json({
        qbs: qbs,
        rbs: rbs,
        wrs: wrs
    });
}
