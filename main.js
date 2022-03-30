function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);
    canvas = createCanvas(550, 550);
    canvas.position(560, 150);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    background("#969A97");

    document.getElementById("square_side").innerHTML = "Width and height of the square = " + difference + "px";
    fill("#F90093");
    stroke("#F90093");
    square(noseX, noseY, difference);
}

function modelLoaded() {
    console.log("PoseNet is initialized");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("NoseX = " + noseX + ", NoseY = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        console.log("Left Wrist X = " + leftWristX + ", Right Wrist X = " + rightWristX);

        difference = floor(leftWristX - rightWristX);
    }
}