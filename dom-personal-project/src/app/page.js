import PlayerCard from "./PlayerCard";

export default function PlayersHomePage() {
  return(
    <main>
      <h1>NFL Player Stats</h1>
      <br></br>

      <div>
        <PlayerCard
          name= "Brock Purdy"
          team= "San Francisco 49ers"
          position= "Quarterback"
          passingYds= {295}
          td= {2}/>
      </div>

      <div>
        <PlayerCard
          name= "Mike Evans"
          team= "San Francisco 49ers"
          position= "Wide Receiver"
          receivingYds= {100}
          td= {1}/>
      </div>

      <div>
        <PlayerCard
          name= "Christian McCaffrey"
          team= "San Francisco 49ers"
          position= "Running Back"
          rushingYds= {50}
          td= {0}/>
      </div>
    </main>
  )
}
