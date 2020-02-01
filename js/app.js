var instruccion = 'Para revisar cada contenido, pulsa en el título correspondiente.';

/* Create Stage */
function createStage(){
  myapp.innerHTML += '<div class="row"><div class="col-10 mx-auto" id="logomain"></div></div><div id="menu1" class="row justify-content-center"><div class="col-12 intro"><p>Selecciona el negocio al que deseas ingresar</p></div></div><div id="menu2"></div><div id="menu3"></div><!--BASE MODAL WINDOW--><div class="modal fade" id="modal0" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;" aria-hidden="true"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header"><span id="elheader"></span><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div><div class="modal-body pb-5" id="modalbody">test</div></div></div></div><!--/ BASE MODAL WINDOW--><footer></footer>';
}

/* Show data from JSON file */
function appEngine(){
  var x = new XMLHttpRequest();
  x.open("GET", "js/data.json", true);
  x.send();
  x.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      /* First level navigation */
      createStage();
      for(i=0;i<myObj.data.length;i++) {
        menu1.innerHTML += '<div class="col-7 col-md-2 menu1_bt"><img src="img/logos/logo' + i + '.png" alt="" id="m' + i + '" onclick="createMap(' + i + ')"></div>';
      }
    }
  }
}
appEngine();

/* Close Windows */
function toclose(menutoclose, submenutohide, submenutoshow){
  var menutoclose = document.getElementById(menutoclose);
  menutoclose.innerHTML = '';
  menutoclose.style.display = 'none';
  document.getElementById(submenutohide).style.display = 'none';
  document.getElementById(submenutoshow).style.display = 'block';
}

/* Go Home */
function closeall(){
  menu1.style.display = 'flex';
  menu2.style.display = 'none';
  menu3.style.display = 'none';
}
function closem2b(){
  menu2b.style.display = 'none';
  menu2a.style.display = 'block';
  menu3.style.display = 'block';
}

/* Download documents */
function download(doc){
  var doc = 'docs/' + doc
  window.open(doc);
}

/* Show second level navigation maps */
function createMap(mapElmnt){
  menu1.style.display = 'none';
  var x = new XMLHttpRequest();
  x.open("GET", "js/data.json", true);
  x.send();
  x.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      /* Second level navigation */
      menu2.innerHTML = '<button class="closer xls mt-2" onclick="download(\'presupuesto.xlsx\')"><i class="fa fa-file-excel-o"></i></button><button class="closer" onclick="closeall()"><i class="fa fa-home"></i></button><div id="menu2a_mob"></div><div id="menu2a"></div><div id="menu2b"></div>';
      menu2a.innerHTML += '<img class="maplogo" src="img/logos_white/logo' + mapElmnt + '.png">';
      menu2b.innerHTML += '<button class="closer cross" onclick="closem2b()"><i class="fa fa-close"></i></button><div class="row d-flex align-items-center"><div class="col-md-6 text-center"><img class="maplogo big" src="img/logos_white/logo' + mapElmnt + '.png"><button class="closer pink" onclick="closeall()"><i class="fa fa-home"></i></button></div><div id="menu2list" class="col-md-6"></div></div>';
      menu2a_mob.innerHTML = '<ul class="maplist"></ul>';
      for(i=0;i<myObj.data[mapElmnt].contenidos.length;i++) {
        menu2a.innerHTML += '<div class="mapspot ms ms' + i + '" id="ms' + mapElmnt + i + '" onclick="openLnks(' + mapElmnt + ',' + i + ')">' + myObj.data[mapElmnt].contenidos[i].name; + '</div>';
        menu2list.innerHTML += '<div onclick="openLnks(' + mapElmnt + ',' + i + ')">' + myObj.data[mapElmnt].contenidos[i].name; + '</div>';
        menu2a_mob.innerHTML += '<li onclick="openLnks(' + mapElmnt + ',' + i + ')"><img src="img/mapicons/ico.svg">' + myObj.data[mapElmnt].contenidos[i].name; + '</li>';
      }
      menu2b.style.display = 'none';
    }
  }
  menu2.style.display = 'block';
}

/* Show third level links for each content */
function openLnks(sub,lst){
  menu1.style.display = 'none';
  menu3.innerHTML = '<button class="closer" onclick="closeall()"><i class="fa fa-home"></i></button><button class="navicon" onclick="toclose(\'menu2a\',\'menu3\',\'menu2b\')"><i class="fa fa-navicon"></i></button><div class="row"><div id="menu3title" class="col-12 col-md-5 bg'+sub+lst+'"></div><div id="menu3links" class="col-12 col-md-7 pl-3"><p id="objetivo"></p><p class="instrucc">' + instruccion + '</p></div></div>';
  var x = new XMLHttpRequest();
  x.open("GET", "js/data.json", true);
  x.send();
  x.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      /* Third level navigation */
      for(i=0;i<myObj.data[sub].contenidos[lst].elmnts.length;i++) {
        if(myObj.data[sub].contenidos[lst].elmnts[i].tiempo != ''){
          var tiempo = '<span class="tmpo tmpo_borders">' + myObj.data[sub].contenidos[lst].elmnts[i].tiempo + '</span>';
        }else{
          var tiempo = '<span class="tmpo"></span>';
        } 
        if(myObj.data[sub].contenidos[lst].elmnts[i].obligatorio){
          var right = 'obligatorio';
        }else{
          var right = 'opcional';
        }
        objetivo.innerHTML = '<b>Objetivo</b>: ' + myObj.data[sub].contenidos[lst].objetivo;
        menu3title.innerHTML = '<img class="titlespot" src="img/mapicons/ico.png"><h1>' + myObj.data[sub].contenidos[lst].name + '</h1>';
        if(myObj.data[sub].contenidos[lst].elmnts[i].url == '' && myObj.data[sub].contenidos[lst].elmnts[i].modal == ''){
        }
        else if(myObj.data[sub].contenidos[lst].elmnts[i].url != ''){
          menu3links.innerHTML += '<a class="' + right + ' sublist t' + myObj.data[sub].contenidos[lst].elmnts[i].tipo + '" id="sub' + sub + lst + '" href="' + myObj.data[sub].contenidos[lst].elmnts[i].url + '" target="_blank">' + tiempo + myObj.data[sub].contenidos[lst].elmnts[i].label +'</a>';
        }else{
          menu3links.innerHTML += '<a class="lmore ' + right + ' sublist t' + myObj.data[sub].contenidos[lst].elmnts[i].tipo + '" id="sub' + sub + lst + '"data-toggle="modal" data-target="#modal0" data-title="' + myObj.data[sub].contenidos[lst].name + '" data-content="' + myObj.data[sub].contenidos[lst].elmnts[i].modal + '">' + tiempo + myObj.data[sub].contenidos[lst].elmnts[i].label + '</a>';
        }
      }
      var lmores = document.getElementsByClassName('lmore');
      for (i=0; i<lmores.length; i++) {
        lmores[i].addEventListener('click', function(){
          var contenido = this.dataset.content;
          var titulo = this.dataset.title;
          var modalbody = document.getElementById('modalbody');
          var elheader = document.getElementById('elheader');
          modalbody.innerHTML = contenido;
          elheader.innerHTML = titulo;
        });  
      }
    }
  }
  menu3.style.display = 'block';
}
