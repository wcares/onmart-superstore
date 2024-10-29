export const Header = () => {
    return (
      <header className="bg-blue-600 text-white p-4">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">OnMart</h1>
          <div className="flex space-x-4">
            <button className="p-2">Cart</button>
            <button className="p-2">Account</button>
          </div>
        </nav>
      </header>
    );
  };