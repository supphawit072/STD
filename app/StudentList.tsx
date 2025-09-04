'use client';

import Link from 'next/link';
import { Student } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { deleteStudent } from './actions/studentActions';
import DeleteStudentButton from './components/DeleteStudentButton';


interface Props {
  students: Student[];
}

export default function StudentList({ students }: Props) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: number) {
    if (!confirm('คุณต้องการลบนักเรียนคนนี้หรือไม่?')) return;

    setLoadingId(id);
    setError(null);

    startTransition(async () => {
      const result = await deleteStudent(id.toString());

      if (result.success) {
        alert(result.message);
        router.refresh();
      } else {
        setError(result.message);
      }

      setLoadingId(null);
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 drop-shadow-sm transition-colors duration-300">
            รายชื่อนักเรียน 🎓
          </h1>
          <Link
            href="/add_students"
            className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50"
          >
            + เพิ่มนักเรียน
          </Link>
        </div>

        {error && (
          <p className="text-center text-red-500 dark:text-red-400 font-semibold mb-4">{error}</p>
        )}

        {students.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6 transition duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-indigo-400"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="space-y-1 flex-grow">
                    <p className="font-bold text-xl text-indigo-700 dark:text-indigo-300">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{student.major}</p>
                  </div>

                  <Link
                    href={`/edit_student/${student.id}`}
                    className="px-4 py-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-500 dark:border-indigo-400 rounded-full hover:bg-indigo-100 dark:hover:bg-gray-600 transition duration-200 mr-2"
                  >
                    แก้ไข
                  </Link>
                  <DeleteStudentButton studentId={student.id} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-gray-600 dark:text-gray-400 w-24">อีเมล:</p>
                    <p className="text-gray-700 dark:text-gray-300 break-all">{student.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-gray-600 dark:text-gray-400 w-24">คณะ:</p>
                    <p className="text-gray-700 dark:text-gray-300">{student.faculty}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-gray-600 dark:text-gray-400 w-24">เบอร์โทรศัพท์:</p>
                    <p className="text-gray-700 dark:text-gray-300">{student.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 text-xl font-medium py-10">ยังไม่มีข้อมูลนักเรียนในระบบ 😔</p>
        )}
      </div>
    </div>
  );
}