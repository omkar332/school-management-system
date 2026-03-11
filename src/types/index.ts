export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  rollNumber: string;
  dateOfBirth: string;
  address: string;
  parentName: string;
  parentPhone: string;
  admissionDate: string;
  status: 'active' | 'inactive';
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  qualification: string;
  experience: number;
  salary: number;
  joiningDate: string;
  status: 'active' | 'inactive';
}

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  credits: number;
  teacherId: string;
  teacherName: string;
  semester: string;
  status: 'active' | 'inactive';
}

export interface Class {
  id: string;
  name: string;
  section: string;
  grade: string;
  capacity: number;
  enrolled: number;
  teacherId: string;
  teacherName: string;
  status: 'active' | 'inactive';
}

export interface Attendance {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  classId: string;
  className: string;
}

export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  marks: number;
  maxMarks: number;
  grade: string;
  semester: string;
  examType: 'midterm' | 'final' | 'quiz' | 'assignment';
}