renderApp();

function renderApp() {
  const app = document.getElementById('root');

  
  const ThemeContext = React.createContext();

  function App() {
    const [users, setUsers] = React.useState([]);
    const [selectedUserIndex, setSelectedUserIndex] = React.useState(null);
    const [theme, setTheme] = React.useState('light');

    function toggleTheme() {
      setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
      document.body.classList.toggle('dark');
      document.body.classList.toggle('light');
    }

    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className="app">
          <Sidebar 
            users={users}
            selectedUserIndex={selectedUserIndex}
            setSelectedUserIndex={setSelectedUserIndex}
            setUsers={setUsers}
          />
          <main className="main">
            <div className="card">
              <h1 id="mainTitle">
                {selectedUserIndex !== null 
                  ? `Tareas de ${users[selectedUserIndex].name}`
                  : 'Selecciona un usuario'}
              </h1>
              {selectedUserIndex !== null && (
                <TaskList
                  users={users}
                  selectedUserIndex={selectedUserIndex}
                  setUsers={setUsers}
                />
              )}
            </div>
          </main>
        </div>
      </ThemeContext.Provider>
    );
  }

  function Sidebar({ users, selectedUserIndex, setSelectedUserIndex, setUsers }) {
    const { toggleTheme } = React.useContext(ThemeContext);
    const [newUserInput, setNewUserInput] = React.useState('');

    function addUser() {
      if (!newUserInput.trim()) return;
      setUsers(prevUsers => [...prevUsers, { name: newUserInput.trim(), tasks: [] }]);
      setNewUserInput('');
    }

    function deselectUser() {
      setSelectedUserIndex(null);
    }

    const selectedUser = selectedUserIndex !== null ? users[selectedUserIndex] : null;
    const completedTasks = selectedUser ? selectedUser.tasks.filter(t => t.completed).length : 0;
    const totalTasks = selectedUser ? selectedUser.tasks.length : 0;

    return (
      <aside className="sidebar card">
        <h2>Usuarios</h2>
        <ul id="userList">
          {users.length === 0 ? (
            <li>No hay usuarios. ¡Añade uno!</li>
          ) : (
            users.map((user, index) => (
              <li
                key={index}
                style={{ cursor: 'pointer', fontWeight: selectedUserIndex === index ? 'bold' : 'normal' }}
                onClick={() => setSelectedUserIndex(index)}
              >
                {user.name}
              </li>
            ))
          )}
        </ul>
        <input
          type="text"
          id="newUserInput"
          value={newUserInput}
          onChange={(e) => setNewUserInput(e.target.value)}
          placeholder="Nuevo usuario..."
        />
        <button onClick={addUser}>Añadir Usuario</button>

        {selectedUser && (
          <div id="userInfo">
            <hr />
            <p id="userName">{selectedUser.name}</p>
            <p id="userStats">Tareas: {completedTasks} / {totalTasks} completadas</p>
            <button onClick={deselectUser}>Deseleccionar</button>
          </div>
        )}

        <button onClick={toggleTheme} style={{ marginTop: 'auto' }}>🌙/☀️ Tema</button>
      </aside>
    );
  }

  function TaskList({ users, selectedUserIndex, setUsers }) {
    const [newTaskInput, setNewTaskInput] = React.useState('');

    function addTask() {
      if (!newTaskInput.trim() || selectedUserIndex === null) return;
      setUsers(prevUsers => {
        const newUsers = [...prevUsers];
        newUsers[selectedUserIndex].tasks.push({
          text: newTaskInput.trim(),
          completed: false
        });
        return newUsers;
      });
      setNewTaskInput('');
    }

    function toggleTask(taskIndex) {
      setUsers(prevUsers => {
        const newUsers = [...prevUsers];
        newUsers[selectedUserIndex].tasks[taskIndex].completed = 
          !newUsers[selectedUserIndex].tasks[taskIndex].completed;
        return newUsers;
      });
    }

    function deleteTask(taskIndex) {
      setUsers(prevUsers => {
        const newUsers = [...prevUsers];
        newUsers[selectedUserIndex].tasks.splice(taskIndex, 1);
        return newUsers;
      });
    }

    function editTask(taskIndex) {
      const newText = prompt(
        "Editar tarea:",
        users[selectedUserIndex].tasks[taskIndex].text
      );
      if (newText !== null && newText.trim() !== "") {
        setUsers(prevUsers => {
          const newUsers = [...prevUsers];
          newUsers[selectedUserIndex].tasks[taskIndex].text = newText.trim();
          return newUsers;
        });
      }
    }

    return (
      <div id="taskSection">
        <ul id="taskList">
          {users[selectedUserIndex].tasks.length === 0 ? (
            <li>No hay tareas. ¡Añade una!</li>
          ) : (
            users[selectedUserIndex].tasks.map((task, index) => (
              <li key={index} className={task.completed ? "completed" : ""}>
                <span onClick={() => toggleTask(index)}>{task.text}</span>
                <div className="actions">
                  <button onClick={() => editTask(index)}>✏️</button>
                  <button onClick={() => deleteTask(index)}>🗑️</button>
                </div>
              </li>
            ))
          )}
        </ul>
        <input
          type="text"
          id="newTaskInput"
          value={newTaskInput}
          onChange={(e) => setNewTaskInput(e.target.value)}
          placeholder="Nueva tarea..."
        />
        <button onClick={addTask}>Añadir Tarea</button>
      </div>
    );
  }

  const root = ReactDOM.createRoot(app);
  root.render(<App />);
}

