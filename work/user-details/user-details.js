// В index.html
// 1 получить массив объектов user с endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вывести id,name всех user в index.html. Отдельный блок для каждого user.
// 3 Добавить каждому блоку кнопку/ссылку , при клике на которую происходит переход на страницу user-details.html, которая имеет детальную информацию про объект на который кликнули
//
// На странице user-details.html:
// 4 Вывести всю, без исключения, информацию про объект user на кнопку/ссылку которого был совершен клик ранее.
// 5 Добавить кнопку "post of current user", при клике на которую, появляются title всех постов текущего юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту добавить кнопку/ссылку, при клике на которую происходит переход на страницу post-details.html, которая имеет детальную информацию про текущий пост.
//
// На странице post-details.html:
// 7 Вывести всю, без исключения, информацию про объект post на кнопку/ссылку которого был совершен клик ранее.
// 8 Ниже информации про пост, вывести все комментарии текущего поста (эндпоинт для получения информации - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//
// Стилизация проекта -
// index.html - все блоки с user - по 2 в ряд. кнопки/ссылки находяться под информацией про user.
// user-details.html - блок с информацией про user вверху страницы. Кнопка ниже, на 90% ширины страницы, по центру.
// блоки с краткой информацией про post - в ряд по 5 объектов.
// post-details.html - блок с информацией про пост вверху. Комментарии - по 4 в ряд.
// Все без исключения элементы, который характеризируют user,post,comment  визуализировать, так, что бы было видно их блоки (дать задний фон + margin. Иными словами - крайне четкая сетка)

const id = localStorage.getItem('id');
fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(response => response.json())
    .then(data => {
        let mainDiv = document.createElement('div');
        mainDiv.classList.add('main');
        document.body.appendChild(mainDiv);
        function getAllData(data){
            for (const dataKey in data) {
                if (typeof data[dataKey] === "object"){
                    let innerDiv = document.createElement('div');
                    innerDiv.classList.add('upper');
                    innerDiv.innerText = `${dataKey}`;
                    mainDiv.appendChild(innerDiv);
                    getAllData(data[dataKey])
                }else{
                    let innerDiv = document.createElement('div');
                    innerDiv.classList.add('inner');
                    innerDiv.innerText = `${dataKey} : ${data[dataKey]}`;
                    mainDiv.appendChild(innerDiv);
                }
            }
        }
        getAllData(data);
        let button = document.createElement('button');
        button.classList.add('button');
        button.innerText = 'post of current user';
        mainDiv.appendChild(button);
        button.onclick = function (){
            button.disabled = true;
            fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
                .then(response => response.json())
                .then(data => {
                    for (const datum of data) {
                        let postDiv = document.createElement('div');
                        postDiv.classList.add('postDiv');
                        let post = document.createElement('div');
                        post.classList.add('post');
                        post.innerText = datum.title;
                        let innerButton = document.createElement('button');
                        innerButton.classList.add('innerButton');
                        innerButton.innerText = 'post details';
                        postDiv.append(post,innerButton);
                        mainDiv.appendChild(postDiv);
                        innerButton.onclick = function (){
                            localStorage.setItem('id', datum.id);
                            document.location.href = '../post-details/post-details.html';
                        }
                    }
                })
        }
    })