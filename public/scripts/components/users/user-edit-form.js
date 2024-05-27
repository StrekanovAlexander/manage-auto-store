function UserForm() {
  const classInput = 'form-control form-control-sm';
  const minLength = 5;

  const [ isValid, setIsValid ] = React.useState(false);
  const [ data, setData] = React.useState([]);
 
  const [ usr, setUsr ] = React.useState(''); 
  const [ pwd, setPwd ] = React.useState('');
  const [ pwd2, setPwd2 ] = React.useState('');

  const [ classUsr, setClassUsr] = React.useState(classInput);
  const [ classPwd, setClassPwd] = React.useState(classInput);
  const [ classPwd2, setClassPwd2] = React.useState(classInput);
    
  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('http://localhost:3000/users/roles');
        const json = await res.json();
        setData(json.roles);
      } catch (err) {
        console.log('Cant load data...');
      }
    };
    getData();
  }, []);  

  const validClass = (cond) => {
    const validated = cond ? ' is-valid' : ' is-invalid';
    return classInput + validated;
  }

  const validate = () => {
    setIsValid(false);
    
    if (usr.length < minLength) {
      setClassUsr(validClass(false));
      return;
    }
    setClassUsr(validClass(true));

    if (pwd.length < minLength) {
      setClassPwd(validClass(false));
      return;
    }
    setClassPwd(validClass(true));

    if (pwd2.length < minLength) {
      setClassPwd2(validClass(false));
      return;
    }
        
    if (pwd !== pwd2) {
      setClassPwd2(validClass(false));
      return; 
    }
    setClassPwd2(validClass(true)); 

    setIsValid(true);    
  }
  
  return (
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <h1 class="mt-3 mb-4"><i class="bi bi-person-plus-fill"></i> Создание пользователя</h1>
        <form action="/users/create" method="POST">
          <div class="mb-3">
            <label for="username" class="form-label">Имя <span class="small text-secondary">(не менее 5 символов)</span></label>
            <input type="text" id="username" name="username" 
              className={ classUsr } 
              value={ usr } 
              onChange={ (ev) => setUsr(ev.target.value) } 
              onKeyUp={ validate }
              />
          </div>
          <div class="mb-3"> 
            <label for="role_id" class="form-label">Роль</label>
            <select class="form-select form-select-sm" id="role_id" name="role_id">
              { data.map(el => 
                <option key={el.id} value={el.id}>{el.title}</option>
              )}
            </select>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Пароль <span class="small text-secondary">(не менее 5 символов)</span></label>
            <input type="password" id="password" name="password" 
              className={ classPwd } 
              value={ pwd } 
              onChange={ (ev) => setPwd(ev.target.value) }
              onKeyUp={ validate }
            />
          </div>
          <div class="mb-4">
            <label for="password2" class="form-label">Пароль <span class="small text-secondary">(повтор)</span></label>
            <input type="password" id="password2"  
              className={ classPwd2 } 
              value={ pwd2 } 
              onChange={ (ev) => setPwd2(ev.target.value) }
              onKeyUp={ validate }
            />
            <div class="invalid-feedback">Пароли не совпадают</div>
          </div>
          <div class="d-flex justify-content-between">
            <a href="/users" class="btn btn-sm btn-dark">Отмена</a>
            <button type="submit" class="btn btn-sm btn-success" disabled={ !isValid }>Далее</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const app = document.getElementById('app');
const root = ReactDOM.createRoot(app);
root.render(React.createElement(UserForm));