import { Link } from "@nextui-org/react";
import { GithubIcon } from "../icons/icons";
import { ThemeSwitch } from "../theme-switch/theme-switch";

export default function FooterComponent() {
    return (
        <footer className="w-full flex flex-col items-center justify-center py-3 mt-auto">
            <div className="flex gap-2 mb-2">
                <ThemeSwitch />
                <Link
                    isExternal
                    className="text-default-500 cursor-pointer"
                    href="https://github.com/yurikaffer"
                >
                    <GithubIcon />
                </Link>
            </div>
            <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://yurikaffer.dev/"
            >
                <span className="text-default-600 font-medium">{`Desenvolvido com ❤️`}</span>
                <p className="text-primary font-medium">Yuri Kaffer</p>
            </Link>
        </footer>
    )
}