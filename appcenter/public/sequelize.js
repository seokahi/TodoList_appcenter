// 사용자 이름 눌렀을 때 댓글 로딩
document.querySelectorAll('#user-list tr').forEach((el) => {
    el.addEventListener('click', function () {
      const id = el.querySelector('td').textContent;
      getTodolist(id);
    });
  });
  // 사용자 로딩
  async function getUser() {
    try {
      const res = await axios.get('/members');
      const users = res.data;
      console.log(users);
      const tbody = document.querySelector('#user-list tbody');
      tbody.innerHTML = '';
      users.map(function (user) {
        const row = document.createElement('tr');
        row.addEventListener('click', () => {
          getTodolist(user.id);
        });
        // 로우 셀 추가
        let td = document.createElement('td');
        td.textContent = user.id;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.email;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.age;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.name;
        row.appendChild(td);
        const editage = document.createElement('button');
        editage.textContent = '나이수정';
        editage.addEventListener('click', async () => { // 수정 클릭 시
          const newage = Number(prompt('수정할 나이를 입력하세요'));
          if (!newage) {
            return alert('나이를 입력해주세요.');
          }
          try {
            console.log(`${user.id}`);
            await axios.patch(`/members/${user.id}`, {age: newage });
            getUser();
          } catch (err) {
            console.error(err);
          }
        });
        const editname = document.createElement('button');
        editname.textContent = '이름수정';
        editname.addEventListener('click', async () => { 
          const newname = prompt('수정할 이름을 입력하세요');
          if (!newname) {
            return alert('이름을 입력해주세요.');
          }
          try {
            console.log(`${user.id}`);
            await axios.patch(`/members/${user.id}`, {name: newname });
            getUser();
          } catch (err) {
            console.error(err);
          }
        });
        const retrievetodo = document.createElement('button');
        retrievetodo.textContent = `${user.id} 할 일 조회`;
        retrievetodo.addEventListener('click', async () => { 
              getTodolist(user.id);
        });
        td = document.createElement('td');
        td.appendChild(editage);
        row.appendChild(td);
        td = document.createElement('td');
        td.appendChild(editname);
        row.appendChild(td);
        td = document.createElement('td');
        td.appendChild(retrievetodo);
        row.appendChild(td);
        tbody.appendChild(row);
      });
    } catch (err) {
      console.error(err);
    }
  }
getUser();
  // 댓글 로딩
  async function getTodolist(id) {
    try {
      const res = await axios.get(`/members/${id}/todos`);
      const todolists = res.data;
      const tbody = document.querySelector('#todolist-list tbody');
      tbody.innerHTML = '';
      todolists.map(function (todolist) {
        // 로우 셀 추가
        const row = document.createElement('tr');
        let td = document.createElement('td');
        td.textContent = todolist.id;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = todolist.User.name;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = todolist.todolist;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = todolist.completed ? '완료' : '미완료';
        row.appendChild(td);
        const edit = document.createElement('button');
        edit.textContent = '수정';
        edit.addEventListener('click', async () => { // 수정 클릭 시
          const newcompleted = Number(prompt('완료는 1, 미완료는 0를 입력하세요.'));
          if(!(newcompleted==0 || newcompleted==1))
          {
            return alert('완료는 1, 미완료는 0을 다시 입력하세요.');
          }
          try {
            await axios.patch(`/todos/${todolist.id}`, { completed: newcompleted });
            getTodolist(id);
          } catch (err) {
            console.error(err);
          }
        });
        const remove = document.createElement('button');
        remove.textContent = '삭제';
        remove.addEventListener('click', async () => { // 삭제 클릭 시
          try {
            await axios.delete(`/todos/${todolist.id}`);
            getTodolist(id);
          } catch (err) {
            console.error(err);
          }
        });
        // 버튼 추가
        td = document.createElement('td');
        td.appendChild(edit);
        row.appendChild(td);
        td = document.createElement('td');
        td.appendChild(remove);
        row.appendChild(td);
        tbody.appendChild(row);
      });
    } catch (err) {
      console.error(err);
    }
  }
  // 사용자 등록 시
  document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email=e.target.email.value;
    const name = e.target.username.value;
    const age = e.target.age.value;
    if (!email) {
      return alert('이메일을 입력하세요');
    }
    if (!name) {
      return alert('이름을 입력하세요');
    }
    if (!age) {
      return alert('나이를 입력하세요');
    }
    try {
      await axios.post('/members', { email,name, age});
      getUser();
    } catch (err) {
      console.error(err);
    }
    e.target.email.value='';
    e.target.age.value = '';
    e.target.username.value = '';
  });
  // 댓글 등록 시
  document.getElementById('todolist-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = e.target.userid.value;
    const todolist = e.target.todolist.value;
    const completed = e.target.completed.checked;
    if (!id) {
      return alert('아이디를 입력하세요');
    }
    if (!todolist) {
      return alert('할일을 입력하세요');
    }
    try {
      await axios.post('/todos', { id, todolist,completed });
      getTodolist(id);
    } catch (err) {
      console.error(err);
    }
    e.target.userid.value = '';
    e.target.todolist.value = '';
    e.target.completed.checked = false;
  });
