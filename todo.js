class Todo {
  static counter = 0;
  constructor(title, desc, dueDate, priority) {
    this.id = Todo.counter++;
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}