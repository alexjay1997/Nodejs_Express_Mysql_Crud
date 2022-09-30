//using fetch API 
fetch("http://localhost:3000/tests")
            .then(res => res.json())
            .then(data => {
             console.log(data);
             var outputdata="";
                    
     //loop start
data.forEach((datas)=>{
    var img = new Image();
  
    outputdata += `
<tr>
<td class="px-5 py-3 border border-slate-700">${datas.id}</td>
<td class="px-5 py-3 border border-slate-700">${datas.name}</td>
<td class="px-5 py-3 border border-slate-700">${datas.age}</td>
<td class="px-5 py-3 border border-slate-700">${datas.address}</td>
<td class="px-5 py-3 border border-slate-700"><a href='http://localhost:3000/delete_tests/${datas.id}'>Delete</a></td>
</tr>                 
    `;                     

})
document.getElementById("data").innerHTML= outputdata;//append data to html file
})












// const api_url = 
//       "http://localhost:3000/tests";
  
// // Defining async function
// async function getapi(url) {
    
//     // Storing response
//     const response = await fetch(url);
    
//     // Storing data in form of JSON
//     var data = await response.json();
//     console.log(data);
//     if (response) {
 
//     }
//     show(data);
// }
// // Calling that async function
// getapi(api_url);
  

// // Function to define innerHTML for HTML table
// function show(data) {
//     let tab =''; 
//         // `<tr>
//         //   <th>ID</th>
//         //   <th>Name</th>
//         //   <th>Age</th>
//         //   <th>Address</th>
//         //  </tr>`;
    
//     // Loop to access all rows 
//     for (let row of data) {
//         tab += `<tr> 
//     <td>${row.id} </td>
//     <td>${row.name}</td>
//     <td>${row.age}</td> 
//     <td>${row.address}</td>          
// </tr>`;
//     }
//     // Setting innerHTML as tab variable
//     document.getElementById("data").innerHTML = tab;
// }


