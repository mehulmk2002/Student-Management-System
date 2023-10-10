import Admin_Control from './Pages/Admin/Admin_Control';
import StudentState from './context/StudentState';
import './App.css';
function App() {
  return (
    <div className="App">
	<StudentState>
     	<Admin_Control/>
	</StudentState>
    </div>
  );
}

export default App;