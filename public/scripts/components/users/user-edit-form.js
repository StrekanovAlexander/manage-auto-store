function UserForm() {
  const [ isValid, setIsValid ] = React.useState(false);
  return (
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <h1 class="mt-3 mb-4"><i class="bi bi-person-plus-fill"></i> Создание пользователя</h1>
        <form action="/users/create" method="POST">
          <div class="mb-3">
            <label for="username" class="form-label">Имя пользователя</label>
            <input type="text" class="form-control form-control-sm" id="username" name="username" value="John"/>
          </div>
          <div class="mb-3"> 
            <label for="permission_id" class="form-label">Уровень доступа</label>
            <select class="form-select form-select-sm" id="permission_id" name="permission_id">
              <option value="3">Гость</option>
              <option value="2">Менеджер</option>
              <option value="1">Администратор</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Пароль</label>
            <input type="password" class="form-control form-control-sm" id="password" name="password" value="123" />
          </div>
          <div class="mb-3">
            <label for="password2" class="form-label">Пароль (повтор)</label>
            <input type="password" class="form-control form-control-sm" id="password2" value="12" name="password2" />
            <div class="invalid-feedback password2"></div>
          </div>
          <div class="d-flex justify-content-between">
            <a href="/users" class="btn btn-sm btn-dark">Отмена</a>
            <button type="submit" class="btn btn-sm btn-dark" disabled={ !isValid }>Далее</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const app = document.getElementById('app');
const root = ReactDOM.createRoot(app);
root.render(React.createElement(UserForm));