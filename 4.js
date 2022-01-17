status = "";
objects = [];

function preload()
{
    img = loadImage('4.jpg');
}

function setup()
{
    canvas = createCanvas(550, 500);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function modelLoaded()
{
    console.log("Model is Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error , results)
{
    image(img, 0, 0, 550, 500);
    if (error) 
    {
        console.error(error);    
    }
    else
    {
    console.log(results);
    objects = results;
    }
}
function draw()
{
    if (status != "") 
    {
        for (i = 0; i < objects.length; i++) 
        {
            document.getElementById("status").innerHTML = "Status : Object Detected!";
            document.getElementById("number_of_objects").innerHTML = "Number of obejcts : " + objects.length;
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y);
            noFill();
            stroke("#000000");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}