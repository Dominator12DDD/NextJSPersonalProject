export default function PlayerCard({headshot, name, team, position, passingYds, receivingYds, rushingYds, td}) {
    console.log(headshot);
    return(
        <div className = "player-card">
            <div className = "player-card-image">
                <img src={headshot} alt={name} width="100" />
            </div>
            <div className = "player-card-info">
                <h2>{name}</h2>
                <p>Team: {team}</p>

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
        </div>
    )
}
