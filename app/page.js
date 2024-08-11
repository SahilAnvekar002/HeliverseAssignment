import AddComponent from "@/components/AddComponent";

export default function Home() {

  return (
    <>
      <div className="w-full h-[100vh] flex justify-center items-center">
        <h1 className="font-bold text-3xl text-gray-800">No Class Selected</h1>
      </div>
      <AddComponent />
    </>
  );
}
