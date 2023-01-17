export class Author {
  id: number;
  name: string;
  surname: string;
}
export class Book {
  id: number;
  name: string;
}
export class Publisher {
  id: number;
  name: string;
}
export class PanelUser {
  id: number;
  email: string;
  password: string;
}

export class User {
  id: number;
  tckNo: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
}

export class BookStatus {
  id: number;
  name: string;
}

export class BookDetail {
  id: number;
  dateOfIssue: string;
  deliveryDate: string;
  note: string;
}
