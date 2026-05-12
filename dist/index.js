var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getUsername = document.querySelector("#search");
const fromSubmit = document.querySelector("#form");
const main_container = document.querySelector(".main_conatiner");
const showResultUI = (singleuser) => {
    const { avatar_url, login, location, url } = singleuser;
    main_container.insertAdjacentHTML("beforeend", `
<div class="card">
    <img src="${avatar_url}" alt="${login}'s avatar" class="avatar"/>
    <h2>${login}</h2>
    <p>Location: ${location || "Not Available"}</p>
    <a href="${url}" target="_blank">View Profile</a>
</div>
`);
};
function fetchUserData(url) {
    main_container.innerHTML = "";
    myCustomFetcher(url, {}).then((userInfo) => {
        for (let singleuser of userInfo) {
            showResultUI(singleuser);
        }
    }).catch((error) => {
        console.error(error);
        main_container.innerHTML = `<p class="error">Unable to load data. Please try again later.</p>`;
    });
}
// reusable function to fetch data from any url
function myCustomFetcher(url, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}, status: ${response.status}`);
        }
        const data = yield response.json();
        return data;
    });
}
fetchUserData("https://api.github.com/users");
export {};
//# sourceMappingURL=index.js.map