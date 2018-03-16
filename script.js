getComments();
function getComments(){
    $.get("/comments", function (data) {
        if(!data){
            console.log("No data received");
            //alert( "No data received" );
        }
        console.log("Received data:");
        for(var i=0; i<data.length; i++){
            console.log(data[i].fullname);
            //alert( "No data received: " + data[i].fullname);
        }
        showComments(data);
    });
}

/*
    <section class="suggestion">
        <h3>Breana Deen</h3>
        <p>I enjoy eating sweet potatoes as a snack. I heat one in the microwave and then Top
            with maple syrup, chopped nuts and cinnamon.</p>
    </section>
*/

function showComments(comments){
    var commentsSection = document.getElementById("suggestions");
    for(var i=0; i<comments.length; i++){
        var section = document.createElement("section");
        section.className += "suggestion";
        var heading = document.createElement("h3");
        heading.innerHTML = comments[i].name;
        var comment = document.createElement("p");
        comment.innerHTML = comments[i].comment;
        section.appendChild(heading);
        section.appendChild(comment);
        commentsSection.appendChild(section);
    }
}