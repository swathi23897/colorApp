import './App.css';
import { useState } from 'react';
import { Grid } from './Grid';
import { Input, Button, Form } from 'reactstrap';
import axios from 'axios'
import { Alert } from 'reactstrap';
const api_key = "17208353-c27a8b5f1555717e2ad137964"

function App() {

  const [images, setImages] = useState([])
  const [query, setQuery] = useState()
  const [view, setView] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alert, setAlert] = useState({})

  const getImages = async () => {
    if (query.length > 0) {
      const url = `https://pixabay.com/api/?key=${api_key}&q=${query}&image_type=photo`
      axios.get(url).then(response => {
        if (response.data.hits.length > 0) {
          let urls = response.data.hits.slice(0, 16)
          console.log(urls);
          setImages(urls)
          setShowAlert(false)
        }
        else {
          let obj = { message: "No results to display", variant: "info" }
          setAlert(obj)
          setShowAlert(true)

        }
      }).catch(err => handleAlert(`${err}. Please refresh & try again later`, "danger"))
    }
  }


  const handleAlert = ((message, variant) => {
    let obj = { message: message, variant: variant }
    setAlert(obj)
    setShowAlert(true)

  })

  const onSubmitHandler = () => {
    setImages([])
    setView(false)
    setShowAlert(false)
    setAlert({})
    getImages()
  }


  const onChangeHandler = (event) => {
    console.log(event.target.value);
    setQuery(event.target.value)
  }


  return (
    <div className="App">
      <h1>Color A Word</h1>
      <div className="maindiv" >
        <Input type="text" onChange={onChangeHandler} placeholder="Enter a word to get colors realated to it  . . ." />
        <div>
          <Button style={{ backgroundColor: "cornflowerblue", border: "none" }} onClick={onSubmitHandler}>Submit</Button>
          <Button style={{ backgroundColor: "cornflowerblue", border: "none" }} onClick={() => setView(true)}>View images</Button>
        </div>
      </div>
      {showAlert ?
        <Alert color={alert.variant}>
          {alert.message}
        </Alert>
        :
        <>
          <div className="grid-layout">
            {images.length > 0 && images.map((value, index) => (
              <Grid id={index} src={value.previewURL} />
            ))}
          </div>
          <div className="imagesdiv ">
            {view && images.length > 0 && images.map(value => (
              <img src={value.previewURL} />
            ))}
          </div>
        </>
      }
    </div>

  );

}

export default App;


