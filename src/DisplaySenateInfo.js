export default function DisplaySenateInfo({name, party, next_election, nyt_url} ) {
  return (
    <div>
      <h2>{name} ({party})</h2>
      <p>Election Year: {next_election}</p>
      <a href={nyt_url}>NY Times Topical Articles</a>
      <hr></hr>
    </div>
  )
}