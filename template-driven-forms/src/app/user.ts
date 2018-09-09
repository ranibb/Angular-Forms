export class User {
    /* TypeScript complier generates a public field for each public constructor parameter and automaticlly 
    assigns the parameter's value to that field when you create a new user. */
    constructor(
        public name: string,
        public email: string,
        public phone: number,
        public topic: string,
        public timePreference: string,
        public subscribe: boolean
    ) {}
}
