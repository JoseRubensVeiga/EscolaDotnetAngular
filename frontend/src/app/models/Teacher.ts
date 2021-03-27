export class Teacher {
  id: number;
  name: string;
  cpf: string;
  subject: number;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.cpf = data.cpf;
    this.subject = data.subject;
  }
}
