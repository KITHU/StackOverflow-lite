function loadRecent(){
    let recentquest = ["The point of using Lorem Ipsum is that it has a more-or-less normal \
    distribution of letters, as opposed to using 'Content here",
    "The point of using Lorem Ipsum is that it has a more-or-less normal \
    distribution of letters, as opposed to using 'Content here",
    "The point of using Lorem Ipsum is that it has a more-or-less normal \
    distribution of letters, as opposed to using 'Content here",
    "The point of using Lorem Ipsum is that it has a more-or-less normal \
    distribution of letters, as opposed to using 'Content here",
    "The point of using Lorem Ipsum is that it has a more-or-less normal \
    distribution of letters, as opposed to using 'Content here"
    ];

let recent = '';
for(let i=0;i<recentquest.length;i++){
    recent +=`<p>${recentquest[i]}</p>`
    console.log(recentquest[i])
}
document.getElementById('questionsdashboard').innerHTML=recent 
}


function loadMostAnswered(){
    let recentquest = ["The point of using Lorem Ipsum is that it has a more-or-less normal \
    distribution of letters, as opposed to using 'Content here",
    "The point of using Lorem Ipsum is that it has a more-or-less normal \
    distribution of letters, as opposed to using 'Content here",
    "The point of using Lorem Ipsum is that it has a more-or-less normal \
    distribution of letters, as opposed to using 'Content here",
    "The point of using Lorem Ipsum is that it has a more-or-less normal \
    distribution of letters, as opposed to using 'Content here",
    "The point of using Lorem Ipsum is that it has a more-or-less normal \
    distribution of letters, as opposed to using 'Content here"
    ];

let recent = '';
for(let i=0;i<recentquest.length;i++){
    recent +=`<p>${recentquest[i]}</p>`
    console.log(recentquest[i])
}
document.getElementById('questionsdashboard').innerHTML=recent 
}