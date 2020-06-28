document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("button").addEventListener('click', () => {
        $ajaxUtils.sendGetRequest("name.json", res => {
            var name = res.firstName + res.LastName;
            document.getElementById("main").innerHTML = `<h1>Hey ${name}</h1>`;
        }, true)
    })
})