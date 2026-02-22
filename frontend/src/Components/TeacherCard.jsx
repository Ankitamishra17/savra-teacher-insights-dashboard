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
        className="bg-[#1a1a22] rounded-xl p-6 cursor-pointer 
                  border border-red-900/20
                  shadow-lg hover:shadow-red-900/30
                  hover:scale-105 transition-all duration-300"
      >
      {/* Teacher Name */}
      <h3 className="text-xl font-semibold text-red-400 mb-4">
        {teacher.teacher_name}
      </h3>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center mb-4">
        <Stat label="Lessons" value={teacher.lessons} />
        <Stat label="Quizzes" value={teacher.quizzes} />
        <Stat label="Assessments" value={teacher.assessments} />
      </div>

      {/* Total Section */}
      <div className="border-t border-red-900/20 pt-4 text-center">
        <p className="text-gray-400 text-sm">Total Activities</p>
        <p className="text-2xl font-bold text-white">{total}</p>
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div>
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="text-lg font-bold text-red-400">{value}</p>
  </div>
);

export default TeacherCard;