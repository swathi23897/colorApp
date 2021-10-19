import React, { useEffect, useState ,useRef} from 'react'
import './App.css'
var ColorThief=require('color-thief')

export function Grid({id, src}){
const [hexvalue,setHexvalue]=useState("")
const canvasRef = useRef(null)
var rgbToHex = function (rgb) { 
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
  };
   useEffect(async ()=>{
      var img = new Image();
     img.onload = function () {
       var colorThief = new ColorThief();
       let rgb=colorThief.getColor(img)
       let hex="#"+rgbToHex(rgb[0])+rgbToHex(rgb[1])+rgbToHex(rgb[2])
       console.log(hex)
       setHexvalue(hex)
       
     };
     img.crossOrigin = '';
     img.src =  src;
   },[id])


 return (
        <>
  {hexvalue.length>0 &&
    <div className="grid-item" style={{backgroundColor:hexvalue,border:'1px solid white'}}>
      {hexvalue}
      </div>
        
     }
    </>
        
    )
}