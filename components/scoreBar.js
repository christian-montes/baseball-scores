export default function GameBar({ home, away }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>{away.name}</div>
        <div>Game Inning / State</div>
        <div>{home.name}</div>
      </div>
    </>
  );
}
