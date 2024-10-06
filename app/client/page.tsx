import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomeClient() {
    return (
        <div className="bg-black text-white h-screen p-8">

            <Image
                src="/fonts/LogoBranco.svg"
                width={50}
                height={18}
                alt="logo Ica-Bank"
                className="mb-4"
            ></Image>
            <h2 className="text-xl">Bem vindo Cliente</h2>
            <p className="text-neutral-500 mb-8 text-sm">Saldo total: <span className="text-white">R$100,00</span></p>
            <div className="flex gap-4 mb-4">

                <Link href='/client/transferir' className={buttonVariants({ variant: "default" })}>
                    <Image
                        src="/fonts/money.svg"
                        width={24}
                        height={24}
                        alt="dinheiro"
                    />
                    Transferir
                </Link>

                <Link href='/client/extrato' className={buttonVariants({ variant: "default" })}>
                    <Image
                        src="/fonts/contas.svg"
                        width={24}
                        height={24}
                        alt="contas"
                    />
                    Extrato
                </Link>
            </div>
            <Link href='/' className={buttonVariants({ variant: "secondary", size:"lg" })}>
                <Image
                    src="/fonts/account.svg"
                    width={24}
                    height={24}
                    alt="contas"
                />
                Voltar para admin
            </Link>

        </div>
    );
}
