//using fetch API 
fetch("http://localhost:3000/tests",
{
    headers: {
        'Authorization': 'Basic YWRtaW46dGVzdA==',//Basic auth for api base 64 encoded
        'Accept': 'application/json',
         //'Content-Type': 'multipart/form-data'
    }
})
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
<td class="px-5 py-3 border border-slate-700"><a href='http://localhost:3000/delete_tests/${datas.id}' style="background:#ea4949;padding:10px;color:white;border-radius:50px;font-size:12px;width:400px;">Remove</a></td>
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


