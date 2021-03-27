   
CREATE DATABASE escola;
GO


USE escola;
GO


CREATE TABLE alunos (
    id INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(20) NOT NULL,
    professor_id INT NOT NULL
);
GO


CREATE TABLE professores (
    id INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(20) NOT NULL,
    materia VARCHAR(20) NOT NULL
);
GO


ALTER TABLE alunos
ADD FOREIGN KEY (professor_id)
REFERENCES professores(id);


INSERT INTO professores (nome, cpf, materia)
VALUES
('José', '123456', 'PHP'),
('Danilo', '456', 'JS'),
('Veiga', '789', 'React');
GO


INSERT INTO alunos (nome, cpf, professor_id)
VALUES
('Roger', '456789', 1),
('Rogerio', '4562', 1),
('Rogerinho', '789', 2),
('Rogeraldo', '3241654', 2);
GO