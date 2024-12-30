/* eslint-disable react/prop-types */
export default function Header(props) {
    const { todos } = props;
    const x = todos.filter((val)=> val.complete === false).length;
    const isTasksplural = todos.length !== 1;
    const taskorTasks = isTasksplural ? 'tasks' : 'task';
    return (
        <header className="text-center">
            <h1 className="text-gradient">You have {x} open {taskorTasks}.</h1>
        </header>
    );
}