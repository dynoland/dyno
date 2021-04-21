export class DependencyError extends Error {
  constructor(depencency: string, message?: string) {
    super(
      `It was not possible to parse '${depencency}' dependency.${
        message
          ? `\n${message}`
          : ""
      }`,
    );
  }
}
