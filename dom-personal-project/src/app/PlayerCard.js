export default function PlayerCard({name, team, position, passingYds, receivingYds, rushingYds, td}) {
    return(
        <div>
            <h2>{name}</h2>
            <p>Team: {team}</p>
            <p>Position: {position}</p>

            {position === "Quarterback" && (
                <p>Passing Yards: {passingYds} <br/>Passing Touchdowns: {td}</p>
            )}

            {position === "Wide Receiver" && (
                <p>Receiving Yards: {receivingYds} <br/>Receiving Touchdowns: {td}</p>
            )}

            {position === "Running Back" && (
                <p>Rushing Yards: {rushingYds} <br/>Rushing Touchdowns: {td}</p>
            )}
        </div>
    )
}
