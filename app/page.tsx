"use client";

import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Banknote,
  Settings,
  HelpCircle,
  User,
  LayoutDashboard,
  ShieldCheck,
  LogOut,
  ListOrdered,
  ReceiptText,
  Bell,
  Search,
  PieChart,
  BarChart2,
  Shield,
  Lock,
  AlertTriangle
} from "lucide-react";

const users = [
  { username: "developer1", password: "uUm`5444Tu#e", name: "Alex Johnson" },
  { username: "developer2", password: "hMC4P8r_!4#}", name: "Sam Wilson" },
  { username: "admin", password: "ICTAdministrator1991", name: "Admin User" },
  { username: "john.doe", password: "r`|ynD,77y8$", name: "John Doe" },
  { username: "jane.smith", password: "M!21xdk9KCXk", name: "Jane Smith" },
  { username: "test.user", password: "M!21xdk9KCXk", name: "Test User" },
  { username: "dev.ahmed", password: "8dh&£3BpG0^~", name: "Ahmed Khan" },
];

const hashedUsers = [
  { username: "admin", hash: "8d3b25b6646681ebab527407d88d8363" },
  { username: "user1", hash: "5f4dcc3b5aa765d61d8327deb882cf99" },
  { username: "john.doe", hash: "1670f2fada519bfd5398baaa7b0f0acf" },
  { username: "jane.smith", hash: "bec88d33ab71013733919150e2f1eeb3" },
  { username: "dev.ahmed", hash: "17b0b35a25df7f261d0ca7142707115f" },
];

const transactions = [
  { id: 1, type: "Deposit", amount: "$1,000.00", date: "2025-07-01", status: "Completed", account: "Checking (•••3456)" },
  { id: 2, type: "Withdrawal", amount: "$250.00", date: "2025-07-02", status: "Pending", account: "Savings (•••7890)" },
  { id: 3, type: "Transfer", amount: "$3,500.00", date: "2025-07-04", status: "Completed", account: "Checking → Business" },
  { id: 4, type: "Deposit", amount: "$5,000.00", date: "2025-07-06", status: "Failed", account: "Business (•••1122)" },
  { id: 5, type: "Payment", amount: "$129.99", date: "2025-07-08", status: "Completed", account: "Credit Card (•••5566)" },
];

const tickets = [
  { id: 101, subject: "Can't login to mobile app", status: "Open", date: "2025-07-05", priority: "High" },
  { id: 102, subject: "Transaction stuck pending", status: "Resolved", date: "2025-07-06", priority: "Medium" },
  { id: 103, subject: "Lost card - need replacement", status: "In Progress", date: "2025-07-07", priority: "Critical" },
  { id: 104, subject: "Question about wire transfer", status: "Open", date: "2025-07-09", priority: "Low" },
];

const securityAlerts = [
  { id: 1, type: "New login", description: "Login from Chrome on Windows", date: "2 mins ago", location: "New York, NY" },
  { id: 2, type: "Password change", description: "Password was updated", date: "1 week ago", location: "San Francisco, CA" },
];

export default function BankingCTFApp() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [flag, setFlag] = useState("");
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [notifications, setNotifications] = useState(3);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferRecipient, setTransferRecipient] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [securityAlert, setSecurityAlert] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      // Simulate security alert on login
      const timer = setTimeout(() => {
        setSecurityAlert(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loggedIn]);

  const login = () => {
    const found = users.find(u => u.username === user && u.password === pass);
    if (found) {
      setLoggedIn(true);
      setRole(found.username === "admin" ? "admin" : found.username.startsWith("dev") ? "dev" : "user");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const logout = () => {
    setUser("");
    setPass("");
    setRole("");
    setLoggedIn(false);
    setCurrentPage("dashboard");
    setFlag("");
    setSecurityAlert(false);
  };

  const menuItems = [
    { name: "Dashboard", key: "dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Accounts", key: "accounts", icon: <CreditCard size={18} /> },
    { name: "Transfers", key: "transfers", icon: <Banknote size={18} /> },
    { name: "Transactions", key: "transactions", icon: <ListOrdered size={18} /> },
    { name: "Developer", key: "develop", icon: <ShieldCheck size={18} />, role: ["admin", "dev"] },
    { name: "Admin Tools", key: "admin", icon: <Shield size={18} />, role: ["admin"] },
    { name: "Support", key: "support", icon: <ReceiptText size={18} /> },
    { name: "Settings", key: "settings", icon: <Settings size={18} /> },
    { name: "Help", key: "help", icon: <HelpCircle size={18} /> },
    { name: "Profile", key: "profile", icon: <User size={18} /> },
  ];

  const filteredTransactions = transactions.filter(t => 
    t.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.account.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTickets = tickets.filter(t => 
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-800">
      {loggedIn && (
        <aside className="w-full md:w-64 bg-blue-900 text-white shadow-xl flex flex-col justify-between">
          <div>
            <div className="px-6 py-5 border-b border-blue-800 flex items-center gap-2">
              <ShieldCheck className="text-blue-300" />
              <span className="font-bold text-xl">GlobalTrust Bank</span>
            </div>
            <nav className="flex flex-col gap-1 mt-4">
              {menuItems.map(({ name, key, icon, role: itemRole }) => {
                if (itemRole && !itemRole.includes(role)) return null;
                return (
                  <button
                    key={key}
                    onClick={() => setCurrentPage(key)}
                    className={`flex items-center gap-3 text-left px-6 py-3 hover:bg-blue-800 transition ${currentPage === key ? "bg-blue-800 font-medium" : ""}`}
                  >
                    <span className="text-blue-200">{icon}</span>
                    <span>{name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="px-6 py-4 border-t border-blue-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-200">Security Level</span>
              <span className="text-sm font-medium">{role === "admin" ? "Admin" : "Standard"}</span>
            </div>
            <div className="w-full bg-blue-800 rounded-full h-2 mb-4">
              <div 
                className="bg-green-400 h-2 rounded-full" 
                style={{ width: role === "admin" ? "100%" : "70%" }}
              ></div>
            </div>
            <button 
              onClick={logout} 
              className="flex items-center gap-2 text-blue-200 font-medium hover:text-white w-full justify-center py-2 border border-blue-700 rounded-lg"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </aside>
      )}

      <main className="flex-grow">
        {!loggedIn ? (
          <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-center gap-2 mb-6">
              <ShieldCheck className="text-blue-600" size={28} />
              <h2 className="text-3xl font-bold text-center text-gray-800">GlobalTrust Online</h2>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start gap-3">
              <Lock className="text-blue-600 mt-0.5 flex-shrink-0" size={18} />
              <p className="text-sm text-blue-800">For your security, please keep your login details confidential and ensure you&apos;re on the correct website.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Online Banking ID</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={user}
                  onChange={e => setUser(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <button
                onClick={login}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-md"
              >
                Secure Login
              </button>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                New to GlobalTrust? <a href="#" className="text-blue-600 hover:underline">Enroll now</a>
              </p>
            </div>
            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>© 2025 GlobalTrust Bank. All rights reserved.</p>
              <p className="mt-1">Member FDIC. Equal Housing Lender.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 p-6">
            {securityAlert && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">
                    Security Alert: New login detected from Chrome on Windows in New York, NY. 
                    {!securityAlerts.some(a => a.type === "Password change") && " We recommend changing your password."}
                  </p>
                  <div className="mt-2 flex space-x-3">
                    <button 
                      onClick={() => setSecurityAlert(false)} 
                      className="text-sm text-red-600 hover:text-red-500 font-medium"
                    >
                      Dismiss
                    </button>
                    <button className="text-sm text-red-600 hover:text-red-500 font-medium">
                      View Activity
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {currentPage === "dashboard" ? "Dashboard" : 
                 currentPage === "accounts" ? "My Accounts" :
                 currentPage === "transfers" ? "Transfer Funds" :
                 currentPage === "transactions" ? "Transaction History" :
                 currentPage === "support" ? "Support Center" :
                 currentPage === "settings" ? "Account Settings" :
                 currentPage === "help" ? "Help Center" :
                 currentPage === "profile" ? "My Profile" :
                 currentPage === "develop" ? "Developer Tools" :
                 currentPage === "admin" ? "Admin Console" : ""}
              </h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
                <button className="relative p-2 text-gray-600 hover:text-gray-900">
                  <Bell size={20} />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                    {user.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium hidden md:inline">{users.find(u => u.username === user)?.name || user}</span>
                </div>
              </div>
            </div>

            {currentPage === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-700">Checking Account</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Primary</span>
                    </div>
                    <p className="text-2xl font-bold mb-2">$10,400.25</p>
                    <p className="text-sm text-gray-500">•••• •••• •••• 3456</p>
                    <div className="mt-4 flex gap-2">
                      <button className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition">
                        Transfer
                      </button>
                      <button className="text-sm bg-white text-blue-600 border border-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition">
                        Details
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Savings Account</h3>
                    <p className="text-2xl font-bold mb-2">$5,890.00</p>
                    <p className="text-sm text-gray-500">•••• •••• •••• 7890</p>
                    <div className="mt-4 flex gap-2">
                      <button className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition">
                        Transfer
                      </button>
                      <button className="text-sm bg-white text-blue-600 border border-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition">
                        Details
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Credit Card</h3>
                    <p className="text-2xl font-bold mb-2">$2,450.33</p>
                    <p className="text-sm text-gray-500">•••• •••• •••• 5566</p>
                    <div className="mt-4 flex gap-2">
                      <button className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition">
                        Pay Now
                      </button>
                      <button className="text-sm bg-white text-blue-600 border border-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition">
                        Details
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-700">Recent Transactions</h3>
                      <a href="#" className="text-sm text-blue-600 hover:underline">View All</a>
                    </div>
                    <div className="space-y-4">
                      {transactions.slice(0, 3).map(t => (
                        <div key={t.id} className="flex items-center justify-between pb-2 border-b border-gray-100">
                          <div>
                            <p className="font-medium">{t.type}</p>
                            <p className="text-sm text-gray-500">{t.account} • {t.date}</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${t.type === "Deposit" ? "text-green-600" : "text-red-600"}`}>
                              {t.amount}
                            </p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              t.status === "Completed" ? "bg-green-100 text-green-800" :
                              t.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                              {t.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-700">Spending Analytics</h3>
                      <div className="flex gap-1">
                        <button className="p-1 text-gray-500 hover:text-gray-700">
                          <PieChart size={18} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700">
                          <BarChart2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                      <p>Spending chart visualization would appear here</p>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-500">Food & Dining</p>
                        <p className="font-medium">$487.50</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Shopping</p>
                        <p className="font-medium">$1,245.30</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Bills</p>
                        <p className="font-medium">$890.75</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-700">Security Alerts</h3>
                    <a href="#" className="text-sm text-blue-600 hover:underline">View All</a>
                  </div>
                  <div className="space-y-3">
                    {securityAlerts.map(alert => (
                      <div key={alert.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <ShieldCheck className="text-blue-600" size={16} />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium">{alert.type}</p>
                          <p className="text-sm text-gray-600">{alert.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{alert.date} • {alert.location}</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Review
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentPage === "accounts" && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">My Accounts</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Open New Account
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <CreditCard className="text-blue-600" size={18} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Checking Account</div>
                              <div className="text-sm text-gray-500">Primary</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">•••• 3456</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$10,400.25</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Details</button>
                          <button className="text-blue-600 hover:text-blue-900">Transfer</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                              <Banknote className="text-green-600" size={18} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Savings Account</div>
                              <div className="text-sm text-gray-500">High-Yield</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">•••• 7890</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$5,890.00</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Details</button>
                          <button className="text-blue-600 hover:text-blue-900">Transfer</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <CreditCard className="text-purple-600" size={18} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Credit Card</div>
                              <div className="text-sm text-gray-500">Platinum Rewards</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">•••• 5566</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$2,450.33</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Details</button>
                          <button className="text-blue-600 hover:text-blue-900">Pay</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                              <Banknote className="text-yellow-600" size={18} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Business Account</div>
                              <div className="text-sm text-gray-500">LLC Operating</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">•••• 1122</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$44,820.90</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Details</button>
                          <button className="text-blue-600 hover:text-blue-900">Transfer</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {currentPage === "transfers" && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-6">Transfer Funds</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="text-blue-600 mt-0.5 flex-shrink-0" size={18} />
                        <p className="text-sm text-blue-800">
                          For your security, transfers over $10,000 may require additional verification. 
                          Please ensure all details are correct before submitting.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">From Account</label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>Checking (•••3456) - $10,400.25</option>
                          <option>Savings (•••7890) - $5,890.00</option>
                          <option>Business (•••1122) - $44,820.90</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">To Account</label>
                        <input
                          type="text"
                          placeholder="Enter account number or select recipient"
                          value={transferRecipient}
                          onChange={e => setTransferRecipient(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className="mt-2 flex gap-2">
                          <button className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded hover:bg-gray-200">
                            My Accounts
                          </button>
                          <button className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded hover:bg-gray-200">
                            Recent Recipients
                          </button>
                          <button className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded hover:bg-gray-200">
                            International
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-500">$</span>
                          <input
                            type="text"
                            placeholder="0.00"
                            value={transferAmount}
                            onChange={e => setTransferAmount(e.target.value)}
                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. Rent payment"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          id="schedule"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="schedule" className="ml-2 block text-sm text-gray-700">
                          Schedule for later date
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-4">Transfer Summary</h4>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">From:</span>
                        <span className="text-sm font-medium">Checking (•••3456)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">To:</span>
                        <span className="text-sm font-medium">
                          {transferRecipient || "Not specified"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Amount:</span>
                        <span className="text-sm font-medium">
                          {transferAmount ? `$${transferAmount}` : "$0.00"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Fee:</span>
                        <span className="text-sm font-medium">$0.00</span>
                      </div>
                      <div className="border-t border-gray-200 my-2"></div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total:</span>
                        <span className="text-sm font-medium">
                          {transferAmount ? `$${transferAmount}` : "$0.00"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (role === "admin" && transferAmount === "1337") {
                          setFlag("flag{B4Nk_h4v3_b3en_pwn3d}");
                        }
                      }}
                      className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-md"
                    >
                      Confirm Transfer
                    </button>

                    {flag && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                        {flag}
                      </div>
                    )}

                    <div className="mt-4 text-xs text-gray-500">
                      <p>By clicking Confirm Transfer, you authorize GlobalTrust Bank to process this transaction.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentPage === "transactions" && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h3 className="text-xl font-semibold mb-4 md:mb-0">Transaction History</h3>
                  <div className="flex gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                      />
                      <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>All Accounts</option>
                      <option>Checking</option>
                      <option>Savings</option>
                      <option>Credit Card</option>
                      <option>Business</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Last 30 Days</option>
                      <option>Last 7 Days</option>
                      <option>Last 90 Days</option>
                      <option>This Year</option>
                      <option>Custom Range</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTransactions.map(t => (
                        <tr key={t.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{t.type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.account}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              t.status === "Completed" ? "bg-green-100 text-green-800" :
                              t.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                              {t.status}
                            </span>
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${
                            t.type === "Deposit" ? "text-green-600" : "text-red-600"
                          }`}>
                            {t.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">5</span> transactions
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="text-sm bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
                    Download CSV
                  </button>
                  <button className="text-sm bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                    Print Statement
                  </button>
                  <button className="text-sm bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                    Report Issue
                  </button>
                </div>
              </div>
            )}

            {currentPage === "support" && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold">Support Center</h3>
                    <p className="text-sm text-gray-600 mt-1">Get help with your account or report an issue</p>
                  </div>
                  <button className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    New Ticket
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-blue-800 mb-2">Help Articles</h4>
                    <p className="text-sm text-blue-700 mb-3">Find answers to common questions in our knowledge base.</p>
                    <button className="text-sm text-blue-600 hover:underline">Browse Articles →</button>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 className="font-medium text-green-800 mb-2">Live Chat</h4>
                    <p className="text-sm text-green-700 mb-3">Chat with a representative during business hours.</p>
                    <button className="text-sm text-green-600 hover:underline">Start Chat →</button>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <h4 className="font-medium text-purple-800 mb-2">Phone Support</h4>
                    <p className="text-sm text-purple-700 mb-3">Call us 24/7 at 1-800-GLB-TRST.</p>
                    <button className="text-sm text-purple-600 hover:underline">See Numbers →</button>
                  </div>
                </div>

                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-medium text-gray-800">My Support Tickets</h4>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search tickets..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket #</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTickets.map(t => (
                        <tr key={t.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{t.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.subject}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              t.priority === "Critical" ? "bg-red-100 text-red-800" :
                              t.priority === "High" ? "bg-orange-100 text-orange-800" :
                              t.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                              "bg-blue-100 text-blue-800"
                            }`}>
                              {t.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              t.status === "Open" ? "bg-blue-100 text-blue-800" :
                              t.status === "Resolved" ? "bg-green-100 text-green-800" :
                              "bg-yellow-100 text-yellow-800"
                            }`}>
                              {t.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {currentPage === "admin" && role === "admin" && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold">Admin Console</h3>
                    <p className="text-sm text-gray-600 mt-1">Restricted access - administrative functions only</p>
                  </div>
                  <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-medium">ADMIN</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="font-medium text-gray-800 mb-3">System Status</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Database:</span>
                        <span className="text-sm font-medium text-green-600">Online</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">API:</span>
                        <span className="text-sm font-medium text-green-600">Stable</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Security:</span>
                        <span className="text-sm font-medium text-green-600">Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="font-medium text-gray-800 mb-3">User Management</h4>
                    <div className="space-y-3">
                      <button className="w-full text-left text-sm bg-blue-50 text-blue-700 px-3 py-2 rounded hover:bg-blue-100">
                        View All Users
                      </button>
                      <button className="w-full text-left text-sm bg-blue-50 text-blue-700 px-3 py-2 rounded hover:bg-blue-100">
                        Create New User
                      </button>
                      <button className="w-full text-left text-sm bg-blue-50 text-blue-700 px-3 py-2 rounded hover:bg-blue-100">
                        Audit Logs
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="font-medium text-gray-800 mb-3">Transactions</h4>
                    <div className="space-y-3">
                      <button className="w-full text-left text-sm bg-blue-50 text-blue-700 px-3 py-2 rounded hover:bg-blue-100">
                        Process Pending
                      </button>
                      <button className="w-full text-left text-sm bg-blue-50 text-blue-700 px-3 py-2 rounded hover:bg-blue-100">
                        Flag Suspicious
                      </button>
                      <button className="w-full text-left text-sm bg-blue-50 text-blue-700 px-3 py-2 rounded hover:bg-blue-100">
                        Override Limits
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700 font-medium">
                        Warning: Administrative actions are logged and monitored. Unauthorized use may result in termination.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-medium text-gray-800 mb-4">Manual Funds Transfer</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">From Account</label>
                        <input
                          type="text"
                          placeholder="Enter account number"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">To Account</label>
                        <input
                          type="text"
                          placeholder="Enter account number"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                      <input
                        type="text"
                        placeholder="0.00"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Admin Override Code</label>
                      <input
                        type="password"
                        placeholder="Enter secure code"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        id="override"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="override" className="ml-2 block text-sm text-gray-700">
                        Bypass security checks (requires Level 3 auth)
                      </label>
                    </div>
                    <button
                      onClick={() => setFlag("flag{B4Nk_h4v3_b3en_pwn3d}")}
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Execute Transfer
                    </button>
                    {flag && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                        {flag}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentPage === "develop" && (role === "dev" || role === "admin") && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold">Developer Tools</h3>
                    <p className="text-sm text-gray-600 mt-1">Internal use only - sensitive information</p>
                  </div>
                  <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-medium">DEVELOPER</span>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700 font-medium">
                        Warning: This section contains sensitive system information. Access is restricted to authorized personnel only.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-800 mb-3">User Credential Hashes</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    These MD5 hashes are used for system authentication. Do not share outside the development team.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password Hash</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vulnerability</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {hashedUsers.map(u => (
                          <tr key={u.username} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.username}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{u.hash}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {u.hash === "21232f297a57a5a743894a0e4a801fc3" ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Critical
                                </span>
                              ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                  Medium
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-3">Security Notes</h4>
                  <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
                    <li>All passwords should be hashed with salt in production</li>
                    <li>MD5 is insecure and should be replaced with bcrypt</li>
                    <li>Admin password hash is particularly vulnerable to rainbow table attacks</li>
                    <li>Implement rate limiting on login attempts</li>
                  </ul>
                </div>
              </div>
            )}

            {currentPage === "settings" && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-4">Personal Information</h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input
                              type="text"
                              value="John"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                              type="text"
                              value="Doe"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            value="john.doe@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            value="(555) 123-4567"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-4">Security</h4>
                      <div className="space-y-3">
                        <button className="w-full text-left bg-white border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                          <span>Change Password</span>
                          <span className="text-gray-400">→</span>
                        </button>
                        <button className="w-full text-left bg-white border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                          <span>Two-Factor Authentication</span>
                          <span className="text-sm text-green-600 font-medium">Active</span>
                        </button>
                        <button className="w-full text-left bg-white border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                          <span>Connected Devices</span>
                          <span className="text-gray-400">→</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-2">Account Security Level</h4>
                      <div className="w-full bg-blue-100 rounded-full h-2 mb-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                      <p className="text-sm text-blue-700">Your account security is good. Enable two-factor authentication for maximum protection.</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="font-medium text-gray-800 mb-3">Notification Preferences</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Email Alerts</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">SMS Notifications</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Push Notifications</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-md">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentPage === "help" && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-6">Help Center</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <CreditCard className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">Accounts & Cards</h4>
                        <p className="text-sm text-gray-600">Manage your accounts, order new cards, and more</p>
                      </div>
                    </div>
                    <button className="text-sm text-blue-600 hover:underline">Browse Articles →</button>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <Banknote className="text-green-600" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">Transfers & Payments</h4>
                        <p className="text-sm text-gray-600">Send money, pay bills, and set up recurring transfers</p>
                      </div>
                    </div>
                    <button className="text-sm text-blue-600 hover:underline">Browse Articles →</button>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <ShieldCheck className="text-purple-600" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">Security & Privacy</h4>
                        <p className="text-sm text-gray-600">Keep your account safe and secure</p>
                      </div>
                    </div>
                    <button className="text-sm text-blue-600 hover:underline">Browse Articles →</button>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-yellow-100 p-3 rounded-full">
                        <HelpCircle className="text-yellow-600" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">General Questions</h4>
                        <p className="text-sm text-gray-600">Common questions about online banking</p>
                      </div>
                    </div>
                    <button className="text-sm text-blue-600 hover:underline">Browse Articles →</button>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-3">Contact Support</h4>
                  <p className="text-sm text-gray-600 mb-4">Can&apos;t find what you&apos;re looking for? Our support team is available 24/7.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="bg-white border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      <span>Call Us</span>
                    </button>
                    <button className="bg-white border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      <span>Live Chat</span>
                    </button>
                    <button className="bg-white border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <span>Email Us</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentPage === "profile" && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-6">My Profile</h3>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col items-center">
                      <div className="h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
                        {user.charAt(0).toUpperCase()}
                      </div>
                      <h4 className="text-lg font-medium text-gray-800 mb-1">
                        {users.find(u => u.username === user)?.name || user}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">Customer since 2023</p>
                      <button className="text-sm bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
                        Change Photo
                      </button>
                    </div>

                    <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-3">Account Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Username:</span>
                          <span className="font-medium">{user}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Role:</span>
                          <span className="font-medium capitalize">{role}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Login:</span>
                          <span className="font-medium">Today, 10:42 AM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Login Location:</span>
                          <span className="font-medium">New York, NY</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <h4 className="font-medium text-gray-800 mb-4">Personal Information</h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input
                              type="text"
                              value={users.find(u => u.username === user)?.name.split(' ')[0] || ''}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                              type="text"
                              value={users.find(u => u.username === user)?.name.split(' ')[1] || ''}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <input
                            type="email"
                            value={`${user.replace('.', '_')}@example.com`}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            value="(555) 123-4567"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                          <input
                            type="text"
                            value="123 Main St"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                          />
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <input
                              type="text"
                              value="New York"
                              placeholder="City"
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                              type="text"
                              value="NY"
                              placeholder="State"
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                              type="text"
                              value="10001"
                              placeholder="ZIP"
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <h4 className="font-medium text-gray-800 mb-4">Security</h4>
                      <div className="space-y-4">
                        <button className="w-full text-left bg-white border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                          <div>
                            <p className="font-medium">Password</p>
                            <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                          </div>
                          <span className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Change
                          </span>
                        </button>
                        <button className="w-full text-left bg-white border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-600">Add an extra layer of security</p>
                          </div>
                          <span className="text-green-600 text-sm font-medium">
                            Active
                          </span>
                        </button>
                        <button className="w-full text-left bg-white border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                          <div>
                            <p className="font-medium">Connected Devices</p>
                            <p className="text-sm text-gray-600">Manage your logged-in devices</p>
                          </div>
                          <span className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Manage
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-md">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}