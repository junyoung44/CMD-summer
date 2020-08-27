
var express = require('express')
var app = express()
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var sanitizeHtml = require('sanitize-html');
var template = require('./lib/template.js');

app.use(express.static('public'));

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name : String,
    student_num : Number,
    username: String,
    password: String
  });

//greeting page
app.get('/', function(request, response){
  fs.readdir('./data', function(error, filelist){
    var title = 'Greeting';
    var style = `body{
      margin : 2%;
      background-color: #AED6F6;
  }
  #banner {
      background-image: url("/image/com.png");
      background-repeat : no-repeat;
      background-position: center top;


      margin:0 auto;
      height :28rem;

      color :azure;
      text-align :center;
      font-family: 'Nanum Gothic', sans-serif;
      
      }

  #membership {
      padding:2rem;
      
      display : table;
      margin-left:auto;
      margin-right:auto;
  }
  .btn{

      height:3rem;
      width: 8rem;
      border : 0.1rem solid #CDD7DE;
      border-radius:10px;
      background-color: azure;
      box-shadow: 0 9px #999;

      
      font-family: 'Nanum Gothic', sans-serif;
      font-size:1.5rem;
      color:#202020;
  }

  .btn:hover{
      
      background-color:#CDD7DE;
      box-shadow: 0.5px #666;
      transform: translateY(4px);
  }`;
    var body=`<div id="banner">
    <h1 style="padding-top: 6rem; margin-bottom:0.5rem; font-size: 3rem;">컴퓨터교육과 </h1>
    <br>
    <h1 style="margin-top : 0">computer education</h1>
</div>
    
<div id="membership">
    <span>
        <button class="btn" onclick="location.href='/signin'" style='margin-right:6rem;'>로그인</button>
    </span>
    <span>
        <button class="btn" onclick="location.href='/signup'">회원가입</button>
    </span>
</div>`;
    var html=template.HTML(title, style,'', body,'');
    response.send(html);
  });
});

//signin page
app.get('/signin', function(request, response){
  fs.readdir('./data', function(error, filelist){
    var title = 'Sign-in';
    var style = `body{
      margin : 2%;
      background-color: #AED6F6;
      
      font-family: 'Nanum Gothic', sans-serif;
      color :#202020;
  }
  #login {
      background-color :azure;
      margin-top:6rem;
      margin:0 auto;
      border: 1rem solid #CDD7DE;
      padding : 2rem;
      width : 20rem;
      text-align: left;
      margin-top:3rem;


  }
  #submit{
      background-color:#CDD7DE;
      border:none;

      width:5rem;
      height:2rem;

      
      font-family: 'Nanum Gothic', sans-serif;
      color :#202020;

  }

  #submit:hover{
      background-color:#AED6F6;
  }`;
    var body=`<div id="login">
    <form action="/login", method="post">
        <h1>로그인</h1><br>
        <p id="id">
            아이디<br><br><input type="text" name="id">
        </p>
        <p id="password">
            비밀번호<br><br><input type="password" name="password">
        </p>
        <br>
        <p>
            <input id='submit' type="submit" value = "로그인" onclink="location.href='메인페이지.html'">
        </p>
        <p style="font-size: 0.6rem;">
            아직 회원이 아니신가요? <a href='/signup'>회원 가입</a>
        </p>
    </form>
</div>`;
    var html=template.HTML(title, style,'', body,'');
    response.send(html);
  });
});

//signup page
app.get('/signup', function(request, response){
  fs.readdir('./data', function(error, filelist){
    var title = 'Sign-up';
    var style = `body{
      margin : 2%;
      background-color: #AED6F6;
      
      font-family: 'Nanum Gothic', sans-serif;
      color :#202020;
  }
  #register{
      
      background-color :azure;
      margin-top:6rem;
      margin:0 auto;
      border: 1rem solid #CDD7DE;
      padding : 2rem;
      width : 20rem;
      text-align: left;
      margin-top:3rem;
  }
  #submit{
      background-color:#CDD7DE;
      border:none;

      width:5rem;
      height:2rem;

      
      font-family: 'Nanum Gothic', sans-serif;
      color :#202020;

  }

  #submit:hover{
      background-color:#AED6F6;
  }`;
    var body=` <div id="register">
    <form action="/logup" method="post">
        <a  href='/main'><h1>회원 가입</h1></a>
        
        <p>
            이름 <br></bt><input type="text" name="name"><br>
        </p>
        <p>
          학번<br><input type="text" name="student_num"><br> 
        </p>
        <p>
            아이디<br><input type="text" name="username"><br> 
        </p>
        <p>
            비밀번호<br><input type="password" id="passwrd" name="password"><br>
        </p>
        <p>
            비밀번호 확인<br><input type="password" id="psswrd"><br>
        </p>

        <p>
            <input id='submit' type='submit' value = "제출"><br>
            <script>
                var a=document.getElementByID('passwrd');
                var b=document.getElementByID('psswrd');
                var c=documnet.getElementByID('submit');
                c.addEventListener('click', function(){
                    if (a!=b){
                        alert('비밀번호를 확인해주세요.');
                    }
                    else{
                        form.submit;
                    }
                })
                
            </script>
        </p>
    </form>
</div>`;
    var html=template.HTML(title, style, '', body, '');
    response.send(html);
  });
});


app.get('/login', function(request, response) { 
    response.end();
  });

app.get('/logup', function(request, response) { 
    response.end();
  });

  //메인 페이지
app.get('/main', function(request, response) { 
    fs.readdir('./data', function(error, filelist){
      var title = 'Home';
      var style = `body{
        margin : 2%;
        background-color:#AED6F6;   
     
        font-family: 'Nanum Gothic', sans-serif;
        color :#202020;
    }
    #wrap{
        width:80%;
        background-color: azure;
        margin:0 auto;
        margin-top:10%;
        padding : 2rem;
    }
    
    .menu{
        display:inline-block;
        width:49%;
    }

    .banner {
        background-image: url("/image/com.png");
        background-repeat : no-repeat;
        background-position: center top;
        background-size : 15rem;

        margin:0 auto;
        height :15rem;
        

        color :azure;
        text-align :center;
        font-family: 'Nanum Gothic', sans-serif;
        font-size : 4rem;
        
    }

    .btn{
        display: block;
        height:3rem;
        width: 8rem;
        border : 0.1rem solid #CDD7DE;
        border-radius:10px;
        background-color: azure;
        box-shadow: 0 9px #999;


        margin:0 auto;
        font-family: 'Nanum Gothic', sans-serif;
        font-size:1.5rem;
        color:#202020;
        }

    .btn:hover{

        background-color: #CDD7DE;
        box-shadow: 0.5px #666;
        transform: translateY(4px);
    }`;
      var list = '';
      var body=`<div id="wrap">

      <span class='menu'>
          <div class="banner">
              <h1 style="padding-top: 3rem; margin-bottom:0.5rem; font-size: 1.5rem;">재학생 게시판 </h1>
          </div>
          <div>
              <button class="btn" onclick="location.href='/student'"><<</button>
          </div>
      </span>
 
      <span class='menu'>
          <div class="banner">
              <h1 style="padding-top: 3rem; margin-bottom:0.5rem; font-size: 1.5rem;">졸업생 게시판 </h1>
          </div>
          <div>
              <button class="btn" onclick="location.href='/graduate'">>></button>
          </div>
      </span>
 
 </div>
  `;
  var html=template.HTML(title, style, '', body, ''); 
      response.send(html);
    });
});  

//재학생 게시판
app.get('/student', function(request, response) { 
    fs.readdir('./data', function(error, filelist){
      var title ='재학생 게시판';
      var style=`body{
        margin : 2%;
        background-color: azure;

        font-family: 'Nanum Gothic', sans-serif;
        color :#202020;
    }

    #wrap{
        border-radius :20px;
        border : 3rem solid #CDD7DE;
        padding-bottom : 2rem;

        background-color:#AED6F6;
    }

    #title{
        margin-top: 2rem;
        margin-bottom : 2rem;

        font-size: 3rem;
        text-align: center;
    }
    
    .btn{
        height:2rem;
        width: 6rem;
        border : 0.1rem solid #CDD7DE;
        border-radius:10px;
        background-color: azure;
        box-shadow: 0 9px #999;


        margin:0 auto;
        font-family: 'Nanum Gothic', sans-serif;
        font-size:1.5rem;
        color:#202020;
        }

    .btn:hover{

        background-color: #CDD7DE;
        box-shadow: 0.5px #666;
        transform: translateY(4px);
    }
`;
      var list = template.list(filelist);
      var body=`<div id='wrap'>
      <div id='title'>
          재학생 게시판
      </div>
      <div style="padding:1rem;">
          <button class="btn" onclick="location.href='/write'">글쓰기</button>
      </div>
      
      

  </div>`;
      var html = template.HTML(title, style,list, body,''); 
      response.send(html);
    });
  });

app.get('/write', function(request, response){
    fs.readdir('./data', function(error, filelist){
      var title = '재학생 글쓰기';
      var style=`body{
        margin : 2%;
        background-color: azure;

        font-family: 'Nanum Gothic', sans-serif;
        color :#202020;
    }

    #wrap{
        border-radius :20px;
        border : 3rem solid #CDD7DE;
        padding-bottom : 2rem;

        background-color:#AED6F6;
    }

    #title{
        margin-top: 2rem;
        margin-bottom : 2rem;

        font-size: 3rem;
        text-align: center;
    }
    .btn{
        display : block;
        height:1.5rem;
        width:4.5rem;
        border : 0.1rem solid #CDD7DE;
        border-radius:10px;
        background-color: azure;
        box-shadow: 0 9px #999;


        margin:0 auto;
        font-family: 'Nanum Gothic', sans-serif;
        font-size:1rem;
        color:#202020;
        }

    .btn:hover{

        background-color: #CDD7DE;
        box-shadow: 0.5px #666;
        transform: translateY(4px);
    }    

    #notepad{
        width: 50%;
        margin:0 auto;
    }`
      var list = ''
      var body=`<div id='wrap'>
      <div id='title'>
          재학생 게시판
      </div>
      <div id='notepad'>
          <form action="/create_process" method="post">
              <p><input type="text" name="title" placeholder="제목" style="width : 100%; border : 5px solid #CDD7DE;
                  border-radius : 5px;"></p>
              <p>
                <textarea name="description" placeholder="내용" style="width : 100%; height: 10rem; border : 5px solid #CDD7DE;
                border-radius : 5px;"></textarea>
              </p>
              <p>
                  <button class="btn" type="submit" formaction="/create_process">글쓰기</button>
              </p>
            </form>
      </div>
      

  </div>`;
      
      var html = template.HTML(title, style,list, body, '');
      response.send(html);
    });
});

app.post('/create_process', function(request, response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        })
    });
  });

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});