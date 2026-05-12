const getUsername = document.querySelector("#search") as HTMLInputElement;
const fromSubmit = document.querySelector("#form") as HTMLFormElement;
const main_container = document.querySelector(".main_conatiner") as HTMLDivElement;

interface UserData{
    id:number;
    login:string;
    avatar_url:string;
    location:string;
    url:string;
}
const showResultUI = (singleuser:UserData)=>{
const {avatar_url,login,location,url} = singleuser;
    main_container.insertAdjacentHTML("beforeend",`
<div class="card">
    <img src="${avatar_url}" alt="${login}'s avatar" class="avatar"/>
    <h2>${login}</h2>
    <p>Location: ${location || "Not Available"}</p>
    <a href="${url}" target="_blank">View Profile</a>
</div>
`)
    
}

function fetchUserData(url:string){
    main_container.innerHTML = "";
    myCustomFetcher<UserData[]>(url,{}).then((userInfo)=>{
        for(let singleuser of userInfo){
            showResultUI(singleuser)
        }
    }).catch((error)=>{
        console.error(error);
        main_container.innerHTML = `<p class="error">Unable to load data. Please try again later.</p>`;
    });
    
}
// reusable function to fetch data from any url
async function myCustomFetcher<T>(url:string,options?:RequestInit): Promise<T>{
    const response = await fetch(url,options);
    if(!response.ok){
        throw new Error(`Failed to fetch data from ${url}, status: ${response.status}`);
    }
    const data = await response.json();
    return data as T;
    
}

fetchUserData("https://api.github.com/users");