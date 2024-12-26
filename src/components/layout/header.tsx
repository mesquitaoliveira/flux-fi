export function Header() {
  return (
    <header className="bg-white text-black p-4 flex justify-between items-center border-b border-gray-300">
      <nav className="flex justify-end space-x-4 text-right w-full">
        <div className="ml-auto">
          <appkit-button />
        </div>
      </nav>
    </header>
  );
}
