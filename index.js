//Блок ЧАТ
const button = document.querySelector("#button");
const comments = document.querySelector("#comments");
const userName = document.querySelector("#name");
const avatar = document.querySelector("#avatar");
const message = document.querySelector("#message");
const nameCheckboxYes = document.querySelector("#name_yes");
const nameCheckboxNo = document.querySelector("#name_no");

let createComment = () => {
	let newComment = document.createElement("div");
	newComment.classList.add("comment");
	//спам фильтр
	const spamFilter = /buy viagra|xxx|porno/gi;
	// параграф для имени
	let newName = document.createElement("p");
	newName.classList.add("comment__name");
	// проверка имени
	let nameChange= userName.value;
	if (nameCheckboxNo.checked && nameCheckboxYes.checked) {
		alert("выберите один вариант");
        return;
	} else if (nameCheckboxNo.checked) {
		nameChange= "username";
		newName.textContent = nameChange;
	} else if (nameCheckboxYes.checked) {
		if (nameChange.indexOf(" ") !== -1) {
			alert(`поле "имя" не может содержать пробел`);
			return;
		} else if (spamFilter.test(nameChange)) {
			nameChange = nameChange.replace(spamFilter, "***");
			nameChange = nameChange.charAt(0).toUpperCase() + nameChange.slice(1).toLowerCase();
			newName.textContent = nameChange;
		} else {
			nameChange = nameChange.charAt(0).toUpperCase() + nameChange.slice(1).toLowerCase();
			newName.textContent = nameChange;
		}
	} else {
		alert(`выберите один вариант`);
        return;
	}

// создание аватара
	let newAvatar = document.createElement("img");
    newAvatar.classList.add("comment__avatar");
    if (avatar.value) {
        newAvatar.setAttribute("src", avatar.value);
    } else {
    const avatars = [
        '/style/images/Carry.jpg',
             '/style/images/Hurrem.jpg',
             '/style/images/Harry-Potter.jpg',
          '/assets/images/Iron-Man.jpg',
          '/assets/images/Minion.jpg',
        '/assets/images/home-alone.jpg',
         '/assets/images/snowjpg',
];
        const randomIndex = Math.floor(Math.random() * avatars.length);
        const randomAvatar = avatars[randomIndex];
        newAvatar.setAttribute("src", randomAvatar);
    }

// создание даты
    let newDate = document.createElement("p");
	newDate.classList.add("comment__date");
    let commentDate = new Date().toLocaleString('en-gb', {weekday:"short", hour:"2-digit", minute:"2-digit", second: "2-digit", year: "2-digit", month: "short", day: "2-digit"});
    newDate.innerHTML = commentDate;
   
	//создание поля заполнения
	let newMessage = document.createElement("p");
	let messageText = message.value;
	if (messageText === "" || !messageText.replace(/\s/g, "").length) {
		alert(`поле "сообщение" не может быть пустым`);
		return;
	} else if (spamFilter.test(messageText)) {
		messageText = messageText.replace(spamFilter, "***");
		newMessage.classList.add("comment__text");
		newMessage.textContent = messageText;
	} else {
		newMessage.classList.add("comment__text");
		newMessage.textContent = messageText;
	}

	//вывод сообщений
	newComment.append(newAvatar,commentDate, newName, newMessage);
	comments.append(newComment);
	
// обнуление
    userName.value = "";
	message.value = "";
    avatar.value = "";
};

button.addEventListener("click", createComment);