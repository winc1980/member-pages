import { auth } from "@/auth";
import AuthButton from "@/components/AuthButton.server";
import { type FC } from "react";

const Home: FC = async () => {
  const session = await auth();
  return (
    <div className="">
      <div className="text-lg font-bold">Home</div>
      <div>
        <span className="text-blue-500">Hello</span>
        <span className="text-red-500">World</span>
      </div>
      <pre className="bg-slate-100 p-2 text-sm text-slate-700">
       {JSON.stringify(session, null, 2)}
     </pre>
     <AuthButton />
    </div>
  );
};

export default Home;