"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { doc, getDoc, collection, getDocs, query, orderBy, limit, startAfter, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/utils/firebase/firebase";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";

export default function AdminDashboard() {
  const router = useRouter();
  const { userData, profile, loading } = useAuth();
  const { toast, showSuccess, showError, hideToast } = useToast();
  
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    paidUsers: 0,
    pendingUsers: 0,
    verifiedUsers: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const loadUsersAndStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const usersRef = collection(db, "Users");

      // total count
      const countSnapshot = await getCountFromServer(usersRef);
      const totalCount = countSnapshot.data().count;
      setTotalUsersCount(totalCount);
      setTotalPages(Math.ceil(totalCount / pageSize));

      // build query
      let q = query(usersRef, limit(pageSize));
      if (currentPage > 1 && lastDoc) {
        q = query(
          usersRef,
          startAfter(lastDoc),
          limit(pageSize)
        );
      }

      const querySnapshot = await getDocs(q);

      const usersData = [];
      let totalUsers = 0;
      let paidUsers = 0;
      let pendingUsers = 0;
      let verifiedUsers = 0;

      querySnapshot.forEach((docSnap) => {
        const user = { id: docSnap.id, ...docSnap.data() };
        usersData.push(user);
        totalUsers++;

        if (user.payment) paidUsers++;
        else pendingUsers++;
        console.log("user data",user);
        console.log(usersData)
        if (user.delegate_kiit || user.idcard || user.wrist_band) {
          verifiedUsers++;
        }
      });

      // pagination cursor
      if (querySnapshot.docs.length > 0) {
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setHasNextPage(querySnapshot.docs.length === pageSize);
      } else {
        setHasNextPage(false);
      }

      setUsers(usersData);
      setStats({ totalUsers, paidUsers, pendingUsers, verifiedUsers });
    } catch (err) {
      console.error("Error loading users:", err);
      showError("Failed to load users");
    } finally {
      setIsLoading(false);
      console.log("Users loaded:", users);
    }
  }, [currentPage, pageSize, lastDoc, showError]);

  // Admin access control
  useEffect(() => {
    if (!loading) {
      if (!userData || !profile) {
        router.replace("/login");
        return;
      }
      
      if (profile.role !== "admin") {
        showError("Access denied. Admin privileges required.");
        router.replace("/dashboard");
        return;
      }
    }
  }, [loading, userData, profile, router, showError]);

  // Load users and stats
  useEffect(() => {
    if (profile?.role === "admin") {
      loadUsersAndStats();
    }
  }, [profile, currentPage, pageSize]);

  // Memoize the loadUsersAndStats function to prevent unnecessary re-renders

  //   const memoizedLoadUsersAndStats = useCallback(loadUsersAndStats, [currentPage, pageSize, lastDoc]);
  
  // Reset pagination when page size changes
  useEffect(() => {
    if (profile?.role === "admin") {
      setCurrentPage(1);
      setLastDoc(null);
      setHasNextPage(true);
    }
  }, [pageSize, profile]);


  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.elixir?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination navigation functions
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      setLastDoc(null); // Reset cursor for new page
      setHasNextPage(true);
    }
  };

  const goToNextPage = () => {
    if (hasNextPage && !isLoading) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1 && !isLoading) {
      setCurrentPage(prev => prev - 1);
      setLastDoc(null); // Reset cursor for previous page
      setHasNextPage(true);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
    setLastDoc(null);
    setHasNextPage(true);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    // Reset pagination when searching
    setCurrentPage(1);
    setLastDoc(null);
    setHasNextPage(true);
  };

  // Debounced search to improve performance
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (value) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          handleSearch(value);
        }, 300);
      };
    })(),
    []
  );

  // Navigate to verification portal
  const goToVerification = () => {
    router.push("/verify");
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-green-900 text-white text-2xl font-bold tracking-widest animate-pulse">
        Loading...
      </div>
    );
  }

  // Access denied
  if (!userData || profile?.role !== "admin") {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">Manage users and access verification tools</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-blue-400">{totalUsersCount}</h3>
            <p className="text-gray-300">Total Users</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-green-400">{stats.paidUsers}</h3>
            <p className="text-gray-300">Paid Users</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-yellow-400">{stats.pendingUsers}</h3>
            <p className="text-gray-300">Pending Payment</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-400">{stats.verifiedUsers}</h3>
            <p className="text-gray-300">Verified Users</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mb-8">
          <button
            onClick={goToVerification}
            className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-semibold text-lg transition mr-4"
          >
            🎯 QR Verification Portal
          </button>
          <button
            onClick={loadUsersAndStats}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition disabled:cursor-not-allowed"
          >
            {isLoading ? "🔄 Refreshing..." : "🔄 Refresh Data"}
          </button>
        </div>

        {/* Search and Users Table */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-green-400">Users Management</h2>
            <div className="flex items-center gap-4">
                              {/* Page Size Selector */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-300">Show:</label>
                  <select
                    value={pageSize}
                    onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                    disabled={isLoading}
                    className="px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-green-400 focus:outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                  </select>
                  <span className="text-sm text-gray-300">per page</span>
                </div>
              
                              {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => debouncedSearch(e.target.value)}
                    className="px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-green-400 focus:outline-none"
                  />
                </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-400 mx-auto mb-4"></div>
              <p className="text-gray-300">Loading users...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-4 font-semibold text-green-400">Name</th>
                    <th className="py-3 px-4 font-semibold text-green-400">Email</th>
                    <th className="py-3 px-4 font-semibold text-green-400">Elixir ID</th>
                    <th className="py-3 px-4 font-semibold text-green-400">Payment</th>
                    <th className="py-3 px-4 font-semibold text-green-400">Event</th>
                    <th className="py-3 px-4 font-semibold text-green-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-3 px-4">
                        {user.firstname} {user.lastname}
                      </td>
                      <td className="py-3 px-4 text-sm">{user.email}</td>
                      <td className="py-3 px-4 font-mono text-sm">{user.elixir || "N/A"}</td>
                      <td className="py-3 px-4">
                        {user.payment ? (
                          <span className="text-green-400">✅ Paid</span>
                        ) : (
                          <span className="text-red-400">❌ Pending</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm">{user.eventName || "Not registered"}</td>
                      <td className="py-3 px-4">
                        {user.delegate_kiit || user.id_card || user.wrist_band ? (
                          <span className="text-green-400">✅ Verified</span>
                        ) : (
                          <span className="text-yellow-400">⏳ Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  {searchTerm ? "No users found matching your search." : "No users found."}
                </div>
              )}
            </div>
          )}

          {/* Pagination Controls */}
          {totalUsersCount > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Page Info */}
              <div className="text-sm text-gray-300">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-green-400"></div>
                    Loading...
                  </span>
                ) : (
                  `Showing ${((currentPage - 1) * pageSize) + 1} to ${Math.min(currentPage * pageSize, totalUsersCount)} of ${totalUsersCount} users`
                )}
              </div>
              
              {/* Pagination Navigation */}
              <div className="flex items-center gap-2">
                {/* Previous Page */}
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded border border-gray-600 transition disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                
                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`px-3 py-2 rounded border transition ${
                          currentPage === pageNum
                            ? 'bg-green-600 text-white border-green-600'
                            : 'bg-gray-700 hover:bg-gray-600 text-white border-gray-600'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {/* Ellipsis for more pages */}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="px-2 text-gray-400">...</span>
                  )}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <button
                      onClick={() => goToPage(totalPages)}
                      className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded border border-gray-600 transition"
                    >
                      {totalPages}
                    </button>
                  )}
                </div>
                
                {/* Next Page */}
                <button
                  onClick={goToNextPage}
                  disabled={!hasNextPage}
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded border border-gray-600 transition disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Toast notifications */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.isVisible} 
        onClose={hideToast} 
      />
    </div>
  );
}
