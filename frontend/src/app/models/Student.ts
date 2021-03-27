export class Student {
  id: number;
  name: string;
  cpf: string;
  teacherId: number;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.cpf = data.cpf;
    this.teacherId = data.teacherId;
  }
}
