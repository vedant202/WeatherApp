console.log("Hello world")

const title = document.getElementById('title');
let temprature = document.getElementById("temprature")
let cards = document.getElementById('cards');
let thead = document.getElementById('thead');

let keys = [
    "cloud_pct",
  "temp",
  "feels_like",
  "humidity",
  "min_temp",
  "max_temp",
  "wind_speed",
  "wind_degrees",
  "sunrise",
  "sunset"
]

const cardInnerHtml=(data)=>{
    let card ="";
    if(data === null)
    {
        for(let i=0;i<keys.length;i++){
            card+=`<div class="card card1 mx-3">
            <div class="card-body">
              <h5 class="card-title">${keys[i]}</h5>
              <p id="temprature" class="card-text">${undefined}</p>
              
            </div>
        </div>` 

        }
    }
    else{
        card+= Object.keys(data).map((k,i)=>{
            
            return `<div class="card card1 mx-3">
            <div class="card-body">
              <h5 class="card-title">${keys[i]}</h5>
              <p id="temprature" class="card-text">${data[k]}</p>
              
            </div>
        </div>`});
    }
    

    cards.innerHTML = card;
}

const fetchData = async(city)=>{
    let postdata = await fetch("http://127.0.0.1:3000/weatherData",{
        method:"POST",
        body:JSON.stringify({"city":city}),
        headers:{
            'Content-Type': "application/json",
        }
    })
    const response = await postdata.json()
    return response.weather;
}


// cardInnerHtml(null);
fetch("http://127.0.0.1:3000/weatherData",{
    method:'GET',
    headers:{
        'Content-Type': "application/json",
    }
    
}).then((res)=>{
    
    return res.json();
}).then((data)=>{
    data = data.weather;
    cardInnerHtml(data);
   
    console.log(typeof data);
    // temprature.innerText = data.temp;
    
    
})
let rows = `<tr><th scope="col">City</th>`;
rows+=keys.map((k)=>{
    return `<th scope="col">${k}</th>`
})
rows += "</tr>"
rows = rows.replace(/,/g,"");
console.log(rows)

thead.innerHTML = rows;

let cities = ['Nagpur','Pune','Mumbai','Yavatmal']
let tbody = document.getElementById("tbody")
let table_body = "";

cities.forEach(async(k)=>{
    table_body+=`<tr >`;
    let w = await fetchData(k);
    table_body+=`<th scope="row">${k}</th>`;
    console.log(k,w)
    table_body += Object.keys(w).map((i)=>{
        
        return `
        <td>${w[i]}</td>`
        
      
    })
    table_body += `</tr>`;
    table_body = table_body.replace(/,/g,"");
    tbody.innerHTML = table_body;
    
    // console.log(table_body)
})

// tbody.innerHTML = table_body;



let searchBtn = document.getElementById("searchBtn")
searchBtn.addEventListener("click",async(e)=>{
    e.preventDefault();
    let searchText = document.getElementById("search")
    console.log(searchText.value);
    console.log(JSON.stringify({"city":searchText.value}));
    title.innerText =`Weather Data for ${searchText.value.toUpperCase()}` 
    let postdata = await fetch("http://127.0.0.1:3000/weatherData",{
        method:"POST",
        body:JSON.stringify({"city":searchText.value}),
        headers:{
            'Content-Type': "application/json",
        }
    })
    const response = await postdata.json()
    const data = response.weather;
    cardInnerHtml(data);
    console.log(data)

})