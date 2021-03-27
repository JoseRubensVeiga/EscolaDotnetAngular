using Escola.Commons;
using Escola.Database;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Escola.Repositories
{
    public class TeacherRepository
    {
        public SqlConnection connection;

        public TeacherRepository()
        {
            connection = new Connection().GetConnectionDB();
        }

        public List<Teacher> GetTeachers()
        {
            SqlDataReader dr;
            SqlCommand cmd;

            cmd = connection.CreateCommand();
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "SELECT * FROM professores;";

            List<Teacher> teachers = new List<Teacher>();
            dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                teachers.Add(new Teacher()
                {
                    Id = Convert.ToInt32(dr[0]),
                    Name = dr[1].ToString(),
                    Cpf = dr[2].ToString(),
                    Subject = dr[3].ToString(),
                });

            }

            connection.Close();
            return teachers;
        }

        public Teacher FindTeacher(int teacherId)
        {
            SqlDataReader dr;
            SqlCommand cmd;

            cmd = connection.CreateCommand();
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "SELECT * FROM professores WHERE id = " + teacherId + ";";

            List<Teacher> teachers = new List<Teacher>();
            dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                teachers.Add(new Teacher()
                {
                    Id = Convert.ToInt32(dr[0]),
                    Name = dr[1].ToString(),
                    Cpf = dr[2].ToString(),
                    Subject = dr[3].ToString(),
                });

            }

            connection.Close();
            return teachers[0];
        }

        public void CreateTeacher(Teacher teacherToCreate)
        {
            SqlCommand cmd;

            cmd = connection.CreateCommand();
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "INSERT INTO professores(nome, cpf, materia) VALUES (";
            cmd.CommandText += "'" + teacherToCreate.Name + "',";
            cmd.CommandText += "'" + teacherToCreate.Cpf + "',";
            cmd.CommandText += "'" + teacherToCreate.Subject + "');";

            cmd.ExecuteReader();
            connection.Close();
        }

        public void UpdateTeacher(Teacher teacherToEdit)
        {
            SqlCommand cmd;

            cmd = connection.CreateCommand();
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "UPDATE professores SET ";
            cmd.CommandText += "nome = '" + teacherToEdit.Name + "',";
            cmd.CommandText += "cpf = '" + teacherToEdit.Cpf + "',";
            cmd.CommandText += "materia = '" + teacherToEdit.Subject + "'";
            cmd.CommandText += "WHERE id = " + teacherToEdit.Id;

            cmd.ExecuteReader();
            connection.Close();
        }

        public void DeleteTeacher(int teacherId)
        {
            SqlCommand cmd;

            cmd = connection.CreateCommand();
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "DELETE FROM professores ";
            cmd.CommandText += "WHERE id = " + teacherId;

           cmd.ExecuteReader();
            connection.Close();
        }

        public List<Student> GetStudents(int teacherId)
        {
            SqlDataReader dr;
            SqlCommand cmd;

            cmd = connection.CreateCommand();
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "" +
                "SELECT * " +
                "FROM alunos " +
                "INNER JOIN professores " +
                "ON alunos.professor_id = professores.id " +
                "WHERE professores.id = " + teacherId;

            List<Student> students = new List<Student>();
            dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                students.Add(new Student()
                {
                    Id = Convert.ToInt32(dr[0]),
                    Name = dr[1].ToString(),
                    Cpf = dr[2].ToString(),
                    TeacherId = Convert.ToInt32(dr[3]),
                });

            }

            connection.Close();
            return students;
        }

    }
}
