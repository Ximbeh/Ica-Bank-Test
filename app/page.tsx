import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black text-white h-screen p-8">

      <Image
        src="/fonts/LogoBranco.svg"
        width={50}
        height={18}
        alt="logo Ica-Bank"
        className="mb-4"
      ></Image>
      <h2 className="text-xl">Bem vindo Admin</h2>
      <p className="text-neutral-500 mb-8 text-sm">Saldo total: <span className="text-white">R$100,00</span></p>
      <div className="flex gap-4">

        <Link href='/dashboard/auth/login' className={buttonVariants({ variant: "default" })}>
          <Image
            src="/fonts/account plus.svg"
            width={24}
            height={24}
            alt="dinheiro"
          />
          Criar Conta
        </Link>

        <Link href='/admin/accounts' className={buttonVariants({ variant: "default" })}>
          <Image
            src="/fonts/account view.svg"
            width={24}
            height={24}
            alt="contas"
          />
          Visualizar <br/> Conta
        </Link>

      </div>

    </div>
  );
}
