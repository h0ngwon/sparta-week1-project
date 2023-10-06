import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import {
	collection,
	addDoc,
	getDocs,
	updateDoc,
	doc,
	deleteDoc,
	setDoc,
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// Firebase 구성 정보 설정
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBdoC4sXfxqxom-hnRTx7HKg9-K4986jHE',
	authDomain: 'sparta-week1.firebaseapp.com',
	projectId: 'sparta-week1',
	storageBucket: 'sparta-week1.appspot.com',
	messagingSenderId: '442930140920',
	appId: '1:442930140920:web:9927f609d497bce37a0d0d',
	measurementId: 'G-8RC76V10FV',
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//콜렉션에 데이터 추가
let data = [];
const userName = document.getElementById('userName');
const userPwd = document.getElementById('userPwd');
const comment = document.getElementById('userComment');

const submit = document
	.getElementById('comment-form')
	.addEventListener('submit', async (e) => {
		e.preventDefault();

		let cnt = document.getElementsByClassName('comment-name').length;

		const info = {
			id: cnt,
			userName: userName.value,
			userPwd: userPwd.value,
			comment: comment.value,
		};
		//setDoc(doc(db, "comments", cnt), info);
		await addDoc(collection(db, 'comments'), info).then((d) =>
			console.log(d.id)
		);

		window.location.reload();
	});

//콜렉션 가져오기
let docs = await getDocs(collection(db, 'comments'));
docs.forEach((doc) => {
	let row = doc.data();
	data.push(row);
	//console.log(data);

	const userName = row.userName;
	const comment = row.comment;

	const commentDiv = document.querySelector('#comment').insertAdjacentHTML(
		'beforeend',
		`<div id="comments" class="comments">
            <h2 class="comment-name" id="comment-name">${userName}</h2>
            <div class="comment-content">${comment}</div>
            
            <form class="btn-wrapper-form" id="btn-form">
                <button class="delete-btn" id="delete-btn" type="button">삭제</button>
                <button class="modify-btn">수정</button>
            </form>
        </div>`
	);
});

//콜렉션 데이터 삭제
const btns = document.querySelectorAll('button[id^=delete-btn]');
btns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		e.preventDefault();

		let userName =
			btn.parentNode.parentNode.firstChild.nextSibling.textContent;

		console.log(data);
		
	});
});
