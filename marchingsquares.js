function onClick() 
{

    
    
function bitmap(scale, x_init, y_init, x_fin, y_fin, func, isoval) {
    var expression;
    var evaluated_expr;
    //var x = 0;
    //var y = 0;
    var y_initial = y_init;
    var i = 0;
    //var scale = 1;
    var position = [];
    var parse = math.parser();
    parse.eval(func);
    //var isoval = 100;
    while (x_init < x_fin)
    {
        y_init = y_initial;
        
        while(y_init < y_fin) 
        {
            expression = "f(" + x_init + "," + y_init + ")";
            evaluated_expr = parse.eval(expression);
            if(evaluated_expr < isoval)
            {
                position[i] = [x_init, y_init, 0];
                //console.log(x);
            }
            else if (evaluated_expr > isoval)
            {
                position[i] = [x_init, y_init, 1];
                //console.log(x);
            }
            else if (evaluated_expr == isoval)
            {
                position[i] = [x_init, y_init, 1];
            }
            y_init = y_init + scale;
            i++;
        }
        x_init = x_init + scale;
    }
    
    
    //console.log(x);
    //console.log(position);
    return position;
}

function draw_bitmap(position, x_init, y_init, context, grid_size, context_height) {
    //var row = 0;
    //var col = 0;
    
    var x;
    var y;
    for (var row = 0; row < position.length; row++)
    {
        x = grid_size * position[row][0]+50; //- (grid_size * x_init);
        y = context_height - 4 - (grid_size * position[row][1]);//+ (grid_size * y_init);
        /*console.log(x);
        console.log(y);*/
        /*if(position[row][0] == 0 || position[row][1] == 0)
        {
            
            context.fillStyle = "#0000FF";
            context.fillRect(x, y, 5, 5);
        }*/
        /*if (row == 0 || row == 1 || row == 11 || row == 10)
        {
            context.fillRect(x, y, 3, 3);
            context.fillStyle = "#000000";
        }*/
        if (position[row][2] == 1)
        {
            //x = x + 150;
            context.fillStyle = "#FF0000";
            context.fillRect(x, y, 3, 3);
            
            //console.log("test");
        }
        else if (position[row][2] == 0)
        {
            //x = x + 150;
            context.fillStyle = "#00FF00";
            context.fillRect(x,y, 3, 3);
            
        }
    }
    
}

function assign_curvature(position, scale, x_init, y_init, x_final, y_final) {
    //var x_dots = (x_final - x_init + 1)/scale;
    var y_dots = math.floor((y_final - y_init)/scale);
    //console.log(math.floor(y_dots));
    var box_val;
    for (var x = 0; x < position.length - y_dots - 2; x++)
    {
        if((x+1)%y_dots == 0)
        {
            x = x+1;
        }
        
        /*if (x > (position.length - math.floor(y_dots) - 2))
        {
            
        }*/
        
            box_val = 8*(position[x + 1][2]) + 4*(position[x + 1 + y_dots][2]) + 2*(position[x + y_dots][2]) + (position[x][2]);
            /*console.log(box_val);
            console.log(x);
            console.log(position[x+1]);*/
            position[x+1][3] = box_val;
            //console.log(position[x+1][3]);
        
        
        
    }
    return position;
}




function draw_curvature(position, x_init, y_init, x_fin, y_fin, scale, context, grid_size, context_height, isoval, func) {
    function midpt(initial, final)
    {
        return ((final+initial)/2);
    }
    var x;
    var y;
    //var x_dots = (x_fin - x_init + 1)/scale;
    var y_dots = (y_fin - y_init)/scale;
    var grid_scale = grid_size * scale;
    
    /*function y_lin(x, y, isoval, scale, func){
        var parser = math.parser();
        parser.eval(func); 
        var val_b = parser.eval("f(" + x + "," + y + ")");
        var val_d = parser.eval("f(" + x + "," + y+scale + ")");
        var y_calc = y + (scale)((isoval - val_b)/(val_d - val_b));
        return y_calc;
    }
    function x_lin(x, y, isoval, scale, func)
    {
        var parser2 = math.parser();
        parser2.eval(func);
        var val_c = parser2.eval("f(" + x + "," + y + ")");
        var val_d = parser2.eval("f(" + x+scale + "," + y + ")");
        var x_calc = x + (scale)((isoval - val_c)/(val_d - val_c));
        return x_calc; 
    }
    function scrn_x(x, grid_size)
    {
        grid_size * position[i][0] - (grid_size * x_init) +50;
    }*/
    for(var i = 0; i < position.length; i++)
    {
        if (position[i][0] > (x_fin-scale) || position[i][1] == y_init)
        {
            
        }
        else
        {
        x = grid_size * position[i][0] - (grid_size * x_init) +50; 
        y = context_height - 4 - (grid_size * position[i][1]) + (grid_size * y_init);
        //y_lin = 
        
        //debug
        //console.log(y);
        switch(position[i][3]) {
            case 1:
                context.beginPath();
                context.fillStyle = "#FFFFFF";
                
                context.moveTo(x, midpt(y,y+grid_scale));
                context.lineTo(midpt(x,x+grid_scale),y+grid_scale)
                context.stroke();
                break;
            case 8:
                //console.log("success");
                context.beginPath();
                context.fillStyle = "#FFFFFF";
                //context.fillRect(x, y, 10, 10);
                context.moveTo(midpt(x,x+grid_scale), y);
                context.lineTo(x, midpt(y, y+grid_scale));
                context.stroke();
                break;
            case 3: case 12:
                context.beginPath();
                context.fillStyle = "#FFFFFF";
                context.moveTo(x,midpt(y,y+grid_scale));
                context.lineTo(x+grid_scale, midpt(y, y+grid_scale));
                context.stroke();
                break;
            case 6: case 9:
                context.beginPath();
                context.fillStyle = "#FFFFFF";
                context.moveTo(midpt(x,x+grid_scale),y);
                context.lineTo(midpt(x,x+grid_scale),y+grid_scale);
                context.stroke();
                break;
            case 11:
                context.beginPath();
                context.fillStyle = "#FFFFFF";
                context.moveTo(midpt(x,x+grid_scale),y);
                context.lineTo(x+grid_scale,midpt(y,y+grid_scale));
                context.stroke();
                break;
            case 14:
                context.beginPath();
                context.fillStyle = "#FFFFFF";
                context.moveTo(x,midpt(y,y+grid_scale));
                context.lineTo(midpt(x,x+grid_scale),y+grid_scale);
                context.stroke();
                break;
            case 4:
                context.beginPath();
                context.fillStyle = "#FFFFFF";
                context.moveTo(midpt(x,x+grid_scale),y);
                context.lineTo(x+grid_scale,midpt(y,y+grid_scale));
                context.stroke();
                break;
            default:
                //console.log("test");
                break;
        }
        
    }
    }
}



var x_init = 0;
var y_init = 0;
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var context_height = canvas.height;
var form = document.forms[0];
var func = "f(x,y) = " + form.elements["func"].value;
var isoval = form.elements["isoval"].value;
var x_fin = parseFloat(form.elements["x_fin"].value) ;

var y_fin = parseFloat(form.elements["y_fin"].value);
var multiplier = parseFloat(form.elements["multiplier"].value);
var grid_size;
var scale = .125 / multiplier;

if(y_fin >= x_fin)
{
    
    grid_size = math.floor((context_height)/y_fin);
    
    
}
else if (x_fin > y_fin)
{
    
    grid_size = math.floor((context_height)/x_fin)
    
}

console.log("right before function start:")
console.log(scale);

//console.log(func);
var bitmap = bitmap(scale, x_init, y_init, x_fin, y_fin, func, isoval);




//draw_bitmap(bitmap, x_init, y_init, context, grid_size, context_height);

draw_curvature(assign_curvature(bitmap, scale, x_init, y_init, x_fin, y_fin), x_init, y_init, x_fin, y_fin, scale, context, grid_size, context_height, isoval, func);
//console.log("end debug");
}

function onClick2(width, height){
    function reset(canW, canH) {
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        context.clearRect(0,0,canW,canH);
    }
    
    reset(width,height);
}
