import React from "react";
import { List, Icon, DatePicker, Input } from "antd";
export default class TodoItem extends React.Component {
  remove = () => {
    // Remove this TodoItem
    this.props.removeTodo(this.props.todo.index);
  };
  handleDateChange = (date, dateString) => {
    // Update the date when changed
    this.props.setDate(this.props.todo.index, date, dateString);
  };
  handleClickEdit = () => {
    this.props.transformEditingItem(this.props.todo.index);
  };
  handleEditConfirm = e => {
    this.props.editTodoItem(this.props.todo.index, e.target.value);
  };

  render() {
    if (this.props.todo.isEditing) {
      return (
        <List.Item>
          <Input
            defaultValue={this.props.todo.content}
            onPressEnter={this.handleEditConfirm}
          />
        </List.Item>
      );
    }
    return (
      <List.Item
        actions={[
          <DatePicker
            format="MM/DD/YYYY"
            onChange={this.handleDateChange}
            value={this.props.todo.date}
          />,
          <Icon type="edit" theme="filled" onClick={this.handleClickEdit} />,
          <Icon type="close-circle" theme="filled" onClick={this.remove} />
        ]}
      >
        {this.props.todo.content}
      </List.Item>
    );
  }
}
