import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  name: string;

  @Column({ type: "varchar", nullable: true })
  surname: string;

  @OneToMany(() => Book, (book) => book.author)
  book: Book[];
}

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  name: string;

  @ManyToOne(() => Author, (author) => author.book)
  author: Author;

  @ManyToMany(() => Publisher, (publisher) => publisher.book)
  publisher: Publisher[];

  @ManyToOne(() => User, (user) => user.book)
  user: User;

  @ManyToOne(() => BookStatus, (bookStatus) => bookStatus.book)
  bookStatus: BookStatus;

  @OneToOne(() => BookDetail, (bookDetail) => bookDetail.book)
  bookDetail: BookDetail;
}

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  name: string;

  @ManyToMany(() => Book, (book) => book.publisher)
  @JoinTable()
  book: Book[];
}

@Entity()
export class PanelUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  email: string;

  @Column({ type: "varchar", nullable: true })
  password: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  tckNo: string;

  @Column({ type: "varchar", nullable: true })
  name: string;

  @Column({ type: "varchar", nullable: true })
  surname: string;

  @Column({ type: "varchar", nullable: true })
  phone: string;

  @Column({ type: "varchar", nullable: true })
  email: string;

  @OneToMany(() => Book, (book) => book.user)
  book: Book[];
}

@Entity()
export class BookStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  name: string;

  @OneToMany(() => Book, (book) => book.bookStatus)
  book: Book[];
}

@Entity()
export class BookDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  dateOfIssue: string;

  @Column({ type: "varchar", nullable: true })
  deliveryDate: string;

  @Column({ type: "varchar", nullable: true })
  note: string;

  @OneToOne(() => Book)
  @JoinColumn()
  book: Book;
}
