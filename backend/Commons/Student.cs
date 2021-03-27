using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Escola.Commons
{
    public class Student
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Cpf { get; set; }
        public int TeacherId { get; set; }
    }
}
