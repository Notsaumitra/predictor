import Image from "next/image";
import HomeContainer from "./components/Home";
import Header from "./Header";
import FAQuestions from "./components/FAQuestions";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <HomeContainer />
      <div className="px-4 w-full">
        <FAQuestions />
      </div>
    </main>
  );
}
