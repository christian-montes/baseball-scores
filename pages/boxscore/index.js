import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Reroute() {
  const router = useRouter();
  let gameID = router.query['gameID'];

  useEffect(() => {
    if (!gameID) {
      router.replace('/scores');
    }
  })

  return <div>No game selected. Redirecting to games.</div>;
}
