import "./styles.css";
import { useState } from "react";
import DisplaySenateInfo from "./DisplaySenateInfo";

export default function App() {
  const API_KEY = "M8HA6zdlRSIvVaH0SMlRorydQOmVYwbfEBrNv0qb"; // it's free!

  const [senateInfo, setSenateInfo] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [error, setError] = useState(null)

  console.log(selectedState);
  const getSenateInfo = () => {
    fetch(
      `https://api.propublica.org/congress/v1/members/senate/${selectedState}/current.json`,
      {
        headers: {
          "X-API-KEY": API_KEY
        }
      }
    )
      .then((r) => r.json())
      .then((resp) => {
        setSenateInfo(resp.results);
        setSelectedState('')
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedState === "") {
      setError('State Abbreviation cannot be blank')
      return true
    } else if (selectedState.length != 2){
      setError('You must enter in a 2 letter state abbreviation')
    } else {
      setError(null)
      getSenateInfo();
      return false
    }
    console.log("selectedState", selectedState);
    
  };

  return (
    <div className="App">
    <h1>Who are my State Senators</h1>
      <form onSubmit={handleSubmit}>
        <label>State Abbreviation</label>
        <input
          name="state"
          placeholder="state abbreviation..."
          style={{margin: '6px'}}
          type="text"
          onChange={(e) => setSelectedState(e.target.value)}
          value={selectedState}
        />
        {error ? error && <p style={{color: 'red'}}>{error}</p> : null}
        
        <input type="submit" value="Submit" />
      </form>
      <div>
        {senateInfo.map((senator) => (
          <DisplaySenateInfo 
            key={senator.id}
            name={senator.name}
            next_election={senator.next_election}
            party={senator.party}
            nyt_url={senator.times_topics_url}
          />
        ))}
      </div>
    </div>
  );
}
