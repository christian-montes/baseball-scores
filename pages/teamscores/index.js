import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/layout";

export default function Hello() {
  const router = useRouter();

  useEffect(() => {
    router.push('/scores')
  }, [])
  return (
    <Layout>
      <div>Page in development</div>
    </Layout>
  );
}