"use client"
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
const accountsData = [
    {
        id: 1,
        name: "Siciliano Doarte Pereira",
        balance: 100.0,
        cpf: "111.111.111-11",
        email: "siciliano@gmail.com",
    },
    {
        id: 2,
        name: "Fulano da Silva Dutra",
        balance: 50.0,
        cpf: "222.222.222-22",
        email: "fulano@gmail.com",
    },
    {
        id: 3,
        name: "Emilio Gaspar Perez",
        balance: 150.0,
        cpf: "333.333.333-33",
        email: "emilio@gmail.com",
    },
];

export default function Accounts() {
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    const toggleDropdown = (index: number) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <div className="bg-black text-white h-screen p-8">
            <Link href="/">
                <Image
                    src="/fonts/LogoBranco.svg"
                    width={50}
                    height={18}
                    alt="logo Ica-Bank"
                    className="mb-4"
                />

            </Link>

            <h2 className="text-xl mb-4">Contas Abertas</h2>

            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Pesquisar"
                    className="w-full bg-neutral-900 placeholder:text-muted-foreground p-2 rounded-lg"
                />
                <Search className="absolute right-3 top-2 text-gray-400" />
            </div>

            <div className="border-b border-white mb-8"></div>

            <div className="space-y-8">
                {accountsData.map((account, index) => (
                    <div key={account.id}>
                        <p className="text-sm mb-1">{account.name}</p>

                        <div
                            className={`bg-neutral-900 py-2 px-3 flex justify-between items-center transition-all duration-300 ${openDropdown === account.id ? 'rounded-t-sm' : 'rounded-sm'}`}
                        >
                            <div>
                                <p className={`text-xs text-gray-400 transition-opacity duration-300 ${openDropdown === account.id ? 'opacity-100 flex' : 'opacity-0 hidden'}`}>Saldo</p>
                                <p>R${account.balance.toFixed(2)}</p>
                            </div>
                            <button
                                className="focus:outline-none"
                                onClick={() => toggleDropdown(account.id)}
                            >
                                {openDropdown === account.id ? (
                                    <ChevronRight className="text-muted-foreground" />
                                ) : (
                                    <ChevronDown className="text-muted-foreground" />
                                )}
                            </button>
                        </div>

                        {openDropdown === account.id && (
                            <div className="p-4 bg-neutral-900 rounded-b transition-all duration-300">
                                <p className="text-xs text-gray-400">CPF</p>
                                <p className="text-sm mb-4">{account.cpf}</p>
                                <p className="text-xs text-gray-400">Email</p>
                                <p className="text-sm mb-4">{account.email}</p>

                                <div className="flex gap-4 justify-between">
                                     <Link href='/client'
                                        className={`${buttonVariants({
                                            variant: "submit",
                                        })} w-full mr-2`}
                                    >
                                        Entrar
                                    </Link>
                                    <button
                                        className={`${buttonVariants({
                                            variant: "destructive",
                                        })} w-full`}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
