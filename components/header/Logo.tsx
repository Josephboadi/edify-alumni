import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link
      href={"/"}
      className=" rounded-xl shadow-lg p-0 bg-[var(--clr-primary-light)] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  hover:cursor-pointer "
    >
      <div className=" relative w-[40px] h-[40px] ">
        <Image
          src="/loggo.jpg"
          alt="logo"
          sizes="true"
          fill
          className="flex justify-start rounded-xl"
        />
      </div>
    </Link>
  );
}

export default Logo;
