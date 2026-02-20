import { useNavigate } from "react-router-dom";

const TeacherCard = ({ teacher }) => {
  const navigate = useNavigate();

  const total =
    Number(teacher.lessons) +
    Number(teacher.quizzes) +
    Number(teacher.assessments);

  return (
    <div
      onClick={() => navigate(`/teacher/${teacher.teacher_id}`)}
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer 
                 hover:shadow-xl transition duration-300 border border-gray-100"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {teacher.teacher_name}
      </h3>

      <div className="grid grid-cols-3 gap-4 text-center mb-4">
        <Stat label="Lessons" value={teacher.lessons} color="text-blue-600" />
        <Stat label="Quizzes" value={teacher.quizzes} color="text-green-600" />
        <Stat label="Assessments" value={teacher.assessments} color="text-purple-600" />
      </div>

      <div className="border-t pt-4 text-center">
        <p className="text-gray-500 text-sm">Total Activities</p>
        <p className="text-2xl font-bold text-gray-800">{total}</p>
      </div>
    </div>
  );
};

const Stat = ({ label, value, color }) => (
  <div>
    <p className="text-gray-500 text-sm">{label}</p>
    <p className={`text-lg font-bold ${color}`}>{value}</p>
  </div>
);

export default TeacherCard;