export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'article' | 'quiz' | 'coding';
  duration: string;
  completed: boolean;
  locked: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseData {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: string;
  duration: string;
  progress: number;
  modules: Module[];
}

export const coursesData: Record<string, CourseData> = {
  '1': {
    id: '1',
    title: 'Web Development Fundamentals',
    description: 'Master the basics of web development with HTML, CSS, and JavaScript. Build real-world projects and learn industry best practices.',
    instructor: 'Rajesh Kumar',
    level: 'Beginner',
    duration: '8 weeks',
    progress: 0,
    modules: [
      {
        id: 'm1',
        title: 'Introduction to HTML',
        lessons: [
          { id: 'l1', title: 'What is HTML?', type: 'video', duration: '10 min', completed: false, locked: false },
          { id: 'l2', title: 'HTML Document Structure', type: 'article', duration: '15 min', completed: false, locked: false },
          { id: 'l3', title: 'HTML Tags and Elements', type: 'video', duration: '20 min', completed: false, locked: false },
          { id: 'l4', title: 'Practice: Build Your First Page', type: 'coding', duration: '30 min', completed: false, locked: false },
          { id: 'l5', title: 'HTML Quiz', type: 'quiz', duration: '10 min', completed: false, locked: false },
        ],
      },
      {
        id: 'm2',
        title: 'CSS Styling Basics',
        lessons: [
          { id: 'l6', title: 'Introduction to CSS', type: 'video', duration: '12 min', completed: false, locked: true },
          { id: 'l7', title: 'CSS Selectors', type: 'article', duration: '18 min', completed: false, locked: true },
          { id: 'l8', title: 'Box Model', type: 'video', duration: '25 min', completed: false, locked: true },
          { id: 'l9', title: 'Flexbox Layout', type: 'video', duration: '30 min', completed: false, locked: true },
          { id: 'l10', title: 'Practice: Style a Webpage', type: 'coding', duration: '40 min', completed: false, locked: true },
        ],
      },
      {
        id: 'm3',
        title: 'JavaScript Fundamentals',
        lessons: [
          { id: 'l11', title: 'JavaScript Basics', type: 'video', duration: '15 min', completed: false, locked: true },
          { id: 'l12', title: 'Variables and Data Types', type: 'article', duration: '20 min', completed: false, locked: true },
          { id: 'l13', title: 'Functions and Scope', type: 'video', duration: '25 min', completed: false, locked: true },
          { id: 'l14', title: 'DOM Manipulation', type: 'video', duration: '30 min', completed: false, locked: true },
          { id: 'l15', title: 'Build an Interactive Page', type: 'coding', duration: '45 min', completed: false, locked: true },
        ],
      },
    ],
  },
  '2': {
    id: '2',
    title: 'React.js Complete Guide',
    description: 'Learn React from scratch to advanced concepts. Build modern web applications with hooks, context, and best practices.',
    instructor: 'Priya Sharma',
    level: 'Intermediate',
    duration: '10 weeks',
    progress: 0,
    modules: [
      {
        id: 'm1',
        title: 'React Basics',
        lessons: [
          { id: 'l1', title: 'What is React?', type: 'video', duration: '12 min', completed: false, locked: false },
          { id: 'l2', title: 'Setting Up React', type: 'article', duration: '15 min', completed: false, locked: false },
          { id: 'l3', title: 'JSX Syntax', type: 'video', duration: '18 min', completed: false, locked: false },
          { id: 'l4', title: 'Components', type: 'video', duration: '25 min', completed: false, locked: false },
          { id: 'l5', title: 'Build Your First Component', type: 'coding', duration: '30 min', completed: false, locked: false },
        ],
      },
      {
        id: 'm2',
        title: 'State and Props',
        lessons: [
          { id: 'l6', title: 'Understanding State', type: 'video', duration: '20 min', completed: false, locked: true },
          { id: 'l7', title: 'Props and Data Flow', type: 'article', duration: '15 min', completed: false, locked: true },
          { id: 'l8', title: 'Event Handling', type: 'video', duration: '22 min', completed: false, locked: true },
          { id: 'l9', title: 'Practice: Todo App', type: 'coding', duration: '45 min', completed: false, locked: true },
        ],
      },
      {
        id: 'm3',
        title: 'React Hooks',
        lessons: [
          { id: 'l10', title: 'useState Hook', type: 'video', duration: '18 min', completed: false, locked: true },
          { id: 'l11', title: 'useEffect Hook', type: 'video', duration: '25 min', completed: false, locked: true },
          { id: 'l12', title: 'Custom Hooks', type: 'article', duration: '20 min', completed: false, locked: true },
          { id: 'l13', title: 'Build a Weather App', type: 'coding', duration: '60 min', completed: false, locked: true },
        ],
      },
    ],
  },
  '3': {
    id: '3',
    title: 'Data Structures & Algorithms',
    description: 'Master essential DSA concepts for technical interviews. Learn problem-solving patterns and practice coding challenges.',
    instructor: 'Amit Patel',
    level: 'Intermediate',
    duration: '12 weeks',
    progress: 0,
    modules: [
      {
        id: 'm1',
        title: 'Arrays and Strings',
        lessons: [
          { id: 'l1', title: 'Array Basics', type: 'video', duration: '15 min', completed: false, locked: false },
          { id: 'l2', title: 'Two Pointer Technique', type: 'article', duration: '20 min', completed: false, locked: false },
          { id: 'l3', title: 'Sliding Window', type: 'video', duration: '25 min', completed: false, locked: false },
          { id: 'l4', title: 'Practice Problems', type: 'coding', duration: '45 min', completed: false, locked: false },
        ],
      },
      {
        id: 'm2',
        title: 'Linked Lists',
        lessons: [
          { id: 'l5', title: 'Linked List Basics', type: 'video', duration: '18 min', completed: false, locked: true },
          { id: 'l6', title: 'Reversal Techniques', type: 'article', duration: '22 min', completed: false, locked: true },
          { id: 'l7', title: 'Fast and Slow Pointers', type: 'video', duration: '20 min', completed: false, locked: true },
          { id: 'l8', title: 'Coding Challenges', type: 'coding', duration: '50 min', completed: false, locked: true },
        ],
      },
      {
        id: 'm3',
        title: 'Trees and Graphs',
        lessons: [
          { id: 'l9', title: 'Binary Trees', type: 'video', duration: '25 min', completed: false, locked: true },
          { id: 'l10', title: 'Tree Traversals', type: 'article', duration: '20 min', completed: false, locked: true },
          { id: 'l11', title: 'Graph Algorithms', type: 'video', duration: '30 min', completed: false, locked: true },
          { id: 'l12', title: 'Advanced Problems', type: 'coding', duration: '60 min', completed: false, locked: true },
        ],
      },
    ],
  },
  '4': {
    id: '4',
    title: 'Communication Skills',
    description: 'Improve your professional communication skills. Learn effective presentation, email writing, and interpersonal communication.',
    instructor: 'Sneha Desai',
    level: 'Beginner',
    duration: '6 weeks',
    progress: 0,
    modules: [
      {
        id: 'm1',
        title: 'Effective Communication Basics',
        lessons: [
          { id: 'l1', title: 'Communication Fundamentals', type: 'video', duration: '12 min', completed: false, locked: false },
          { id: 'l2', title: 'Active Listening', type: 'article', duration: '15 min', completed: false, locked: false },
          { id: 'l3', title: 'Body Language', type: 'video', duration: '18 min', completed: false, locked: false },
          { id: 'l4', title: 'Practice Exercise', type: 'quiz', duration: '20 min', completed: false, locked: false },
        ],
      },
      {
        id: 'm2',
        title: 'Professional Email Writing',
        lessons: [
          { id: 'l5', title: 'Email Etiquette', type: 'video', duration: '15 min', completed: false, locked: true },
          { id: 'l6', title: 'Writing Clear Emails', type: 'article', duration: '18 min', completed: false, locked: true },
          { id: 'l7', title: 'Email Templates', type: 'article', duration: '12 min', completed: false, locked: true },
          { id: 'l8', title: 'Practice Writing', type: 'coding', duration: '30 min', completed: false, locked: true },
        ],
      },
      {
        id: 'm3',
        title: 'Presentation Skills',
        lessons: [
          { id: 'l9', title: 'Presentation Basics', type: 'video', duration: '20 min', completed: false, locked: true },
          { id: 'l10', title: 'Slide Design', type: 'article', duration: '15 min', completed: false, locked: true },
          { id: 'l11', title: 'Public Speaking Tips', type: 'video', duration: '25 min', completed: false, locked: true },
          { id: 'l12', title: 'Final Assessment', type: 'quiz', duration: '30 min', completed: false, locked: true },
        ],
      },
    ],
  },
  '5': {
    id: '5',
    title: 'Python Programming',
    description: 'Learn Python from scratch to advanced concepts. Master data structures, OOP, and build real-world applications.',
    instructor: 'Vikram Singh',
    level: 'Beginner',
    duration: '10 weeks',
    progress: 0,
    modules: [
      {
        id: 'm1',
        title: 'Python Basics',
        lessons: [
          { id: 'l1', title: 'Introduction to Python', type: 'video', duration: '15 min', completed: false, locked: false },
          { id: 'l2', title: 'Variables and Data Types', type: 'article', duration: '18 min', completed: false, locked: false },
          { id: 'l3', title: 'Operators and Expressions', type: 'video', duration: '20 min', completed: false, locked: false },
          { id: 'l4', title: 'Practice: Basic Programs', type: 'coding', duration: '30 min', completed: false, locked: false },
          { id: 'l5', title: 'Python Basics Quiz', type: 'quiz', duration: '15 min', completed: false, locked: false },
        ],
      },
      {
        id: 'm2',
        title: 'Control Flow and Functions',
        lessons: [
          { id: 'l6', title: 'If-Else Statements', type: 'video', duration: '18 min', completed: false, locked: true },
          { id: 'l7', title: 'Loops in Python', type: 'article', duration: '20 min', completed: false, locked: true },
          { id: 'l8', title: 'Functions', type: 'video', duration: '25 min', completed: false, locked: true },
          { id: 'l9', title: 'Lambda Functions', type: 'article', duration: '15 min', completed: false, locked: true },
          { id: 'l10', title: 'Build a Calculator', type: 'coding', duration: '40 min', completed: false, locked: true },
        ],
      },
      {
        id: 'm3',
        title: 'Data Structures',
        lessons: [
          { id: 'l11', title: 'Lists and Tuples', type: 'video', duration: '22 min', completed: false, locked: true },
          { id: 'l12', title: 'Dictionaries and Sets', type: 'video', duration: '20 min', completed: false, locked: true },
          { id: 'l13', title: 'List Comprehensions', type: 'article', duration: '18 min', completed: false, locked: true },
          { id: 'l14', title: 'Practice: Data Processing', type: 'coding', duration: '45 min', completed: false, locked: true },
        ],
      },
    ],
  },
  '6': {
    id: '6',
    title: 'Database Management',
    description: 'Master SQL and database design. Learn to create, query, and optimize databases for real-world applications.',
    instructor: 'Anita Reddy',
    level: 'Intermediate',
    duration: '8 weeks',
    progress: 0,
    modules: [
      {
        id: 'm1',
        title: 'Database Fundamentals',
        lessons: [
          { id: 'l1', title: 'What is a Database?', type: 'video', duration: '12 min', completed: false, locked: false },
          { id: 'l2', title: 'Relational vs NoSQL', type: 'article', duration: '15 min', completed: false, locked: false },
          { id: 'l3', title: 'Database Design Principles', type: 'video', duration: '20 min', completed: false, locked: false },
          { id: 'l4', title: 'ER Diagrams', type: 'article', duration: '18 min', completed: false, locked: false },
          { id: 'l5', title: 'Database Basics Quiz', type: 'quiz', duration: '15 min', completed: false, locked: false },
        ],
      },
      {
        id: 'm2',
        title: 'SQL Basics',
        lessons: [
          { id: 'l6', title: 'SELECT Statements', type: 'video', duration: '18 min', completed: false, locked: true },
          { id: 'l7', title: 'WHERE and Filtering', type: 'article', duration: '15 min', completed: false, locked: true },
          { id: 'l8', title: 'JOIN Operations', type: 'video', duration: '25 min', completed: false, locked: true },
          { id: 'l9', title: 'Aggregate Functions', type: 'video', duration: '20 min', completed: false, locked: true },
          { id: 'l10', title: 'Practice: Query Writing', type: 'coding', duration: '40 min', completed: false, locked: true },
        ],
      },
      {
        id: 'm3',
        title: 'Advanced SQL',
        lessons: [
          { id: 'l11', title: 'Subqueries', type: 'video', duration: '22 min', completed: false, locked: true },
          { id: 'l12', title: 'Indexes and Performance', type: 'article', duration: '20 min', completed: false, locked: true },
          { id: 'l13', title: 'Transactions', type: 'video', duration: '18 min', completed: false, locked: true },
          { id: 'l14', title: 'Stored Procedures', type: 'article', duration: '25 min', completed: false, locked: true },
          { id: 'l15', title: 'Build a Database', type: 'coding', duration: '60 min', completed: false, locked: true },
        ],
      },
    ],
  },
};
