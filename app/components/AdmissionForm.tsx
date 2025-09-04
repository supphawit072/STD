'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createStudent } from '../actions/studentActions';
import Link from 'next/link';

export default function AdmissionForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await createStudent(formData);

    setMessage(result.message);
    setSuccess(result.success);

    if (result.success) {
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }
  }

  const formFields = [
    {
      label: 'ชื่อ',
      name: 'firstName',
      placeholder: 'ชื่อจริง',
      type: 'text',
    },
    {
      label: 'นามสกุล',
      name: 'lastName',
      placeholder: 'นามสกุล',
      type: 'text',
    },
    {
      label: 'สาขา',
      name: 'major',
      placeholder: 'เช่น วิทยาการคอมพิวเตอร์',
      type: 'text',
    },
    {
      label: 'คณะ',
      name: 'faculty',
      placeholder: 'เช่น คณะวิทยาศาสตร์',
      type: 'text',
    },
    {
      label: 'อีเมล',
      name: 'email',
      placeholder: 'example@email.com',
      type: 'email',
    },
    {
      label: 'เบอร์โทรศัพท์',
      name: 'phone',
      placeholder: '08xxxxxxxx',
      type: 'tel',
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex items-center justify-center p-6 min-h-[calc(100vh-100px)]">
      <div className="bg-white dark:bg-gray-800 transition-colors duration-300 p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-2xl">
        {/* Header and Close Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
            แบบฟอร์มเพิ่มนักเรียน ✍️
          </h1>
          <Link
            href="/"
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors text-3xl font-bold"
            aria-label="Close form"
          >
            &times;
          </Link>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
          กรุณากรอกข้อมูลนักเรียนให้ครบถ้วน
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields.map(({ label, name, placeholder, type }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                >
                  {label}:
                </label>
                <div>
                  <input
                    type={type}
                    name={name}
                    id={name}
                    required
                    placeholder={placeholder}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition duration-300 ease-in-out"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button and Message */}
          <div className="flex flex-col items-center justify-between pt-4">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ส่งข้อมูล
            </button>
            {message && (
              <div
                className={`mt-6 px-4 py-2 rounded-lg text-center font-medium w-full ${
                  success
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-600'
                    : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-600'
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}