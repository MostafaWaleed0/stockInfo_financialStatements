"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export function Search({ stocks }: { stocks: { [key: string]: string }[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="relative m-auto w-[30rem] h-10">
      <form
        className="flex w-full py-2 px-3 focus:ring-2 focus:ring-white border border-white rounded-md"
        action={() =>
          router.push(pathname + "?" + createQueryString("keyword", value))
        }
      >
        <input
          type="text"
          className="w-full bg-transparent  outline-0"
          placeholder="microsoft, apple, etc..."
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button type="submit" className="inline-block">
          <svg
            viewBox="0 0 20 20"
            width={24}
            height={24}
            className="fill-current"
            aria-hidden
            focusable={false}
          >
            <path d="M9.79883 18.5894C14.6216 18.5894 18.5894 14.6216 18.5894 9.79883C18.5894 4.96777 14.6216 1 9.79053 1C4.95947 1 1 4.96777 1 9.79883C1 14.6216 4.96777 18.5894 9.79883 18.5894ZM9.79883 14.3062C9.20947 14.3062 8.76953 13.9077 8.76953 13.3433V9.69922L8.86914 8.00586L8.25488 8.84424L7.3916 9.81543C7.23389 10.0063 6.98486 10.1143 6.72754 10.1143C6.21289 10.1143 5.84766 9.75732 5.84766 9.25928C5.84766 8.99365 5.92236 8.79443 6.12158 8.58691L8.96045 5.61523C9.19287 5.35791 9.4585 5.2417 9.79883 5.2417C10.1309 5.2417 10.4048 5.36621 10.6372 5.61523L13.4761 8.58691C13.667 8.79443 13.75 8.99365 13.75 9.25928C13.75 9.75732 13.3848 10.1143 12.8618 10.1143C12.6128 10.1143 12.3638 10.0063 12.2061 9.81543L11.3428 8.86914L10.7202 7.99756L10.8281 9.69922V13.3433C10.8281 13.9077 10.3799 14.3062 9.79883 14.3062Z" />
          </svg>
        </button>
      </form>
      <ul role="list" className="absolute top-20 w-full">
        {stocks.map((stock) => {
          return (
            <li key={stock.symbol}>
              <Link
                className="flex justify-between p-3 mb-3 bg-white text-black rounded"
                href={`/stocks/${stock.symbol}`}
              >
                <span>{stock.name}</span>
                <span>{stock.symbol}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
