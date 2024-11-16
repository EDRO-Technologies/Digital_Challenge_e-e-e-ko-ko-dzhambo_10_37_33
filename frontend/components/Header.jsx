import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
    return (
        <div className="flex flex-row justify-between items-center w-full bg-white rounded-full lg:mt-7 h-20 py-5 p-10">
            {/* logo */}
            <div>
                <Image width="76" height="38" src="/Logo.svg" alt="logo" />
            </div>

            <nav>
                <Link href="/registration">
                    <Button size="lg" variant="destructive" >Регистрация</Button>
                </Link>
            </nav>

            <div>

            </div>
        </div>
    );
}
