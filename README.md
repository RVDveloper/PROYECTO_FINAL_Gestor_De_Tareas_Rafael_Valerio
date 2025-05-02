# Gestor de Tareas - React Proyecto Final

## Jerarquía de Componentes

```
App (Componente Raíz)
├── Sidebar
│   ├── Lista de Usuarios
│   ├── Formulario Nuevo Usuario
│   ├── Información del Usuario Seleccionado
│   └── Botón Cambio de Tema
└── TaskList
    ├── Lista de Tareas
    │   ├── Tarea Individual
    │   └── Tarea Individual
    └── Formulario Nueva Tarea
```

## Estructura de la Aplicación

### Componentes

1. **App (Componente Principal)**
   - Funcionalidades principales:
     - Gestión de la lista de usuarios
     - Control del tema (claro/oscuro)
     - Coordinación entre componentes
   - Estados principales:

     ```javascript
     const [users, setUsers] = useState([]);
     const [selectedUserIndex, setSelectedUserIndex] = useState(null);
     const [theme, setTheme] = useState('light');
     ```

2. **Componentes Principales**
   - **Sidebar (Barra Lateral)**
     - Visualización de la lista de usuarios
     - Funcionalidad para añadir nuevos usuarios
     - Información del usuario seleccionado
     - Control del cambio de tema
   - **TaskList (Lista de Tareas)**
     - Visualización de tareas del usuario seleccionado
     - Gestión de tareas (añadir, editar, completar, eliminar)
     - Estilo condicional para tareas completadas

3. **Componentes de Lista**
   - Elementos individuales para usuarios y tareas
   - Gestión de interacciones básicas (selección, tachado)

## Gestión de Datos

### Props

Los datos se pasan desde el componente principal a los componentes hijos:

```javascript
<Sidebar 
  users={users}
  selectedUserIndex={selectedUserIndex}
  setSelectedUserIndex={setSelectedUserIndex}
  setUsers={setUsers}
/>
```

Los cambios se propagan hacia arriba mediante funciones callback.

### Context API

Implementamos Context para la gestión del tema, ya que es un estado compartido:

1. **Creación del Contexto**:

   ```javascript
   const ThemeContext = createContext();
   ```

2. **Proveedor del Contexto** (en App):

   ```javascript
   <ThemeContext.Provider value={{ theme, toggleTheme }}>
     {/* Componentes hijos */}
   </ThemeContext.Provider>
   ```

3. **Consumidor del Contexto** (en Sidebar):

   ```javascript
   const { theme, toggleTheme } = React.useContext(ThemeContext);
   ```

## Estructura de Datos

### Usuarios y Tareas

```javascript
[
  {
    name: "Nombre del usuario",
    tasks: [
      {
        text: "Texto de la tarea",
        completed: false
      }
    ]
  }
]
```

## Renderizado Condicional

1. **Listas Vacías**:

   ```javascript
   {users.length === 0 ? (
     <li>No hay usuarios. ¡Añade uno!</li>
   ) : (
     users.map(...)
   )}
   ```

2. **Tareas Completadas**:

   ```javascript
   <li className={task.completed ? "completed" : ""}>
   ```

3. **Información del Usuario**:

   ```javascript
   {selectedUser && (
     <div id="userInfo">
       <p id="userName">{selectedUser.name}</p>
       <p id="userStats">Tareas: {completedTasks} / {totalTasks} completadas</p>
     </div>
   )}
   ```

## Estados Controlados

1. **Campos de Entrada**
   - `newUserInput` y `newTaskInput` son campos controlados
   - Se actualizan mediante eventos onChange
   - Se resetean después de añadir nuevos elementos

2. **Listas**
   - La lista de usuarios y tareas se gestiona mediante estados
   - Las operaciones (añadir, editar, eliminar) actualizan el estado

## Gestión del Tema

Implementamos el tema mediante Context API:

1. **Estado del Tema**:

   ```javascript
   const [theme, setTheme] = useState('light');
   ```

2. **Función de Cambio**:

   ```javascript
   function toggleTheme() {
     setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
     document.body.classList.toggle('dark');
     document.body.classList.toggle('light');
   }
   ```

3. **Distribución**:
   - El tema y su función de cambio están disponibles globalmente
   - Los componentes acceden al tema mediante useContext

## Estilos

- Mantenemos el archivo CSS original
- Las clases se aplican de manera consistente
- El tema se implementa mediante clases condicionales

## Funcionalidades Principales

- Gestión de usuarios (añadir, eliminar, seleccionar)
- Gestión de tareas (añadir, editar, completar, eliminar)
- Cambio de tema (claro/oscuro)
- Visualización del progreso de tareas (total de tareas y tareas completadas por usuario)
