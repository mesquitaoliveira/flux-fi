export function Header() {
  return (
    <header className="bg-white text-black p-4 flex justify-between items-center border-b border-gray-300">
      <div className="text-lg font-bold">M</div>
      <nav className="flex space-x-4">
        <appkit-button />
      </nav>
    </header>
  );
}
