import { ListGroupItem } from "react-bootstrap";

interface Todo {
  done: boolean;
  title: string;
  status: string;
}

const TodoItem = ( { todo = { done: true, title: 'Buy milk', status: 'COMPLETED' } }) => {
  return (
    <ListGroupItem>
      <input type="checkbox" className="me-2"
             defaultChecked={todo.done}/>
      {todo.title} ({todo.status})
    </ListGroupItem>
 );}
 export default TodoItem;
 
 