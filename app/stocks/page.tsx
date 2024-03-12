import { Search } from "./search";

export const dynamic = "force-dynamic";

async function searchStockByKeyword(keyword: string) {
  const encodedKeyword = encodeURIComponent(keyword);

  let response = await fetch(
    `https://financialmodelingprep.com/api/v3/search?query=${encodedKeyword}&apikey=${process.env.STOCK_MARKET_API}`,
  );

  return response.json();
}

export default async function StocksPage({
  searchParams,
}: {
  searchParams: { keyword: string };
}) {
  const { keyword } = searchParams;
  const stocks = await searchStockByKeyword(keyword);

  return <Search stocks={stocks} />;
}
