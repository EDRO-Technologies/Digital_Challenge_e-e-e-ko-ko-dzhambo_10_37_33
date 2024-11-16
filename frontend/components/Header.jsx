"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const navs = [
    {
        title: "Регистрация",
        href: "/registration",
        props: [],
    },
    {
        title: "Календарь",
        href: "/calendar",
        props: [],
    },
    {
        title: "Материал",
        href: "/material",
        props: [],
    },
    {
        title: "Информация",
        href: "/information",
        props: [],
    },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <div className="flex flex-row justify-between items-center w-full bg-white rounded-full lg:mt-7 h-20 py-5 p-10">
            {/* logo */}
            <div>
                <Link href="/">
                    <Image width="76" height="38" src="/Logo.svg" alt="logo" />
                </Link>
            </div>

            <nav className="flex flex-row space-x-3">
                {navs.map((link) => (
                    <Link key={link.href} href="/registration">
                        <Button
                            {...link.props}
                            size="lg"
                            variant={
                                pathname.includes(link.href)
                                    ? "default"
                                    : "ghost"
                            }
                            className="px-3"
                        >
                            {link.title}
                        </Button>
                    </Link>
                ))}
            </nav>

            <div className="flex flex-row space-x-3">
                <div className="background-contrast-for-icons">
                    <Image
                        width="25"
                        height="25"
                        src="/Bell_light.svg"
                        alt="notification"
                    />
                </div>

                <div className="background-contrast-for-icons">
                    <Avatar>
                        <AvatarImage src="/4159828.png" alt="avatar" />
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    );
}
