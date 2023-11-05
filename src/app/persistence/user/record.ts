export class User {
  #id: number;
  #name: string;
  #email: string;
  #password: string;
  #admin: boolean;
  #created_at: Date;

  constructor(
    id: number,
    email: string,
    password: string,
    name: string,
    admin: boolean,
    created_at: Date
  ) {
    this.#id = id;
    this.#email = email;
    this.#password = password;
    this.#name = name;
    this.#created_at = created_at;
    this.#admin = admin;
  }

  get id(): number {
    return this.#id;
  }

  get email(): string {
    return this.#email;
  }

  get password(): string {
    return this.#password;
  }

  get name(): string {
    return this.#name;
  }

  get admin(): boolean {
    return this.#admin;
  }

  get created_at(): Date {
    return this.#created_at;
  }
}
