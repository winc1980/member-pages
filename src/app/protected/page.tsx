import { auth } from "@/auth";

export default async function TestRoute() {
  const session = await auth();

  return (
    <main>
      <h1 className="text-3xl mb-5">Test Route</h1>
      <div>User: {session?.user?.name}</div>
    </main>
  );
}