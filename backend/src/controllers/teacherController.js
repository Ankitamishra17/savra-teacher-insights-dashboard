import { pool } from "../config/db.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        teacher_id,
        teacher_name,
        COUNT(*) FILTER (WHERE activity_type='Lesson Plan') as lessons,
        COUNT(*) FILTER (WHERE activity_type='Quiz') as quizzes,
        COUNT(*) FILTER (WHERE activity_type='Question Paper') as assessments
      FROM activities
      GROUP BY teacher_id, teacher_name
      ORDER BY teacher_name;
    `);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeacherDetails = async (req, res) => {
  const { id } = req.params;
  const { range } = req.query; // 👈 new

  let dateFilter = "";

  if (range === "week") {
    dateFilter = "AND created_at >= CURRENT_DATE - INTERVAL '7 days'";
  } else if (range === "month") {
    dateFilter = "AND created_at >= CURRENT_DATE - INTERVAL '1 month'";
  } else if (range === "year") {
    dateFilter = "AND created_at >= CURRENT_DATE - INTERVAL '1 year'";
  }

  try {
    const result = await pool.query(
      `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as total
      FROM activities
      WHERE teacher_id = $1
      ${dateFilter}
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at);
      `,
      [id],
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClassBreakdown = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT 
        grade,
        COUNT(*)::int as total
      FROM activities
      WHERE teacher_id = $1
      GROUP BY grade
      ORDER BY grade;
      `,
      [id],
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWeeklyActivity = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        TO_CHAR(created_at, 'Dy') AS date,
        COUNT(*)::int AS total,
        EXTRACT(DOW FROM created_at) AS day_order
      FROM activities
      GROUP BY 
        TO_CHAR(created_at, 'Dy'),
        EXTRACT(DOW FROM created_at)
      ORDER BY day_order;
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
