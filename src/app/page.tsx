import Image from "next/image";
export default function Home() {

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold my-8 mr-12">Fullstack Todo</h1>
        <Image src={"project-icon.svg"} alt="" width={400} height={400}></Image>
      </div>
    </>
  );
}
