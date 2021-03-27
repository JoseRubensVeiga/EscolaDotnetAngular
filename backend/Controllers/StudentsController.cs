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
    public class StudentsController : ControllerBase
    {
        private StudentRepository _repository = new StudentRepository();

        [HttpGet]
        public List<Student> GetAll()
        {
            return _repository.GetStudents();
        }

        [HttpGet("{studentId}")]
        public Student FindOne(int studentId)
        {
            return _repository.FindStudent(studentId);
        }

        [HttpPost]
        public ActionResult Create([FromBody] Student student)
        {

            _repository.CreateStudent(student);

            return Ok();
        }

        [HttpPatch]
        public ActionResult Update([FromBody] Student student)
        {

            _repository.UpdateStudent(student);

            return Ok();
        }

        [HttpDelete("{studentId}")]
        public ActionResult Delete(int studentId)
        {

            _repository.DeleteStudent(studentId);

            return Ok();
        }

        [HttpGet("{studentId}/teacher")]
        public Teacher GetTeacher(int studentId)
        {
            return _repository.GetTeacher(studentId);
        }
    }
}
