import { ZodError } from "zod";

export class UserEntryError extends ZodError {
  constructor (props: ZodError) {
    super(props.issues);
  }

  pretty () {
    const lens = this.issues.map(issue => {
      return {
        [issue.path[0]]: issue.message
      };
    });

    const result = {
      message: "User entry error",
      errors: lens
    };

    return result;
  }
}
