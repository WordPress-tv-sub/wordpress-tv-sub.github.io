


    var repo_open = new Array(),
        repo_close = new Array();

$.ajax({
  type: 'GET',
  url: 'https://api.github.com/users/wordpress-tv-sub/repos',
  dataType: 'json',
  success: function(json){

    for(var i=0; i < json.length; i++){
      if(json[i].open_issues=="0"){
        repo_close.push(json[i]);
      }else{
        repo_open.push(json[i]);        
      }
    }

    var container = document.getElementsByClassName("repository")[0];
    container = create_h3(container,"has-opened-issue");


    var container_2 = document.createElement("div");
    container_2.className += "row repository",
    container.parentNode.appendChild(container_2),
    container2 = create_h3(container_2,"has-no-opened-issue");

    container = create_rows(repo_open,container);
    container_2 = create_rows(repo_close,container_2);


  }
});

function create_h3(container,innerHTML){
    var h3 = document.createElement("h3");
    h3.innerHTML = innerHTML;
    container.appendChild(h3);
    return container;
}


function create_rows(json,container){

      var div = new Array();
      
      for(var i=0; i < 2; i++){
        div[i] = document.createElement("div"),
        div[i].className += "col-xs-12 col-sm-6";
        container.appendChild(div[i]);
      }

      for(var i=0; i < json.length; i++){
        var col = create_repo_div(json[i]);
        if(i > json.length /2 -1){
        div[0].appendChild(col);
        }else{
        div[1].appendChild(col);
        }
      }

      return container;

}

function create_repo_div(json) {

      var div = document.createElement("div")

      // --- Add thumbnail image ---- //
      if(json.homepage){
        var img = document.createElement("img");
        img.setAttribute("src","http://s.wordpress.com/mshots/v1/"+json.homepage+"?w=500");
        img.style.cssText = "max-width:100%;margin:10px auto 0";
        div.appendChild(img);

      }

      // --- Add repository name ---- //
      var title = document.createElement("h4");
      title.innerHTML += '<a href="' + json.html_url + '">' + json.name + '</a>';
      div.appendChild(title);

      // --- Add description ---- //
      if(json.description){
        var p = document.createElement("p");
        p.innerHTML += json.description;
        div.appendChild(p);
      }

      // --- Add update date ---- //
      if(json.updated_at){
        var p = document.createElement("p");
        p.innerHTML += "Updated at " + json.updated_at.substr(0, 10);
        div.appendChild(p);
      }

      return div;
}
