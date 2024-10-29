export const Sidebar = () => {
    return (
      <aside className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Electronics
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Appliances
              </label>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Price Range</h3>
            <input type="range" className="w-full" min="0" max="1000" />
          </div>
        </div>
      </aside>
    );
  };
  