import React from "react";
import { Input, List, Icon } from "antd";
import "antd/dist/antd.css";
import TodoItem from "./todoItem";
export default class Todo extends React.Component {
  constructor() {
    super();

    // Initialize the state
    this.state = {
      todos: []
    };
  }
  handlePressEnter = e => {
    // Create a todo object containing its index and content
    let todo = {
      index: this.state.todos.length,
      content: e.target.value,
      date: null,
      dateString: "",
      isEditing: false
    };

    // Add the todo to our array
    let newTodos = this.state.todos.concat(todo);

    this.setState({
      todos: newTodos
    });

    // Clear input
    e.target.value = "";
  };
  editTodoItem = (index, content) => {
    console.log("vao edit");
    let newTodos = [...this.state.todos];
    newTodos[index].content = content;
    newTodos[index].isEditing = false;
    // Initialize the state
    this.setState({
      todos: newTodos
    });
  };
  transformEditingItem = index => {
    let newTodos = [...this.state.todos];
    newTodos[index].isEditing = true;

    this.setState({
      todos: newTodos
    });
    console.log(this.state.todos);
  };
  setDate = (index, date, dateString) => {
    // Set the date of the given todo
    let newTodos = [...this.state.todos];
    newTodos[index].date = date;
    newTodos[index].dateString = dateString;

    // Initialize the state
    this.setState({
      todos: newTodos
    });
  };
  removeTodo = index => {
    let newTodos = [...this.state.todos];

    // Remove element
    newTodos.splice(index, 1);

    // Decrement greater indexes
    for (let i = index; i < newTodos.length; i++) {
      newTodos[i].index -= 1;
    }

    // Update state
    this.setState({
      todos: newTodos
    });
  };
  render() {
    return (
      <div className="todoContainer">
        <h1>TODO App</h1>
        <Input
          placeholder="What needs to be done?"
          onPressEnter={this.handlePressEnter}
        />
        <List
          locale={{ emptyText: "No todo items" }}
          dataSource={this.state.todos}
          renderItem={item => (
            <TodoItem
              todo={item}
              removeTodo={this.removeTodo}
              setDate={this.setDate}
              transformEditingItem={this.transformEditingItem}
              editTodoItem={this.editTodoItem}
            />
          )}
        />
      </div>
    );
  }
}
