using Escola.Commons;
using Escola.Database;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Escola.Repositories
{
    public class StudentRepository
    {
        public SqlConnection connection;

        public StudentRepository()
        {
            connection = new Connection().GetConnectionDB();
        }

        public List<Student> GetStudents()
        {
            SqlDataReader dr;
            SqlCommand cmd;

            cmd = connection.CreateCommand();
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "SELECT * FROM alunos;";

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

        public Student FindStudent(int studentId)
        {
            SqlDataReader dr;
            SqlCommand cmd;

            cmd = connection.CreateCommand();
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "SELECT * FROM alunos WHERE id = " + studentId + ";";

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
            return students[0];
        }

        public void CreateStudent(Student studentToCreate)
        {
            SqlCommand cmd;

            cmd = connection.CreateCommand();
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "INSERT INTO alunos (nome, cpf, professor_id) VALUES (";
            cmd.CommandText += "'" + studentToCreate.Name + "',";
            cmd.CommandText += "'" + studentToCreate.Cpf + "',";
            cmd.CommandText += "'" + studentToCreate.TeacherId + "');";

            cmd.ExecuteReader();
            connection.Close();
        }

        public void UpdateStudent(Student studentToEdit)
        {
            SqlCommand cmd;

            cmd = connection.CreateCommand();
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "UPDATE alunos SET ";
            cmd.CommandText += "nome = '" + studentToEdit.Name + "',";
            cmd.CommandText += "cpf = '" + studentToEdit.Cpf + "',";
            cmd.CommandText += "professor_id = '" + studentToEdit.TeacherId + "'";
            cmd.CommandText += "WHERE id = " + studentToEdit.Id;

            cmd.ExecuteReader();
            connection.Close();
        }

        public void DeleteStudent(int studentToEdit)
        {
            SqlCommand cmd;

            cmd = connection.CreateCommand();
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "DELETE FROM alunos ";
            cmd.CommandText += "WHERE id = " + studentToEdit;

            cmd.ExecuteReader();
            connection.Close();
        }

        public Teacher GetTeacher(int studentId)
        {
            SqlDataReader dr;
            SqlCommand cmd;

            cmd = connection.CreateCommand();
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "" +
                "SELECT * " +
                "FROM professores " +
                "INNER JOIN alunos " +
                "ON alunos.professor_id = professores.id " +
                "WHERE alunos.id = " + studentId;

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
    }
}
