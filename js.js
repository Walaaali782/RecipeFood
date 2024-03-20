// www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
//www.themealdb.com/api/json/v1/1/lookup.php?i=52772


//setup var
let searchinput = document.querySelector(".search-input");

let searchbutton = document.querySelector("#search-button");

let resultarea = document.querySelector(".result-area");

let recipedetails = document.querySelector(".recipe-details");

//event 
searchbutton.addEventListener('click',getRecipes);
resultarea.addEventListener('click',detailrecipe);
recipedetails.addEventListener('click',chose);


function getRecipes() {

let searchitem = searchinput.value.trim();
let apiurl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchitem}`;


fetch(apiurl)
.then(( res ) => {
    if(res.ok){
        return res.json();
    }
   
})
.then((data) => {
  displayrecipe(data);
})
}

function displayrecipe(reple) {
    resultarea.innerHTML = " ";
     if(reple.meals == null ){
        resultarea.innerHTML = "No Data";
        return;
     }

     reple.meals.forEach((e) => {
          resultarea.innerHTML += 
          `<div class="card">
<div class="card-img">
         <img src="${e.strMealThumb}" alt=" ">
</div>
<div class="card-info">
    <h2>${e.strMeal}</h2>
    <a href="#" class="getrecipe" data-id="${e.idMeal}"> Get Recipe</a>
</div>
</div>  `
  });
}

function detailrecipe(p) {
    if(p.target.classList.contains('getrecipe')){
        console.log(p.target.getAttribute("data-id"));
        let id = p.target.getAttribute("data-id");
        let papi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;



fetch(papi)
.then(( res ) => {
    if(res.ok){
        return res.json();
    }
   
})
.then((data) => {
  displayrecipedatails(data);
})
    }

}

function displayrecipedatails(kl){
    // console.log(kl);
    let item = kl.meals[0];
    recipedetails.classList.remove('showdetalis');
    console.log(item);
    recipedetails.innerHTML="";


    recipedetails.innerHTML=
    ` <i class="fa-solid fa-xmark"></i>
    <h2> ${item.strMeal} </h2>
    <p> Instructions :</p>
    <p>  ${item.strInstructions} </p>

    <a href="${item.strYoutube}"> Watch Video</a>
    `;

} 

 function chose(o){
    if(o.target.classList.contains('fa-xmark')){
        o.target.parentElement.classList.add('showdetalis');
           }

 }





