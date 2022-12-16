export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }
  private validateContent(content: string) {
    return content.length >= 5 && content.length <= 240;
  }
  constructor(content: string) {
    const isContentValid = this.validateContent(content);
    if (!isContentValid) {
      throw new Error("Content lenght error");
    }
    this.content = content;
  }
}

