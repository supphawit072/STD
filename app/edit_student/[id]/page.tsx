import EditStudentForm from '../../components/EditStudentForm';
import { getStudentById } from '../../actions/studentActions';

interface Props {
  params: { id: string };
}

export default async function EditStudentPage({ params }: Props) {
  const result = await getStudentById(Number(params.id));

  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center max-w-md border-t-4 border-red-500 transition-all duration-300">
          <h1 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">
            ไม่พบข้อมูลนักเรียน 😟
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            กรุณาตรวจสอบลิงก์หรือลองใหม่อีกครั้ง
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-2xl w-full border-t-4 border-indigo-500 transition-all duration-300">
        <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-6 text-center">
          แก้ไขข้อมูลนักเรียน ✏️
        </h1>
        <EditStudentForm student={result.data} />
      </div>
    </div>
  );
}