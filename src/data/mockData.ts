import { Student, Teacher, Course, Class, Attendance, Grade } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0101',
    class: '10-A',
    rollNumber: 'S001',
    dateOfBirth: '2008-03-15',
    address: '123 Main St, City, State',
    parentName: 'Robert Smith',
    parentPhone: '+1-555-0102',
    admissionDate: '2023-09-01',
    status: 'active'
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.johnson@email.com',
    phone: '+1-555-0103',
    class: '10-A',
    rollNumber: 'S002',
    dateOfBirth: '2008-05-22',
    address: '456 Oak Ave, City, State',
    parentName: 'Sarah Johnson',
    parentPhone: '+1-555-0104',
    admissionDate: '2023-09-01',
    status: 'active'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '+1-555-0105',
    class: '9-B',
    rollNumber: 'S003',
    dateOfBirth: '2009-01-10',
    address: '789 Pine St, City, State',
    parentName: 'David Brown',
    parentPhone: '+1-555-0106',
    admissionDate: '2023-09-01',
    status: 'active'
  }
];

export const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@school.edu',
    phone: '+1-555-0201',
    subject: 'Mathematics',
    qualification: 'Ph.D. in Mathematics',
    experience: 8,
    salary: 65000,
    joiningDate: '2020-08-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Prof. James Anderson',
    email: 'james.anderson@school.edu',
    phone: '+1-555-0202',
    subject: 'Physics',
    qualification: 'M.Sc. in Physics',
    experience: 12,
    salary: 70000,
    joiningDate: '2018-07-01',
    status: 'active'
  },
  {
    id: '3',
    name: 'Ms. Lisa Davis',
    email: 'lisa.davis@school.edu',
    phone: '+1-555-0203',
    subject: 'English Literature',
    qualification: 'M.A. in English',
    experience: 6,
    salary: 58000,
    joiningDate: '2021-09-01',
    status: 'active'
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    code: 'MATH301',
    description: 'Advanced topics in calculus and algebra',
    credits: 4,
    teacherId: '1',
    teacherName: 'Dr. Sarah Wilson',
    semester: 'Fall 2024',
    status: 'active'
  },
  {
    id: '2',
    name: 'Physics Fundamentals',
    code: 'PHYS201',
    description: 'Basic principles of physics and mechanics',
    credits: 3,
    teacherId: '2',
    teacherName: 'Prof. James Anderson',
    semester: 'Fall 2024',
    status: 'active'
  },
  {
    id: '3',
    name: 'English Literature',
    code: 'ENG101',
    description: 'Introduction to classic and modern literature',
    credits: 3,
    teacherId: '3',
    teacherName: 'Ms. Lisa Davis',
    semester: 'Fall 2024',
    status: 'active'
  }
];

export const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Grade 10 Section A',
    section: 'A',
    grade: '10',
    capacity: 30,
    enrolled: 25,
    teacherId: '1',
    teacherName: 'Dr. Sarah Wilson',
    status: 'active'
  },
  {
    id: '2',
    name: 'Grade 9 Section B',
    section: 'B',
    grade: '9',
    capacity: 28,
    enrolled: 22,
    teacherId: '2',
    teacherName: 'Prof. James Anderson',
    status: 'active'
  },
  {
    id: '3',
    name: 'Grade 11 Section A',
    section: 'A',
    grade: '11',
    capacity: 32,
    enrolled: 28,
    teacherId: '3',
    teacherName: 'Ms. Lisa Davis',
    status: 'active'
  }
];

export const mockAttendance: Attendance[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'John Smith',
    date: '2024-01-15',
    status: 'present',
    classId: '1',
    className: 'Grade 10 Section A'
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Emily Johnson',
    date: '2024-01-15',
    status: 'present',
    classId: '1',
    className: 'Grade 10 Section A'
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Michael Brown',
    date: '2024-01-15',
    status: 'absent',
    classId: '2',
    className: 'Grade 9 Section B'
  }
];

export const mockGrades: Grade[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'John Smith',
    courseId: '1',
    courseName: 'Advanced Mathematics',
    marks: 85,
    maxMarks: 100,
    grade: 'A',
    semester: 'Fall 2024',
    examType: 'midterm'
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Emily Johnson',
    courseId: '2',
    courseName: 'Physics Fundamentals',
    marks: 78,
    maxMarks: 100,
    grade: 'B+',
    semester: 'Fall 2024',
    examType: 'midterm'
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Michael Brown',
    courseId: '3',
    courseName: 'English Literature',
    marks: 92,
    maxMarks: 100,
    grade: 'A+',
    semester: 'Fall 2024',
    examType: 'final'
  }
];