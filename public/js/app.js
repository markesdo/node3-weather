const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//messageOne.textContent = "Test";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); //Stops refreshing the page after submit
  const location = search.value;
  messageOne.textContent = "Loading";
  messageTwo.textContent = "";
  fetch("http://127.0.0.1:3000/weather?address=" + location).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.Temperatur;
        // console.log(data.location);
        // console.log(data.Temperatur);
        // console.log(data.Humdity);
      }
    });
  });

  console.log(location);
});
