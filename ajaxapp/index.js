console.log("index.js: loaded");
const headding = document.querySelector("h2");
const headdingText = headding.textContent;
console.log(headdingText);

const button = document.createElement("button");
button.textContent = 'Push Me';
document.body.appendChild(button);

// const userId = 'js-primer-example';

async function main() {
    try {
        const userId = getUserId()
        const userInfo = await fetchUserInfo(userId);
        const view =  createView(userInfo);
        displayView(view);
    } catch(error) {
        console.error(`エラーが発生しました (${error})`);
    }
}

function fetchUserInfo(userId) {
    return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then(response => {
        if (!response.ok) {
            // エラーレスポンスからRejectedなPromiseを作成して返す
            return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
        } else {
             // JSONオブジェクトで解決されるPromiseを返す
            return response.json()
        }
    });
}

function getUserId() {
    return document.getElementById("userId").value;
}

// htmlを作成する関数
function createView(userInfo) {
    return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
    <dl>
        <dt>Location</dt>
        <dd>${userInfo.location}</dt>
        <dt>Repositories</dt>
        <dd>${userInfo.public_repos}</dt>
    </dl>
    `;
}

// 作成した関数を表示する関数
function displayView(view) {
    const result = document.getElementById("result");
    result.innerHTML = view;
}



function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
    return strings.reduce((result, str, i) => {
        const value = values[i - 1];
        if (typeof value === "string") {
            return result + escapeSpecialChars(value) + str;
        } else {
            return result + String(value) + str;
        }
    });
}



