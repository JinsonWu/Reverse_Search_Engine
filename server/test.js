import * as tf from "@tensorflow/tfjs-node"
import mobilenet from "@tensorflow-models/mobilenet"
import fs from "fs"
import jpeg from "jpeg-js"
import open from "open"
//import {exec} from "child_process"
/*
const tf = require("@tensorflow/tfjs-node-gpu");
const mobilenet = require("@tensorflow-models/mobilenet");
const fs = require("fs");
const jpeg = require("jpeg-js");*/
//////
//RGB Format
const NUMBER_OF_CHANNELS = 3;
//////

// read the image and decode .jpg into pixels
const readImage = path => {
  const read = fs.readFileSync(path)
  const pixels = jpeg.decode(read, true)
  return pixels
}

// make the pixels into arrays
const imageByteArray = (image, num_channels) => {
  const pixels = image.data
  const num_pixels = image.width * image.height;
  const values = new Int32Array(num_pixels * num_channels);
  // np.astype(x, Int32)
  // x = pixels*color_channel

  for (let i = 0; i < num_pixels; i++) {
    for (let channel = 0; channel < num_channels; ++channel) {
      values[i * num_channels + channel] = pixels[i * 4 + channel];
    }
  }
  return values
}

// make the input image into tensors
const image2Input = (image, num_channels) => {
  const values = imageByteArray(image, num_channels)
  const out_shape = [image.height, image.width, num_channels];
  const input = tf.tensor3d(values, out_shape, 'int32');

  return input
}

const loadModel = async path => {
  const mn = await mobilenet.load()
  return mn;
}

const classify = async (path) => {
  // read image and transfer into suitable input
  const image = readImage(path);
  const input = image2Input(image, NUMBER_OF_CHANNELS);

  // load pretrained and classify the image
  const  mn_model = await loadModel();
  const predictions = await mn_model.classify(input);
  
  // output result
  const result = predictions[0].join();
  console.log(result);

  // search the result with google
  open("https://www.google.com/search?q=" + result + "&rlz=1C1NHXL_zh-TWTW762TW762&oq=dog&aqs=chrome..69i57j0i433l2j0i131i433j0i433j69i60l2j69i61.1276j0j9&sourceid=chrome&ie=UTF-8");
  
  // use fs to remove image for avoid data overlapping
  remove_file(path);

  return result;
}

const remove_file = async (path) =>{
  fs.unlinkSync(path);
}


//if (process.argv.length !== 3) throw new Error('incorrect arguments: node script.js <IMAGE_FILE>')

classify("C:/wamp64/www/upload/image.jpg");
//revise to id by images
