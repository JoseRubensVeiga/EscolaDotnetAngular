using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Escola.Database
{
    public class Connection
    {
        SqlConnection conn;

        public SqlConnection GetConnectionDB()
        {
            string strConn = "Server=localhost; Database=Escola; Integrated Security=True";

            conn = new SqlConnection(strConn);

            try
            {
                if (conn == null || conn.State == System.Data.ConnectionState.Closed)
                {
                    conn.Open();
                }

                return conn;
            }
            catch
            {
                throw new Exception("Não foi possível conectar ao banco de dados");
            }
        }
    }
}
