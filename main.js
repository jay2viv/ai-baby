objects = [];
Status = "";

function setup()
{
    canvas = createCanvas( 850, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(850, 500);
    cocossd = ml5.objectDetector("cocossd", modelready);
    document.getElementById("status").innerHTML = " status: detecting object "
}

function modelready()
{
    console.log("model is ready");
    Status = true;
}

function gotresults(error, results)
{
    if (error) 
    {
        console.log("error");
    }

    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0, 0, 850, 500);
    noFill();
    stroke("blue");
    if (Status != "") 
    {
        cocossd.detect(video, gotresults);
        for(i = 0; i < objects.length; i++)
        { 
            percent = Math.floor(objects[i].confidence * 100)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            text(objects[i].label + " "+ percent +" %", objects[i].x + 20, objects[i].y + 20);
            
            if ( objects[i].label == "person") 
            {
                document.getElementById("status").innerHTML = "Status Baby detected";
                alarm.stop();
            }

            else
            {
                document.getElementById("status").innerHTML = "Status baby not detected";
                alarm.play();
            }
        }
    
        if (objects.length == 0) 
        {
            document.getElementById("status").innerHTML = "Status baby not detected";
            alarm.play();
        }
    
    }
}

function preload()
{
    
    alarm = loadSound("alarm.mp3");

}