import Image from "next/image";

async function getStockDetails(symbol: string) {
  let response = await fetch(
    `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.STOCK_MARKET_API}`,
  );

  return response.json();
}

export default async function StockPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug: symbol } = params;
  const [stock] = await getStockDetails(symbol);

  return (
    <div className="text-base max-w-xl mx-auto bg-black rounded-xl overflow-hidden shadow-md">
      <div className="bg-white text-black py-4 px-6">
        <Image
          src={stock.image}
          alt={stock.companyName}
          className="rounded-full mx-auto"
          width={80}
          height={80}
        />
        <h2 className="text-xl font-semibold text-center">
          {stock.companyName}
        </h2>
        <p className="text-sm text-center">{stock.symbol}</p>
      </div>
      <ul className="py-4 px-6">
        <li>
          <strong>CEO:</strong> {stock.ceo}
        </li>
        <li>
          <strong>Sector:</strong> {stock.sector}
        </li>
        <li>
          <strong>Industry:</strong> {stock.industry}
        </li>
        <li>
          <strong>Country:</strong> {stock.country}
        </li>
        <li>
          <strong>Exchange:</strong> {stock.exchange}
        </li>
        <li>
          <strong>Website:</strong>{" "}
          <a href={stock.website} target="_blank" rel="noopener noreferrer">
            {stock.website}
          </a>
        </li>
      </ul>
      <div className="py-4 px-6">
        <h3 className="text-lg font-semibold mb-5">Financial Details</h3>
        <ul role="list">
          <li>
            <strong>Price:</strong> {stock.price} {stock.currency}
          </li>
          <li>
            <strong>Beta:</strong> {stock.beta}
          </li>
          <li>
            <strong>Volume Average:</strong> {stock.volAvg}
          </li>
          <li>
            <strong>Market Cap:</strong> {stock.mktCap}
          </li>
          <li>
            <strong>Last Dividend:</strong> {stock.lastDiv}
          </li>
          <li>
            <strong>Range:</strong> {stock.range}
          </li>
          <li>
            <strong>Changes:</strong> {stock.changes}
          </li>
          <li>
            <strong>DCF Difference:</strong> {stock.dcfDiff}
          </li>
          <li>
            <strong>DCF:</strong> {stock.dcf}
          </li>
        </ul>
      </div>

      <div className="description py-4 px-6">
        <h3 className="text-lg font-semibold">Description</h3>
        <p>{stock.description}</p>
      </div>
    </div>
  );
}
