'use client';

/**
 * HR Dashboard
 * 
 * A comprehensive dashboard for HR professionals to manage candidate interviews,
 * review assessments, and analyze hiring metrics.
 * 
 * Features:
 * - Analytics overview
 * - Candidate management
 * - Advanced filtering
 * - Data export
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  BarChart3, 
  Users, 
  Settings,
  Search,
  BarChart2,
  PieChart as PieChartIcon,
  TrendingUp,
  Filter,
  Download,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { FiUsers, FiActivity } from 'react-icons/fi';
import { ModeToggle } from "@/components/mode-toggle";

/**
 * Sample candidate data
 * Used for demonstration purposes
 * In a production environment, this would be fetched from an API
 */
const allCandidates = [
  { id: 1, name: "Liam Johnson", department: "Engineering", status: "Completed", score: "88%", date: "2023-07-15" },
  { id: 2, name: "Olivia Smith", department: "Marketing", status: "Pending", score: "-", date: "2023-08-01" },
  { id: 3, name: "Noah Williams", department: "Sales", status: "In Progress", score: "-", date: "2023-08-05" },
  { id: 4, name: "Emma Davis", department: "Engineering", status: "Completed", score: "92%", date: "2023-07-20" },
  { id: 5, name: "James Brown", department: "Product", status: "Completed", score: "78%", date: "2023-07-22" },
  { id: 6, name: "Sophia Wilson", department: "Human Resources", status: "Pending", score: "-", date: "2023-08-10" },
  { id: 7, name: "Lucas Garcia", department: "Engineering", status: "Completed", score: "85%", date: "2023-07-18" },
  { id: 8, name: "Mia Martinez", department: "Marketing", status: "Completed", score: "79%", date: "2023-07-25" },
  { id: 9, name: "Ethan Anderson", department: "Sales", status: "In Progress", score: "-", date: "2023-08-08" },
  { id: 10, name: "Ava Taylor", department: "Product", status: "Pending", score: "-", date: "2023-08-15" },
  { id: 11, name: "Benjamin Moore", department: "Engineering", status: "Completed", score: "90%", date: "2023-07-19" },
  { id: 12, name: "Isabella White", department: "Human Resources", status: "Completed", score: "82%", date: "2023-07-23" },
];

// Department filter options
const departments = ["All Departments", "Engineering", "Marketing", "Sales", "Product", "Human Resources"];

// Status filter options
const statuses = ["All Statuses", "Completed", "In Progress", "Pending"];

export default function HrDashboard() {
  // State management
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [candidates, setCandidates] = useState(allCandidates);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Chart data for Test Score Distribution
  const scoreDistributionData = [
    { name: 'Engineering', 90100: 12, 8089: 18, 7079: 8, 6069: 3, below60: 1 },
    { name: 'Marketing', 90100: 8, 8089: 14, 7079: 10, 6069: 4, below60: 2 },
    { name: 'Sales', 90100: 6, 8089: 12, 7079: 14, 6069: 5, below60: 3 },
    { name: 'Product', 90100: 10, 8089: 15, 7079: 9, 6069: 4, below60: 1 },
    { name: 'HR', 90100: 7, 8089: 13, 7079: 8, 6069: 3, below60: 1 },
  ];
  
  // Chart data for Participation Metrics
  const participationData = [
    { name: 'Invited', value: 120 },
    { name: 'Started', value: 95 },
    { name: 'Completed', value: 78 },
    { name: 'Passed', value: 62 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Filter candidates based on search query and filters
  useEffect(() => {
    let filteredCandidates = [...allCandidates];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredCandidates = filteredCandidates.filter(
        candidate => candidate.name.toLowerCase().includes(query) || 
                    candidate.department.toLowerCase().includes(query)
      );
    }
    
    // Apply department filter
    if (selectedDepartment !== "All Departments") {
      filteredCandidates = filteredCandidates.filter(
        candidate => candidate.department === selectedDepartment
      );
    }
    
    // Apply status filter
    if (selectedStatus !== "All Statuses") {
      filteredCandidates = filteredCandidates.filter(
        candidate => candidate.status === selectedStatus
      );
    }
    
    // Apply sorting
    filteredCandidates.sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a];
      const bValue = b[sortColumn as keyof typeof b];
      
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    
    setCandidates(filteredCandidates);
  }, [searchQuery, selectedDepartment, selectedStatus, sortColumn, sortDirection]);

  // Calculate statistics
  const totalCandidates = allCandidates.length;
  const completedCandidates = allCandidates.filter(c => c.status === "Completed").length;
  const completionRate = Math.round((completedCandidates / totalCandidates) * 100);
  
  // Calculate average score from candidates with scores (not "-")
  const candidatesWithScores = allCandidates.filter(c => c.score !== "-");
  const averageScore = candidatesWithScores.length > 0 
    ? Math.round(candidatesWithScores.reduce((acc, curr) => acc + parseInt(curr.score), 0) / candidatesWithScores.length)
    : 0;
  
  // Handle sort toggle
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  
  // Calculate pagination
  const totalPages = Math.ceil(candidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidates = candidates.slice(startIndex, endIndex);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Handle export data
  const handleExportData = () => {
    alert("Exporting data...");
    // In a real application, this would generate a CSV or Excel file
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-card fixed inset-y-0">
        <div className="p-4 border-b">
          <h2 className="font-bold text-xl">
            <span className="text-primary">Forti</span>Twin
          </h2>
          <p className="text-xs text-muted-foreground mt-1">HR Dashboard</p>
        </div>
        
        <div className="flex flex-col py-4 flex-1">
          <div className="px-3 py-2">
            <h3 className="text-xs font-medium text-muted-foreground tracking-wider">MAIN</h3>
            <nav className="mt-2 space-y-1">
              <button 
                className={cn("flex items-center px-3 py-2 text-sm rounded-md font-medium w-full text-left", 
                  activeTab === "overview" 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground hover:bg-muted transition-colors"
                )}
                onClick={() => setActiveTab("overview")}
              >
                <BarChart3 className="h-4 w-4 mr-3 flex-shrink-0" />
                Analytics
              </button>
              
              <button 
                className={cn("flex items-center px-3 py-2 text-sm rounded-md font-medium w-full text-left", 
                  activeTab === "candidates" 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground hover:bg-muted transition-colors"
                )}
                onClick={() => setActiveTab("candidates")}
              >
                <Users className="h-4 w-4 mr-3 flex-shrink-0" />
                Candidates
              </button>
            </nav>
          </div>
          
          <div className="px-3 py-2 mt-6">
            <h3 className="text-xs font-medium text-muted-foreground tracking-wider">SETTINGS</h3>
            <nav className="mt-2 space-y-1">
              <button 
                className="flex items-center px-3 py-2 text-sm rounded-md font-medium text-foreground hover:bg-muted transition-colors w-full text-left"
                onClick={() => alert("Preferences panel would open here")}
              >
                <Settings className="h-4 w-4 mr-3 flex-shrink-0" />
                Preferences
              </button>
            </nav>
          </div>
          
          <div className="mt-auto p-4">
            <Card className="bg-primary/10 border-none">
              <CardContent className="p-4">
                <h4 className="font-medium text-sm">Need Help?</h4>
                <p className="text-xs text-muted-foreground mt-1">Access resources and support</p>
                <Button variant="link" size="sm" className="px-0 mt-2 h-auto text-primary">
                  View Documentation
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 inset-x-0 border-b z-30 bg-background h-14 flex items-center px-4">
        <Button variant="outline" size="icon" className="mr-3">
          <Users className="h-5 w-5" />
        </Button>
        <h2 className="font-bold">
          <span className="text-primary">Forti</span>Twin
        </h2>
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <div className="p-6 md:pt-8 md:px-8 pb-16 max-w-7xl mx-auto">
          {/* Mobile tab navigation */}
          <div className="mb-6 md:hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="candidates">Candidates</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Dashboard header */}
          <div className="flex flex-col md:flex-row md:items-center mb-6 md:mb-8 justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">HR Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-1">Monitor hiring processes and candidate performance</p>
            </div>
            
            <div className="flex space-x-2 mt-4 md:mt-0">
              <ModeToggle />
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search candidates..." 
                  className="pl-8 md:w-[200px] h-9" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <label className="text-xs font-medium">Department</label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-2">
                    <label className="text-xs font-medium">Status</label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <Button size="sm" variant="secondary" className="w-full" onClick={() => {
                      setSelectedDepartment("All Departments");
                      setSelectedStatus("All Statuses");
                      setSearchQuery("");
                    }}>
                      Reset Filters
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" size="sm" className="h-9" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          {/* Stats cards */}
          <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Candidates
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCandidates}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Tests Sent
                </CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCandidates}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  +12.5% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Completion Rate
                </CardTitle>
                <PieChartIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completionRate}%</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  +5.3% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Score
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageScore}%</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  +3.2% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Content based on active tab */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsContent value="overview" className="mt-0 p-0">
              {/* Charts section */}
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-6">
                <Card className="xl:col-span-2">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Test Score Distribution</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => alert("View details clicked")}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => alert("Download data clicked")}>Download Data</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>Distribution of candidate scores across departments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={scoreDistributionData}
                          layout="vertical"
                          margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" />
                          <Tooltip 
                            formatter={(value, name) => {
                              const labels = {
                                '90100': '90-100%',
                                '8089': '80-89%',
                                '7079': '70-79%',
                                '6069': '60-69%',
                                'below60': 'Below 60%'
                              };
                              return [`${value} candidates`, labels[name as keyof typeof labels] || name];
                            }}
                          />
                          <Legend formatter={(value) => {
                            const labels = {
                              '90100': '90-100%',
                              '8089': '80-89%',
                              '7079': '70-79%',
                              '6069': '60-69%',
                              'below60': 'Below 60%'
                            };
                            return labels[value as keyof typeof labels] || value;
                          }} />
                          <Bar dataKey="90100" stackId="a" fill="#10B981" />
                          <Bar dataKey="8089" stackId="a" fill="#6366F1" />
                          <Bar dataKey="7079" stackId="a" fill="#FBBF24" />
                          <Bar dataKey="6069" stackId="a" fill="#F59E0B" />
                          <Bar dataKey="below60" stackId="a" fill="#EF4444" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Participation Metrics</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => alert("View details clicked")}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => alert("Download data clicked")}>Download Data</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>Candidates progress over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={participationData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {participationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} candidates`, 'Count']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-blue-100 mr-3">
                          <FiUsers className="text-blue-600" size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Completion Rate</p>
                          <p className="text-xl font-bold text-blue-600">{Math.round((participationData[2].value / participationData[0].value) * 100)}%</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-green-100 mr-3">
                          <FiActivity className="text-green-600" size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Pass Rate</p>
                          <p className="text-xl font-bold text-green-600">{Math.round((participationData[3].value / participationData[2].value) * 100)}%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="candidates">
              {/* This tab content is intentionally left empty as the candidates table is shown below for all tabs */}
            </TabsContent>
          </Tabs>
          
          {/* Candidates Table - shown for all tabs for now */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>
                    {activeTab === "candidates" ? "All Candidates" : "Recent Candidates"}
                  </CardTitle>
                  <CardDescription>
                    {activeTab === "candidates" 
                      ? "Manage and track all candidate assessments" 
                      : "Latest candidate assessments and results"}
                  </CardDescription>
                </div>
                {activeTab !== "candidates" && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="sm:w-auto w-full"
                    onClick={() => setActiveTab("candidates")}
                  >
                    View All Candidates
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center">
                          Name
                          {sortColumn === "name" && (
                            sortDirection === "asc" ? 
                              <ChevronUp className="ml-1 h-4 w-4" /> : 
                              <ChevronDown className="ml-1 h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSort("department")}
                      >
                        <div className="flex items-center">
                          Department
                          {sortColumn === "department" && (
                            sortDirection === "asc" ? 
                              <ChevronUp className="ml-1 h-4 w-4" /> : 
                              <ChevronDown className="ml-1 h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSort("status")}
                      >
                        <div className="flex items-center">
                          Status
                          {sortColumn === "status" && (
                            sortDirection === "asc" ? 
                              <ChevronUp className="ml-1 h-4 w-4" /> : 
                              <ChevronDown className="ml-1 h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSort("score")}
                      >
                        <div className="flex items-center">
                          Score
                          {sortColumn === "score" && (
                            sortDirection === "asc" ? 
                              <ChevronUp className="ml-1 h-4 w-4" /> : 
                              <ChevronDown className="ml-1 h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSort("date")}
                      >
                        <div className="flex items-center">
                          Applied
                          {sortColumn === "date" && (
                            sortDirection === "asc" ? 
                              <ChevronUp className="ml-1 h-4 w-4" /> : 
                              <ChevronDown className="ml-1 h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentCandidates.length > 0 ? (
                      currentCandidates.map((candidate) => (
                        <TableRow key={candidate.id}>
                          <TableCell className="font-medium">{candidate.name}</TableCell>
                          <TableCell>{candidate.department}</TableCell>
                          <TableCell>
                            <span className={cn(
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                              candidate.status === "Completed" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : candidate.status === "In Progress"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                            )}>
                              {candidate.status}
                            </span>
                          </TableCell>
                          <TableCell>{candidate.score}</TableCell>
                          <TableCell>{candidate.date}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => alert(`View profile for ${candidate.name}`)}>
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => alert(`View results for ${candidate.name}`)}>
                                  View Results
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => alert(`Sending message to ${candidate.name}`)}>
                                  Send Message
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          No candidates match your search criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination */}
              {candidates.length > 0 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                    <span className="font-medium">{Math.min(endIndex, candidates.length)}</span> of{" "}
                    <span className="font-medium">{candidates.length}</span> candidates
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous Page</span>
                    </Button>
                    
                    <div className="flex items-center">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          className="w-8 h-8"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next Page</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 