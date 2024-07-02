'use client'
import { Accordion, AccordionItem, Link } from "@nextui-org/react";
import { Bag, House, IdentificationCard, Note, SquaresFour } from "@phosphor-icons/react";
import { ThemeSwitch } from "../ui/theme-switch";

export default function Nav() {
  return (
    <div className="flex flex-col gap-2 pt-10 pl-10 h-full ">
      {/*<img src="/tec-logo-cut.webp" alt="logo empresa" className="mb-[3rem] w-full h-[80px]" >*/}
      <Link className="shadow-medium flex gap-2 bg-white dark:bg-[#18181B]  text-gray-800 dark:text-gray-100 p-2  rounded-xl" href="/">
        <House className="ml-2" size={28} />
        Home
      </Link>
      <Accordion
        isCompact
        showDivider={false}
        variant="shadow"
      >
        <AccordionItem
          key="1"
          aria-label="Cadastros"
          title="Cadastros"
          startContent={<SquaresFour size={28} />}
        >
          <div className="flex flex-col gap-2 ml-2 pb-2">
            <div className="flex gap-2">
              <Note size={24} />
              <Link className="text-gray-800 dark:text-gray-100" href="/pedidos">Pedidos</Link>
            </div>
            <div className="flex gap-2">
              <Bag size={24} />
              <Link className="text-gray-800 dark:text-gray-100" href="/produtos">Produtos</Link>
            </div>
            <div className="flex gap-2">
              <IdentificationCard size={24} />
              <Link className="text-gray-800 dark:text-gray-100" href="/clientes">Clientes</Link>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
      <ThemeSwitch/>
    </div>
  )
}