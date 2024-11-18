import { Link2Icon } from "lucide-react";
import Link from "next/link";

function HomePage() {
  return (
    <div>
      <h1 className="text-3xl">HomePage</h1>
      <Link href={"/redux-graphql"}>
        <div className=" w-96 bg-green-400 p-3 flex flex-row gap-2">
          Go to test Graph QL and Redux <Link2Icon />
        </div>
      </Link>
    </div>
  );
}

export default HomePage;
