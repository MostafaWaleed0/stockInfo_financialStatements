export default function Home() {
  return (
    <div className="grid grid-cols-2  gap-3 max-w-2xl mx-auto w-full">
      <a href="/financial-statement" className="bg-gray-800 py-4 px-4 rounded">
        Financial Statement
      </a>
      <a href="/stocks" className="bg-gray-800 py-4 px-4 rounded">
        Stocks
      </a>
    </div>
  );
}
