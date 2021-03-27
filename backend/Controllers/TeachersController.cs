using Escola.Commons;
using Escola.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Escola.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController : ControllerBase
    {
        private TeacherRepository _repository = new TeacherRepository();

        [HttpGet]
        public List<Teacher> GetAll()
        {
            return _repository.GetTeachers();
        }

        [HttpGet("{teacherId}")]
        public Teacher FindOne(int teacherId)
        {
            return _repository.FindTeacher(teacherId);
        }

        [HttpPost]
        public ActionResult Create([FromBody] Teacher teacher)
        {

            _repository.CreateTeacher(teacher);

            return Ok();
        }

        [HttpPatch]
        public ActionResult Update([FromBody] Teacher teacher)
        {

            _repository.UpdateTeacher(teacher);

            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {

            _repository.DeleteTeacher(id);

            return Ok();
        }

        [HttpGet("{teacherId}/students")]
        public List<Student> GetStudents(int teacherId)
        {
            return _repository.GetStudents(teacherId);
        }
    }
}
