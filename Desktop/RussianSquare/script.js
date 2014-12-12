var bottom = new Array(12) //用于标记待消除方块位置及种类 x10 y16 0无 2有 3墙
for (var i = 0; i < 12; i++)
  { 
   bottom[i] = new Array(18);
   for (j=1;j<18;j++)
   	{bottom[i][j] = 0}
  }
for(i=1;i<17;i++)
  {
  	bottom[0][i] = 3;
  	bottom[11][i] = 3;
  }
for(i=0;i<12;i++)
{
	bottom[i][0] = 3;
}

var dropping = new Array(5) //用于存放下落方块坐标 5放置旋转中心
for (var i = 0; i < 5; i++)
  { 
   dropping[i] = new Array(2); //i0 x i1 y
   for (j=0;j<2;j++)
   	{dropping[i][j] = 0}
  }

  var dropping2 = new Array(5) //用于存放下落方块坐标 5放置旋转中心
for (var i = 0; i < 5; i++)
  { 
   dropping2[i] = new Array(2); //i0 x i1 y
   for (j=0;j<2;j++)
   	{dropping2[i][j] = 0}
  }

var start1 = 0 //游戏是否开始 y1 n0
var continue1 = 0 //游戏是否进行中 y1 n0
var r = 1000 //刷新时间
var type2 = 0; //待生成方块种类
var direction = 0; //待生成方块的方向
var s = 0; //得分
var le = 1;//级别

function clean() //清理
{
	//alert("clean()");
	start1 = 0 //游戏是否开始 y1 n0
    continue1 = 0 //游戏是否进行中 y1 n0
    r = 1000 //刷新时间
    type2 = 0; //待生成方块种类
    direction = 0; //待生成方块的方向
    s = 0;
    le = 1;
    for (var i = 0; i < 5; i++)
      { 
       dropping[i] = new Array(2); //i0 x i1 y
       for (j=0;j<2;j++)
       	{dropping[i][j] = 0}
      }

      for (var i = 0; i < 12; i++)
  { 
   bottom[i] = new Array(18);
   for (j=1;j<18;j++)
   	{bottom[i][j] = 0}
  }
for(i=1;i<17;i++)
  {
  	bottom[0][i] = 3;
  	bottom[11][i] = 3;
  }
for(i=0;i<12;i++)
{
	bottom[i][0] = 3;
}

    for (var i = 1; i < 11; i++) {
    	for (var j = 1; j < 17; j++) {
    		show(i,j,0);
    	};
    };
}

function start() //开始游戏
{
	//alert("start()");
	if (start1 == 0) //若游戏未开始
    {  	
        start1++;
        continue1++;
    	type2 = Math.floor(Math.random()*7);
	    direction = Math.floor(Math.random()*4);
	    creat();
    }
    else if(continue1 == 0)  //若游戏已开始且暂停
    {
    	continue1 = 1;
    }
    drop(); 
}

function drop() {
	if ((start1 == 1)&&(continue1 == 1)) //若游戏已开始且进行中
	{
	    drop1();
	    setTimeout("drop()",r);
    }
}

function pause() //暂停
{
	//alert("Press 'Yes' to continue.");
	continue1 = 0;
}

function lrmove(d) //左右移动
{
	//alert("lrmove()"+"d"+d);
	if ((start1 == 1)&&(continue1 == 1)) //若游戏已开始且进行中
	{
		//alert("Function is active!")
		var counter = 0;
		for (i = 0;i < 4;i++)
		{
			if (bottom[dropping[i][0] + d][dropping[i][1]] == 0) //若待移动方向无障碍
				{
					counter++ //计数器+1
				}
			else
				{
					break //前方有障碍
				}
		}
		if (counter == 4) //可以移动
		{
			dropping[4][0] = dropping[4][0] + d;
			for (i = 0;i < 4;i++) //逐个移动
			{
				show(dropping[i][0],dropping[i][1],0); //原来位置图像消除
				dropping[i][0] = dropping[i][0] + d; //新坐标
			}
			for (i = 0;i < 4;i++) //逐个更新图像
			{
				show(dropping[i][0],dropping[i][1],1); //新坐标图像更新
			}
		}
	}
}

function drop1() //下落
{
	if ((start1 == 1)&&(continue1 == 1)) //若游戏已开始且进行中
	{
	//alert("drop()");
	var counter = 0;
	for (i = 0;i < 4;i++)
		{
			//alert("a for loop");			
			if (bottom[dropping[i][0]][dropping[i][1] - 1] == 0) //若下方无障碍
				{
					counter++ //计数器+1
					//alert("++"+counter);
				}
				else
				{
					//alert(bottom[dropping[i][0]][dropping[i][1] - 1]+"break")
					break //前方有障碍
				}
		}
		if (counter == 4) //可以移动
		{
			dropping[4][1]--;
			for (i = 0;i < 4;i++) //逐个移动
			{
				show(dropping[i][0],dropping[i][1],0); //原来位置图像消除
				dropping[i][1]--; //新坐标
				//show(dropping[i][0],dropping[i][1],1); //新坐标图像更新
			    //alert("moving!"+i)
			}
			for (i = 0;i < 4;i++) //逐个移动
			{
				show(dropping[i][0],dropping[i][1],1); //新坐标图像更新
			}
		}
		else //不能移动，判断消除，生成新方块。
		{
			//alert("can not move");
			for (var i = 0; i < 4; i++) 
			{
				bottom[dropping[i][0]][dropping[i][1]] = 2; //添加新的待消除方块
				show(dropping[i][0],dropping[i][1],2);	//图像更新
			};
		    judge(); //判断是否消除
		    creat(); //生成新方块
		}	
    }	
}

function creat() //生成新方块
{
	//type2 = 6;
	//alert(type2+"creat()"+direction);
    dropping[4][0] = 6; //标记中心坐标
    dropping[4][1] = 15;
	switcher(type2,1); //根据种类生成方块，不转向
	for (var i = 0; i < direction; i++) //旋转多次后显示
	{
		turn(0)
	}
	type2 = Math.floor(Math.random()*7);
	direction = Math.floor(Math.random()*4);
	for (var i = 0; i < 4; i++) 
	{
		//alert();
		if (bottom[dropping[i][0]][dropping[i][1]] == 2) //不能生成方块
		{
			alert("Game over!\nYour final score is:\n"+s);
			clean();
			break;
		}
		
	}
	sscreen();
}
function switcher(typ,ty)
{
	switch (typ)
    {
		case 0: //生成L正
		creatx(0,6,16,ty);
		creatx(1,6,15,ty);
        creatx(2,6,14,ty);
        creatx(3,7,14,ty);
        break;

        case 1: //生成L反
		creatx(0,6,16,ty);
		creatx(1,6,15,ty);
        creatx(2,6,14,ty);
        creatx(3,5,14,ty);
        break;

        case 2: //生成Z反
		creatx(0,6,16,ty);
		creatx(1,6,15,ty);
        creatx(2,5,15,ty);
        creatx(3,7,16,ty);
        break;

        case 3: //生成Z正
		creatx(0,6,16,ty);
		creatx(1,6,15,ty);
        creatx(2,7,15,ty);
        creatx(3,5,16,ty);
        break;

        case 4: //生成T
		creatx(0,6,16,ty);
		creatx(1,6,15,ty);
        creatx(2,7,15,ty);
        creatx(3,5,15,ty);
        break;

        case 5: //生成口
		creatx(0,6,16,ty);
		creatx(1,6,15,ty);
        creatx(2,5,15,ty);
        creatx(3,5,16,ty);
        break;

        case 6: //生成I
		creatx(0,6,16,ty);
		creatx(1,6,15,ty);
        creatx(2,6,14,ty);
        creatx(3,6,13,ty);
        break;
	}
}
function creatx(i,x,y,ty)
{
	if (ty == 1) {
    	dropping[i][0] = x;
    	dropping[i][1] = y;
	    show(x,y,1);
	}
	else
	{
		dropping2[i][0] = x;
    	dropping2[i][1] = y;
	    showx(x,y,1);
	}    
}

function judge() //判断得分
{
	//alert("judge()");
	var max = 0;
	var min = 17;
	for (i=0;i<4;i++)
	{
		//alert("for loop");
		if (dropping[i][1] > max) //标记上界
			{max = dropping[i][1]}
		if (dropping[i][1] < min) //标记下界
			{min = dropping[i][1]}
		//alert("max"+max+"min"+min);
	}
	while (min <= max)//逐行判断消除
	{
		//alert("max"+max+"min"+min);
		//alert(i+"another for loop")
		target1 = 0;
		for (var j = 1; j < 11; j++)
		{
			if (bottom[j][min] == 0) //若有空档
				{
					//alert("min"+min+"j"+j+"bottom"+bottom[j][min]);
					target1++;
					min++;
					break;
				}
		};
		if (target1 == 0) //可以消除
			{
				//alert("Goal!")
				s++; //得分
				if ((s % 5 == 0)&&(s != 0)) 
					{
						r -= 20;
						le += 1;
						document.getElementById("level1").innerHTML= le;
					};
				max--;
				document.getElementById("score1").innerHTML= s
				for (var j = 1; j < 11; j++) //逐列消除
				{
					for (var k = min; k < 17; k++) //每列下移一格，从下到上
					{
						//alert(k+"wipe out")
						bottom[j][k] = bottom[j][k+1];
						show(j,k,bottom[j][k]);
					};
				};

			};
	}
}

function turn(ty) //旋转
{
	if (ty == 0) {
	if ((start1==1)&&(continue1==1)) //游戏已开始且在进行中
	{
		//alert("true");
		var target2 = 0;
        for (var i = 0; i < 4; i++) //检查是否可以旋转
        {
        	var x = dropping[i][1] - dropping[4][1] + dropping[4][0];
        	var y = dropping[4][0] - dropping[i][0] + dropping[4][1];
        	if (bottom[x][y]==0) 
        		{target2++}
        	else 
        		{break}

        	//alert(target2+"target2");
        };
        if (target2==4) 
        {
        	//alert("another if is true");
        	for (var i = 0; i < 4; i++) 
            {   
            	show(dropping[i][0],dropping[i][1],0);
            }
            for (var i = 0; i < 4; i++) 
            {
            	//alert("on screen");
            	var x = dropping[i][1] - dropping[4][1] + dropping[4][0];
        	    var y = dropping[4][0] - dropping[i][0] + dropping[4][1];
        	    dropping[i][0] = x;
            	//alert("x"+x+"y"+y);
            	dropping[i][1] = y;
            	show(dropping[i][0],dropping[i][1],1);
            	//alert("end");
            };
        };

	}
    }
    else
    {
    	//alert("turn in small screen");
    	for (var i = 0; i < 4; i++) 
            {   
            	showx(dropping2[i][0],dropping2[i][1],0);
            }
            for (var i = 0; i < 4; i++) 
            {
            	//alert("on screen");
            	var x = dropping2[i][1] - dropping2[4][1] + dropping2[4][0];
        	    var y = dropping2[4][0] - dropping2[i][0] + dropping2[4][1];
        	    dropping2[i][0] = x;
            	dropping2[i][1] = y;
            	showx(x,y,1);
            	//alert("end");
            };
    }
}

function showx(x,y,type0)
{
	x -= 3;//3
	y -=12;//3
	//alert("x"+x+"y"+y+"showx");
	{
	switch (type0)
	{
		case 0: //无方块
		document.getElementById(trans(x,y)+"a").style.backgroundImage="url(blocka.jpg)";
		//alert("tp1");
		break;

		case 1: //下落方块
		document.getElementById(trans(x,y)+"a").style.backgroundImage="url(blockc.jpg)";
		//alert("#EA7500");
		break;

		case 2: //待消除方块
		document.getElementById(trans(x,y)+"a").style.backgroundImage="url(blockb.jpg)";
		//alert("tp3");
		break;
	}
	};
}

function sscreen()
{
	for (i=4;i<9;i++)
		{
			for(j=13;j<18;j++)
			{
				showx(i,j,0);
			}

		}
	//alert("sscreen");
	dropping2[4][0] = 6; //标记中心坐标
    dropping2[4][1] = 15;
	switcher(type2,2); //根据种类生成方块，不转向
	for (var i = 0; i < direction; i++) //旋转多次后显示
	{
		turn(2);
	}
}



function show(x,y,type0) //更新画面
{
	//alert("show()"+"x"+x+"y"+y+"tp"+type0);
	if (y < 17) 
	{
	switch (type0)
	{
		case 0: //无方块
		document.getElementById(trans(x,y)).style.backgroundImage="url(blocka.jpg)";
		//alert("tp1");
		break;

		case 1: //下落方块
		document.getElementById(trans(x,y)).style.backgroundImage="url(blockc.jpg)";
		//alert("#EA7500");
		break;

		case 2: //待消除方块
		document.getElementById(trans(x,y)).style.backgroundImage="url(blockb.jpg)";
		//alert("tp3");
		break;
	}
	};
}

function trans(y,x) //trans 用来转换坐标
  {
  	//alert("trans()"+"x"+x+"y"+y);
  	//alert(trans2(x) + trans2(y));
    return(trans2(x) + trans2(y));
  }
function trans2(x)
  {
  	//alert("trans2()"+"x"+x);
  	x--; //因为是拷贝其他程序的，所以略蛋疼呢。。。
    switch(x)
      {
        case 0:
        return "a";

        case 1:
        return "b";

        case 2:
        return "c";

        case 3:
        return "d";

        case 4:
        return "e";

        case 5:
        return "f";

        case 6:
        return "g";

        case 7:
        return "h";

        case 8:
        return "i";

        case 9:
        return "j";

        case 10:
        return "k";

        case 11:
        return "l";

        case 12:
        return "m";

        case 13:
        return "n";

        case 14:
        return "o";

        case 15:
        return "p";
      }
  }

function mDown(obj,n)
{
  switch(n)
  {
    case 0:
    obj.style.backgroundImage="url(leftb.jpg)"
    break;

    case 1:
    obj.style.backgroundImage="url(turnb.jpg)"
    break;

    case 2:
    obj.style.backgroundImage="url(rightb.jpg)"
    break;

    case 3:
    obj.style.backgroundImage="url(startb.jpg)"
    break;

    case 4:
    obj.style.backgroundImage="url(pauseb.jpg)"
    break;

    case 5:
    obj.style.backgroundImage="url(downb.jpg)"
    break;

  }
}
function mUp(obj,n)
{
  switch(n)
  {
    case 0:
    obj.style.backgroundImage="url(left.jpg)"
    break;

    case 1:
    obj.style.backgroundImage="url(turn.jpg)"
    break;

    case 2:
    obj.style.backgroundImage="url(right.jpg)"
    break;

    case 3:
    obj.style.backgroundImage="url(start.jpg)"
    break;

    case 4:
    obj.style.backgroundImage="url(pause.jpg)"
    break;

    case 5:
    obj.style.backgroundImage="url(down.jpg)"
    break;

  }
}

alert("loaded successfully")