document.getElementById("searchitem").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("searchButton").click();
    }
});
        function addDiv(i){
            $(`<div class='col-md-2 box' id='div_${i}' state='0' onmouseover='showPause(this.id)' onmouseout='hidePause(this.id)'><img id='image_${i}' src='' props='' style='width:100%' ><div class='play' id='button_${i}' style='display:none;' onclick='playPause(this.id)'></div></div>`).appendTo(".infinite");        
        }
        function addSrc(content, i, j){
            document.getElementById("image_"+i).src=content.data[j].images.downsized.url;
            document.getElementById("image_"+i).props=content.data[j].images.fixed_height_still.url;
            document.getElementById("div_"+i).state="1";
        }
        function searchFunction(){
            var list = document.getElementById("infinite"); 
            while(list.childNodes.length>0)
            list.removeChild(list.childNodes[0]);
            document.getElementById('wait').style.display="block";
            document.getElementById('infinite').abc="1";
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
                addDiv(i);
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
                document.getElementById('wait').style.display="none";
                for ( var i = 0; i < 15; i+=1){
                    addSrc(content, i, i);
                }
                document.getElementById("searchButton").disabled = false;
                document.getElementById("randomButton").disabled = false;
                document.getElementById('searchitem').value="";
            })
            .catch((err)=>console.log(err));
            }
        function showPause(img_id){
            img_id = img_id.split("_")[1];
            var div_id="div_"+img_id;
            var image_id="image_"+img_id;
            img_id = "button_"+img_id;
            if(document.getElementById(div_id).state=="1"){
                document.getElementById(image_id).style.transform="scale(1.5)";
                document.getElementById(img_id).style.display="block";
            }
        }
        function hidePause(img_id){
            img_id = img_id.split("_")[1];
            var image_id="image_"+img_id;
            img_id = "button_"+img_id;
            document.getElementById(image_id).style.transform="scale(1.0)";
            document.getElementById(img_id).style.display="none";
        }
        function playPause(div_id){
            div_id = div_id.split("_")[1];
            div_id = "image_"+div_id;
            var temp=document.getElementById(div_id).src;
            document.getElementById(div_id).src=document.getElementById(div_id).props;
            document.getElementById(div_id).props=temp;
        }
        function randomFunction() {
            var list = document.getElementById("infinite"); 
            while(list.childNodes.length>0)
            list.removeChild(list.childNodes[0]);
            //document.getElementById("gif").src="img/loading.webp";
            // document.getElementById('gif').style.display="none";
            // document.getElementById('loader_img').style.display="block";
            //document.getElementById('gif').style.display='block';
            // document.getElementById('gif').state="1";
            document.getElementById('wait').style.display="block";
            document.getElementById('infinite').abc="0";
            var url="https://api.giphy.com/v1/gifs/random?&api_key=EIkbwVRNCK8YVEfOVdMHG3ujfSCFjGVO&limit=1";    
            fetch(url)
            .then(response=>response.json())
            .then(content=>{
                console.log(content.data);
                document.getElementById('wait').style.display="none";
                $("<div class='col-md-4' ><img src="+content.data.images.downsized.url+"props="+content.data.images.fixed_height_still.url+" style='width:100%'" + "' ></div>").appendTo(".infinite");        

                // document.getElementById("gif").src = content.data.images.downsized.url;
                // document.getElementById("gif").props =content.data.images.fixed_height_still.url;
                // document.getElementById('loader_img').style.display="none";
                // document.getElementById('gif').style.display='block'; 
            })
.catch((err) => alert(err));
} 