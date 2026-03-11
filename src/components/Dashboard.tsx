import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Users, GraduationCap, BookOpen, Calendar } from "lucide-react";
import { mockStudents, mockTeachers, mockCourses, mockClasses } from '../data/mockData';

export function Dashboard() {
  const stats = [
    {
      title: "Total Students",
      value: mockStudents.length.toString(),
      description: "Active enrolled students",
      icon: Users,
      iconColor: "text-chart-1",
      bgColor: "bg-gradient-to-br from-chart-1/10 to-chart-1/5",
      borderColor: "border-chart-1/20"
    },
    {
      title: "Total Teachers",
      value: mockTeachers.length.toString(),
      description: "Active teaching staff",
      icon: GraduationCap,
      iconColor: "text-chart-2",
      bgColor: "bg-gradient-to-br from-chart-2/10 to-chart-2/5",
      borderColor: "border-chart-2/20"
    },
    {
      title: "Total Courses",
      value: mockCourses.length.toString(),
      description: "Available courses",
      icon: BookOpen,
      iconColor: "text-chart-3",
      bgColor: "bg-gradient-to-br from-chart-3/10 to-chart-3/5",
      borderColor: "border-chart-3/20"
    },
    {
      title: "Total Classes",
      value: mockClasses.length.toString(),
      description: "Active classes",
      icon: Calendar,
      iconColor: "text-chart-4",
      bgColor: "bg-gradient-to-br from-chart-4/10 to-chart-4/5",
      borderColor: "border-chart-4/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-accent/20">
      <div className="space-y-6 p-6">
        <div className="bg-gradient-to-r from-primary/5 to-accent/10 rounded-lg p-6 border border-border/50">
          <h1 className="bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
            School Management Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Welcome to the admin dashboard. Here's an overview of your school.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className={`${stat.bgColor} ${stat.borderColor} border-2 hover:shadow-lg transition-all duration-200 hover:scale-105`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-foreground/80">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-full bg-background/80 shadow-sm`}>
                    <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gradient-to-br from-chart-2/5 to-background border-chart-2/20 border-2 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-chart-2/10 to-transparent">
              <CardTitle className="text-chart-2">Recent Activity</CardTitle>
              <CardDescription>Latest updates from your school</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-background/60 border border-chart-1/20">
                  <div className="w-3 h-3 bg-chart-1 rounded-full shadow-sm"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">New student John Smith enrolled</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-background/60 border border-chart-2/20">
                  <div className="w-3 h-3 bg-chart-2 rounded-full shadow-sm"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Dr. Sarah Wilson updated course materials</p>
                    <p className="text-xs text-muted-foreground">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-background/60 border border-chart-4/20">
                  <div className="w-3 h-3 bg-chart-4 rounded-full shadow-sm"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Attendance recorded for Grade 10-A</p>
                    <p className="text-xs text-muted-foreground">6 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-chart-3/5 to-background border-chart-3/20 border-2 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-chart-3/10 to-transparent">
              <CardTitle className="text-chart-3">Quick Actions</CardTitle>
              <CardDescription>Common tasks you might want to perform</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <button className="w-full text-left p-4 hover:bg-chart-1/10 bg-background/60 rounded-lg transition-all duration-200 border border-chart-1/20 hover:border-chart-1/40 hover:shadow-md group">
                  <span className="text-sm text-foreground group-hover:text-chart-1 transition-colors">Add New Student</span>
                </button>
                <button className="w-full text-left p-4 hover:bg-chart-2/10 bg-background/60 rounded-lg transition-all duration-200 border border-chart-2/20 hover:border-chart-2/40 hover:shadow-md group">
                  <span className="text-sm text-foreground group-hover:text-chart-2 transition-colors">Record Attendance</span>
                </button>
                <button className="w-full text-left p-4 hover:bg-chart-3/10 bg-background/60 rounded-lg transition-all duration-200 border border-chart-3/20 hover:border-chart-3/40 hover:shadow-md group">
                  <span className="text-sm text-foreground group-hover:text-chart-3 transition-colors">Create New Course</span>
                </button>
                <button className="w-full text-left p-4 hover:bg-chart-4/10 bg-background/60 rounded-lg transition-all duration-200 border border-chart-4/20 hover:border-chart-4/40 hover:shadow-md group">
                  <span className="text-sm text-foreground group-hover:text-chart-4 transition-colors">Generate Report</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}