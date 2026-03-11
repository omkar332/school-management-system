import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Edit, Search, TrendingUp } from "lucide-react";
import { mockGrades, mockStudents, mockCourses } from '../data/mockData';
import { Grade } from '../types';

export function GradeManagement() {
  const [grades, setGrades] = useState<Grade[]>(mockGrades);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || grade.courseId === selectedCourse;
    const matchesSemester = selectedSemester === 'all' || grade.semester === selectedSemester;
    return matchesSearch && matchesCourse && matchesSemester;
  });

  const handleAddGrade = () => {
    setEditingGrade(null);
    setIsDialogOpen(true);
  };

  const handleEditGrade = (grade: Grade) => {
    setEditingGrade(grade);
    setIsDialogOpen(true);
  };

  const handleSaveGrade = (formData: FormData) => {
    const marks = parseInt(formData.get('marks') as string);
    const maxMarks = parseInt(formData.get('maxMarks') as string);
    const percentage = (marks / maxMarks) * 100;
    
    let letterGrade = 'F';
    if (percentage >= 90) letterGrade = 'A+';
    else if (percentage >= 85) letterGrade = 'A';
    else if (percentage >= 80) letterGrade = 'B+';
    else if (percentage >= 75) letterGrade = 'B';
    else if (percentage >= 70) letterGrade = 'C+';
    else if (percentage >= 65) letterGrade = 'C';
    else if (percentage >= 60) letterGrade = 'D';

    const studentId = formData.get('studentId') as string;
    const courseId = formData.get('courseId') as string;
    const student = mockStudents.find(s => s.id === studentId);
    const course = mockCourses.find(c => c.id === courseId);

    const gradeData = {
      studentId,
      studentName: student?.name || '',
      courseId,
      courseName: course?.name || '',
      marks,
      maxMarks,
      grade: letterGrade,
      semester: formData.get('semester') as string,
      examType: formData.get('examType') as 'midterm' | 'final' | 'quiz' | 'assignment',
    };

    if (editingGrade) {
      setGrades(grades.map(g => g.id === editingGrade.id ? { ...g, ...gradeData } : g));
    } else {
      const newGrade: Grade = {
        id: Date.now().toString(),
        ...gradeData,
      };
      setGrades([...grades, newGrade]);
    }
    setIsDialogOpen(false);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-green-600 bg-green-50';
      case 'B+':
      case 'B':
        return 'text-blue-600 bg-blue-50';
      case 'C+':
      case 'C':
        return 'text-yellow-600 bg-yellow-50';
      case 'D':
        return 'text-orange-600 bg-orange-50';
      case 'F':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const gradeStats = {
    averageGrade: grades.length > 0 ? (grades.reduce((sum, g) => sum + (g.marks / g.maxMarks) * 100, 0) / grades.length).toFixed(1) : '0',
    totalExams: grades.length,
    passRate: grades.length > 0 ? ((grades.filter(g => (g.marks / g.maxMarks) * 100 >= 60).length / grades.length) * 100).toFixed(1) : '0'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Grade Management</h1>
          <p className="text-muted-foreground">
            Manage student grades, exams, and academic performance.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddGrade}>
              <Plus className="w-4 h-4 mr-2" />
              Add Grade
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingGrade ? 'Edit Grade' : 'Add New Grade'}</DialogTitle>
              <DialogDescription>
                {editingGrade ? 'Update grade information.' : 'Enter grade details for a student.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSaveGrade(formData);
            }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student</Label>
                <Select name="studentId" defaultValue={editingGrade?.studentId || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStudents.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} ({student.rollNumber})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseId">Course</Label>
                <Select name="courseId" defaultValue={editingGrade?.courseId || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name} ({course.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marks">Marks Obtained</Label>
                  <Input
                    id="marks"
                    name="marks"
                    type="number"
                    min="0"
                    defaultValue={editingGrade?.marks || ''}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxMarks">Max Marks</Label>
                  <Input
                    id="maxMarks"
                    name="maxMarks"
                    type="number"
                    min="1"
                    defaultValue={editingGrade?.maxMarks || '100'}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="examType">Exam Type</Label>
                <Select name="examType" defaultValue={editingGrade?.examType || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="midterm">Midterm</SelectItem>
                    <SelectItem value="final">Final Exam</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select name="semester" defaultValue={editingGrade?.semester || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                    <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                    <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingGrade ? 'Update Grade' : 'Add Grade'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Average Grade</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gradeStats.averageGrade}%</div>
            <p className="text-xs text-muted-foreground">
              Class average performance
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Exams</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gradeStats.totalExams}</div>
            <p className="text-xs text-muted-foreground">
              Graded assessments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Pass Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gradeStats.passRate}%</div>
            <p className="text-xs text-muted-foreground">
              Students passing (≥60%)
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grades ({filteredGrades.length})</CardTitle>
          <CardDescription>
            Filter and manage student grades and exam results
          </CardDescription>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <Input
                placeholder="Search students or courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-auto"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label>Course:</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {mockCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Label>Semester:</Label>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="w-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                  <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                  <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Exam Type</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell>{grade.studentName}</TableCell>
                  <TableCell>{grade.courseName}</TableCell>
                  <TableCell>
                    {grade.marks}/{grade.maxMarks} ({((grade.marks / grade.maxMarks) * 100).toFixed(1)}%)
                  </TableCell>
                  <TableCell>
                    <Badge className={getGradeColor(grade.grade)}>
                      {grade.grade}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {grade.examType}
                    </Badge>
                  </TableCell>
                  <TableCell>{grade.semester}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditGrade(grade)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}