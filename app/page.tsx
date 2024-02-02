import Header from "./_components/Header";
import Section1 from "./_components/Sections/section-1";
import Section2 from "./_components/Sections/section-2";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex justify-center mt-4">
        <main className="w-full flex flex-col items-center">
          <Section1 />
          <Section2 />
        </main>
      </div>
    </div>
  );
}
