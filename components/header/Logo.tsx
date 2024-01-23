import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link
      href={"/"}
      className=" !rounded-2xl shadow-lg p-2 bg-[var(--clr-primary)]  hover:cursor-pointer "
    >
      <div className=" relative w-[40px] h-[40px] ">
        <Image
          src="/loggo.jpg"
          alt="logo"
          sizes="true"
          fill
          className="flex justify-start "
        />
      </div>
    </Link>
  );
}

export default Logo;
