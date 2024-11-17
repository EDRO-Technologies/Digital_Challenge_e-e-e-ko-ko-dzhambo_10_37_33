"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


const navs = [
    {
        title: "Сотрудники",
        href: "/registration",
        props: [],
    },
    {
        title: "Скважины",
        href: "/calendar",
        props: [],
    },
    {
        title: "Материал",
        href: "/material",
        props: [],
    },
    {
        title: "Карты",
        href: "/information",
        props: [],
    },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <div className="flex flex-row justify-between h-[78px] items-center w-full bg-white rounded-full mt-7 px-[30px]" >
            <div className="h-full flex items-center">
                <Link href="/" className="">
                    {/* <Image width="57" height="27" src="/Logo.svg" alt="logo" /> */}
                    <span className="font-medium text-[16px]">wells</span>
                    <span className="font-medium text-[16px] text-[#B591EF]">Analizer</span>
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
                <div className="background-contrast-for-icons bg-[#F5F5F5] cursor-pointer">
                    <Image
                        width="20"
                        height="20"
                        src="/Bell_light.svg"
                        alt="notification"
                    />
                </div>

                <div className="background-contrast-for-icons bg-[#B591EF] cursor-pointer">
                    <Avatar>
                        <AvatarImage src="/avatar.svg" alt="avatar" />
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    );
}
