// app/add-student/page.tsx
import AdmissionForm from '../components/AdmissionForm';

export default function AddStudentPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 drop-shadow-md tracking-tight transition-colors duration-300">
          เพิ่มข้อมูลนักเรียน 📝
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">กรุณากรอกข้อมูลนักเรียนให้ครบถ้วน</p>
      </div>
      <AdmissionForm />
    </div>
  );
}