import { useState } from 'react';
import { Coffee, Flame, ChefHat, Clock, BarChart3, Calendar, RotateCcw } from 'lucide-react';

// Menu data with preparation times
const menuData = {
  hotDrinks: [
    { id: 1, name: 'Tea', prepTime: 2, icon: Coffee, category: 'Hot Drinks' },
    { id: 2, name: 'Coffee', prepTime: 3, icon: Coffee, category: 'Hot Drinks' },
    { id: 3, name: 'Hot Chocolate', prepTime: 4, icon: Flame, category: 'Hot Drinks' },
  ],
  coldDrinks: [
    { id: 4, name: 'Cold Coffee', prepTime: 5, icon: Coffee, category: 'Cold Drinks' },
    { id: 5, name: 'Juice', prepTime: 2, icon: Coffee, category: 'Cold Drinks' },
    { id: 6, name: 'Smoothie', prepTime: 4, icon: Coffee, category: 'Cold Drinks' },
  ],
  rice: [
    { id: 7, name: 'Biriyani', prepTime: 25, icon: ChefHat, category: 'Rice' },
    { id: 8, name: 'Fried Rice', prepTime: 15, icon: ChefHat, category: 'Rice' },
    { id: 9, name: 'Pulao', prepTime: 20, icon: ChefHat, category: 'Rice' },
  ],
};

function App() {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [scheduledOrders, setScheduledOrders] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // SJF Algorithm Implementation
  const scheduleOrders = () => {
    if (selectedOrders.length === 0) return;

    // Sort by shortest prep time (SJF)
    const sorted = [...selectedOrders].sort((a, b) => a.prepTime - b.prepTime);
    
    let currentTime = 0;
    const scheduled = sorted.map((order, index) => {
      const waitingTime = currentTime;
      const turnaroundTime = currentTime + order.prepTime;
      currentTime += order.prepTime;
      
      return {
        ...order,
        orderNum: index + 1,
        waitingTime,
        turnaroundTime,
        startTime: waitingTime,
        endTime: turnaroundTime,
      };
    });

    setScheduledOrders(scheduled);
    setShowResults(true);
  };

  const toggleOrder = (item) => {
    const exists = selectedOrders.find(o => o.id === item.id);
    if (exists) {
      setSelectedOrders(selectedOrders.filter(o => o.id !== item.id));
    } else {
      setSelectedOrders([...selectedOrders, item]);
    }
  };

  const restart = () => {
    setSelectedOrders([]);
    setScheduledOrders([]);
    setShowResults(false);
  };

  // Calculate statistics
  const calculateStats = () => {
    if (scheduledOrders.length === 0) return { avgWT: 0, avgTAT: 0, throughput: 0 };
    
    const totalWT = scheduledOrders.reduce((sum, order) => sum + order.waitingTime, 0);
    const totalTAT = scheduledOrders.reduce((sum, order) => sum + order.turnaroundTime, 0);
    const totalTime = scheduledOrders[scheduledOrders.length - 1].endTime;
    
    return {
      avgWT: (totalWT / scheduledOrders.length).toFixed(2),
      avgTAT: (totalTAT / scheduledOrders.length).toFixed(2),
      throughput: (scheduledOrders.length / totalTime).toFixed(2),
    };
  };

  const stats = calculateStats();

  // Gantt Chart Component
  const GanttChart = () => {
    if (scheduledOrders.length === 0) return null;
    
    const maxTime = scheduledOrders[scheduledOrders.length - 1].endTime;
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-yellow-500', 'bg-red-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500'];
    
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
          <Calendar className="w-5 h-5" />
          Gantt Chart
        </h3>
        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="relative">
            {scheduledOrders.map((order, idx) => (
              <div key={order.id} className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-medium text-white/90 w-32">{order.name}</span>
                  <div className="flex-1 relative h-10 bg-white/5 rounded-lg overflow-hidden">
                    <div
                      className={`${colors[idx % colors.length]} h-full flex items-center justify-center text-white text-sm font-medium transition-all duration-500 shadow-lg`}
                      style={{
                        width: `${(order.prepTime / maxTime) * 100}%`,
                        marginLeft: `${(order.startTime / maxTime) * 100}%`,
                      }}
                    >
                      {order.prepTime}m
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32"></div>
                  <div className="flex-1 flex justify-between text-xs text-white/60">
                    <span>{order.startTime}m</span>
                    <span>{order.endTime}m</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg flex items-center justify-center gap-3">
            <ChefHat className="w-12 h-12" />
            Restaurant Order Scheduler
          </h1>
          <p className="text-white/80 text-lg">Using Shortest Job First (SJF) Algorithm</p>
        </div>

        {!showResults ? (
          <>
            {/* Menu Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Hot Drinks */}
              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-xl border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Flame className="w-6 h-6 text-orange-400" />
                  Hot Drinks
                </h2>
                <div className="space-y-3">
                  {menuData.hotDrinks.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleOrder(item)}
                      className={`w-full p-4 rounded-xl transition-all duration-300 ${
                        selectedOrders.find(o => o.id === item.id)
                          ? 'bg-white/30 shadow-lg scale-105'
                          : 'bg-white/10 hover:bg-white/20'
                      } border border-white/20`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{item.name}</span>
                        <div className="flex items-center gap-2 text-white/80">
                          <Clock className="w-4 h-4" />
                          <span>{item.prepTime}m</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cold Drinks */}
              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-xl border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Coffee className="w-6 h-6 text-blue-400" />
                  Cold Drinks
                </h2>
                <div className="space-y-3">
                  {menuData.coldDrinks.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleOrder(item)}
                      className={`w-full p-4 rounded-xl transition-all duration-300 ${
                        selectedOrders.find(o => o.id === item.id)
                          ? 'bg-white/30 shadow-lg scale-105'
                          : 'bg-white/10 hover:bg-white/20'
                      } border border-white/20`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{item.name}</span>
                        <div className="flex items-center gap-2 text-white/80">
                          <Clock className="w-4 h-4" />
                          <span>{item.prepTime}m</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rice */}
              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-xl border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <ChefHat className="w-6 h-6 text-green-400" />
                  Rice
                </h2>
                <div className="space-y-3">
                  {menuData.rice.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleOrder(item)}
                      className={`w-full p-4 rounded-xl transition-all duration-300 ${
                        selectedOrders.find(o => o.id === item.id)
                          ? 'bg-white/30 shadow-lg scale-105'
                          : 'bg-white/10 hover:bg-white/20'
                      } border border-white/20`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{item.name}</span>
                        <div className="flex items-center gap-2 text-white/80">
                          <Clock className="w-4 h-4" />
                          <span>{item.prepTime}m</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Orders Summary */}
            {selectedOrders.length > 0 && (
              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-xl border border-white/20 mb-8">
                <h3 className="text-xl font-semibold mb-4 text-white">Selected Orders ({selectedOrders.length})</h3>
                <div className="flex flex-wrap gap-3 mb-4">
                  {selectedOrders.map((order) => (
                    <div key={order.id} className="bg-white/20 px-4 py-2 rounded-lg border border-white/30">
                      <span className="text-white font-medium">{order.name}</span>
                      <span className="text-white/70 ml-2">({order.prepTime}m)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Place Order Button */}
            <div className="flex justify-center">
              <button
                onClick={scheduleOrders}
                disabled={selectedOrders.length === 0}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                Place Order ({selectedOrders.length} items)
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Results Section */}
            <div className="space-y-8">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="backdrop-blur-md bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl p-6 shadow-xl border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm mb-1">Avg Waiting Time</p>
                      <p className="text-3xl font-bold text-white">{stats.avgWT}m</p>
                    </div>
                    <Clock className="w-12 h-12 text-blue-300" />
                  </div>
                </div>
                <div className="backdrop-blur-md bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl p-6 shadow-xl border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm mb-1">Avg Turnaround Time</p>
                      <p className="text-3xl font-bold text-white">{stats.avgTAT}m</p>
                    </div>
                    <BarChart3 className="w-12 h-12 text-green-300" />
                  </div>
                </div>
                <div className="backdrop-blur-md bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl p-6 shadow-xl border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm mb-1">Throughput</p>
                      <p className="text-3xl font-bold text-white">{stats.throughput}</p>
                    </div>
                    <BarChart3 className="w-12 h-12 text-purple-300" />
                  </div>
                </div>
              </div>

              {/* Gantt Chart */}
              <GanttChart />

              {/* Results Table */}
              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-white">Results Table</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="px-4 py-3 text-left text-white font-semibold">Order #</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Item</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Category</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Prep Time (m)</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Waiting Time (m)</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Turnaround Time (m)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduledOrders.map((order) => (
                        <tr key={order.id} className="border-b border-white/10 hover:bg-white/5">
                          <td className="px-4 py-3 text-white/90">{order.orderNum}</td>
                          <td className="px-4 py-3 text-white/90 font-medium">{order.name}</td>
                          <td className="px-4 py-3 text-white/70">{order.category}</td>
                          <td className="px-4 py-3 text-white/90">{order.prepTime}</td>
                          <td className="px-4 py-3 text-white/90">{order.waitingTime}</td>
                          <td className="px-4 py-3 text-white/90">{order.turnaroundTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Restart Button */}
              <div className="flex justify-center">
                <button
                  onClick={restart}
                  className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:scale-105"
                >
                  <RotateCcw className="w-5 h-5" />
                  Restart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
