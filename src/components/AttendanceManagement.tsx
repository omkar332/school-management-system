import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar, Search, UserCheck, UserX, Clock } from "lucide-react";
import { mockAttendance, mockStudents, mockClasses } from '../data/mockData';
import { Attendance } from '../types';

export function AttendanceManagement() {
  const [attendance, setAttendance] = useState<Attendance[]>(mockAttendance);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAttendance = attendance.filter(record => {
    const matchesDate = record.date === selectedDate;
    const matchesClass = selectedClass === 'all' || record.classId === selectedClass;
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDate && matchesClass && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <UserCheck className="w-4 h-4 text-green-600" />;
      case 'absent':
        return <UserX className="w-4 h-4 text-red-600" />;
      case 'late':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      present: 'default',
      absent: 'destructive',
      late: 'secondary'
    } as const;
    return variants[status as keyof typeof variants] || 'secondary';
  };

  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    const existingRecord = attendance.find(
      a => a.studentId === studentId && a.date === selectedDate
    );

    if (existingRecord) {
      setAttendance(attendance.map(a => 
        a.id === existingRecord.id ? { ...a, status } : a
      ));
    } else {
      const student = mockStudents.find(s => s.id === studentId);
      const classInfo = mockClasses.find(c => c.id === selectedClass);
      
      if (student && classInfo) {
        const newRecord: Attendance = {
          id: Date.now().toString(),
          studentId,
          studentName: student.name,
          date: selectedDate,
          status,
          classId: selectedClass,
          className: classInfo.name
        };
        setAttendance([...attendance, newRecord]);
      }
    }
  };

  const studentsInSelectedClass = selectedClass === 'all' 
    ? mockStudents 
    : mockStudents.filter(s => s.class === mockClasses.find(c => c.id === selectedClass)?.grade + '-' + mockClasses.find(c => c.id === selectedClass)?.section);

  const attendanceStats = {
    present: filteredAttendance.filter(a => a.status === 'present').length,
    absent: filteredAttendance.filter(a => a.status === 'absent').length,
    late: filteredAttendance.filter(a => a.status === 'late').length,
    total: studentsInSelectedClass.length
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Attendance Management</h1>
        <p className="text-muted-foreground">
          Track and manage student attendance records.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Present</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.present}</div>
            <p className="text-xs text-muted-foreground">
              Students present today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Absent</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.absent}</div>
            <p className="text-xs text-muted-foreground">
              Students absent today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Late</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.late}</div>
            <p className="text-xs text-muted-foreground">
              Students late today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Attendance Rate</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {attendanceStats.total > 0 
                ? Math.round((attendanceStats.present / attendanceStats.total) * 100)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Overall attendance
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
          <CardDescription>
            Select date, class and mark student attendance for the day
          </CardDescription>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="date">Date:</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="class">Class:</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {mockClasses.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-auto"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentsInSelectedClass
                .filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((student) => {
                const attendanceRecord = attendance.find(
                  a => a.studentId === student.id && a.date === selectedDate
                );
                return (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>
                      {attendanceRecord ? (
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(attendanceRecord.status)}
                          <Badge variant={getStatusBadge(attendanceRecord.status)}>
                            {attendanceRecord.status}
                          </Badge>
                        </div>
                      ) : (
                        <Badge variant="outline">Not Marked</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAttendance(student.id, 'present')}
                          className="text-green-600 hover:text-green-700"
                        >
                          Present
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAttendance(student.id, 'absent')}
                          className="text-red-600 hover:text-red-700"
                        >
                          Absent
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAttendance(student.id, 'late')}
                          className="text-yellow-600 hover:text-yellow-700"
                        >
                          Late
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}