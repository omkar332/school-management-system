import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { Dashboard } from "./components/Dashboard";
import { StudentManagement } from "./components/StudentManagement";
import { TeacherManagement } from "./components/TeacherManagement";
import { AttendanceManagement } from "./components/AttendanceManagement";
import { GradeManagement } from "./components/GradeManagement";

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentManagement />;
      case 'teachers':
        return <TeacherManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'grades':
        return <GradeManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <SidebarTrigger />
            <div className="ml-4">
              <h2 className="text-lg font-semibold">School Management System</h2>
            </div>
          </div>
        </div>
        <div className={currentView === 'dashboard' ? '' : 'p-6'}>
          {renderCurrentView()}
        </div>
      </main>
    </SidebarProvider>
  );
}