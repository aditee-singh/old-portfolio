    document.getElementById("searchitem").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("searchButton").click();
        }
    });
            function searchFunction(){
                document.getElementById('gif').style.display="none";
                document.getElementById('loader_img').style.display="block";
                document.getElementById("searchButton").disabled = true;
                document.getElementById("randomButton").disabled = true;
                document.getElementById('gif').state="1";
                //document.getElementById("gif").src="img/loading.webp";
                //document.getElementById('gif').style.display='block';
                var giphy_name=document.getElementById("searchitem").value;
                var url="https://api.giphy.com/v1/gifs/search?api_key=EIkbwVRNCK8YVEfOVdMHG3ujfSCFjGVO&q="+giphy_name+"&limit=1";
                console.log(url);
                fetch(url)
                .then(response=>response.json())
                .then(content=>{     
                    console.log(content.data)
                    document.getElementById("gif").src=content.data[0].images.downsized.url;
                    document.getElementById("gif").props=content.data[0].images.fixed_height_still.url;
                    document.getElementById("searchButton").disabled = false;
                    document.getElementById("randomButton").disabled = false;
                    document.getElementById('loader_img').style.display="none";
                    document.getElementById('gif').style.display='block';
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
                document.getElementById('gif').style.display="none";
                document.getElementById('loader_img').style.display="block";
                //document.getElementById('gif').style.display='block';
                document.getElementById('gif').state="1";
                var url="https://api.giphy.com/v1/gifs/random?&api_key=EIkbwVRNCK8YVEfOVdMHG3ujfSCFjGVO&limit=1";    
                fetch(url)
                .then(response=>response.json())
                .then(content=>{
                    console.log(content.data);
                    document.getElementById("gif").src = content.data.images.downsized.url;
                    document.getElementById("gif").props =content.data.images.fixed_height_still.url;
                    document.getElementById('loader_img').style.display="none";
                    document.getElementById('gif').style.display='block'; 
                })
  .catch((err) => alert(err));
} 
