document.getElementById("searchitem").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("searchButton").click();
    }
});
        function searchFunction(){
            document.getElementById("searchButton").disabled = true;
            document.getElementById("randomButton").disabled = true;
            var giphy_name=document.getElementById("searchitem").value;
            if(giphy_name.length==0){
                alert("No search item");
                return;
            }
            var skip_gif=0;
            document.getElementById('infinite').count=15;
            document.getElementById('infinite').searched=giphy_name;
            for ( var i = 0; i < 15; i+=1){
                $("<div class='col-md-2'><img id=image_"+i+" src='img/loader_img.gif' style='width:100%'" + "' ></div>").appendTo(".infinite");        
            }
            var url="https://api.giphy.com/v1/gifs/search?api_key=EIkbwVRNCK8YVEfOVdMHG3ujfSCFjGVO&q="+giphy_name+"&limit=15";
            console.log(url);
            fetch(url)
            .then(response=>response.json())
            .then(content=>{     
                console.log(content.data)
                //alert(content.data.length);
                if(content.data.length==0){
                    //$(".infinite").empty();
                    var list = document.getElementById("infinite"); 
                    while(list.childNodes.length>0)
                    list.removeChild(list.childNodes[0]);
                    document.getElementById("searchButton").disabled = false;
                    document.getElementById("randomButton").disabled = false;
                    document.getElementById('searchitem').value="";    
                    alert("Invalid Search");
                    return;
                }
                for ( var i = 0; i < 15; i+=1){
                    document.getElementById("image_"+i).src=content.data[i].images.downsized.url;
                    document.getElementById("image_"+i).props=content.data[i].images.fixed_height_still.url;
                }
                document.getElementById("searchButton").disabled = false;
                document.getElementById("randomButton").disabled = false;
                document.getElementById('searchitem').value="";
            })
            .catch((err)=>console.log(err));
            }
        function showPause(){
            if(document.getElementById('gif').state=="1"&&document.getElementById('loader_img').style.display=="none"){
                console.log('hi');
                //document.getElementById('playpause').src="img/pause.png";  
                document.getElementById('playpause').style.display="block";
            }
        }
        function hidePause(){
            document.getElementById('playpause').style.display='none';
        }
        function playPause(){
            var temp=document.getElementById("gif").src;
            document.getElementById("gif").src=document.getElementById("gif").props;
            document.getElementById("gif").props=temp;
        }
        function randomFunction() {
            //document.getElementById("gif").src="img/loading.webp";
            // document.getElementById('gif').style.display="none";
            // document.getElementById('loader_img').style.display="block";
            //document.getElementById('gif').style.display='block';
            // document.getElementById('gif').state="1";
            var url="https://api.giphy.com/v1/gifs/random?&api_key=EIkbwVRNCK8YVEfOVdMHG3ujfSCFjGVO&limit=1";    
            fetch(url)
            .then(response=>response.json())
            .then(content=>{
                console.log(content.data);
                $("<div class='col-md-4'><img src="+content.data.images.downsized.url+"props="+content.data.images.fixed_height_still.url+" style='width:100%'" + "' ></div>").appendTo(".infinite");        

                // document.getElementById("gif").src = content.data.images.downsized.url;
                // document.getElementById("gif").props =content.data.images.fixed_height_still.url;
                // document.getElementById('loader_img').style.display="none";
                // document.getElementById('gif').style.display='block'; 
            })
.catch((err) => alert(err));
} 