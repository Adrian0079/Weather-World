import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Box, Container, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

const API_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&lang=es&q=`;

// console.log(import.meta.env.VITE_API_KEY);

function App() {

  const[city, setCity] = useState("");
  const[loadB, setLoadB]=useState(false);
  const [error, setError] =useState({
    error: false,
    message: "",
  });

  const [weatherT, setWeatherT] = useState({
    city: "",
    country: "",
    temp: "",
    condition: "",
    icon: "",
    conditionText: "",
  });

  const onSubmitF = async(e)=>{
    e.preventDefault();
    console.log("submit");
    setLoadB(true);

    setError({
      error: false,
      message: "",
    })

    try{
      if(!city.trim()) throw { message: "The city field is required" }
      const response = await fetch (`${API_WEATHER}${city}`)
      const data = await response.json();

      if (data.error) throw { message: data.error.message };

      setWeatherT({
        city: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.code,
        icon: data.current.condition.icon,
        conditionText: data.current.condition.text,
      })

      console.log(data);
    }
    catch (error){
      console.log(error)
      setError({
        error: true,
        message: error.message ,
      })

    } 
    finally{
      setLoadB(false);
    }
  }

  return (
    <Container
    maxWidth="xs"
    sx={{mt: 2}}
    >
      <Typography
      variant='h3'
      component='h1'
      align='center'
      gutterBottom
      >
        Weather World
      </Typography>
      <Box
      sx={{display: "grid", gap: 2}}
      component="form"
      autoComplete="off"
      onSubmit={onSubmitF}
      >
      
      <TextField 
      id="city"
      label="City"
      variant='outlined'
      size="small"
      required
      fullWidth
      value={city}
      onChange={(e) => setCity(e.target.value)}
      error={error.error}
      helperText={error.message}
      />

      <LoadingButton
      type="submit"
      variant='contained'
      loading={loadB}
      loadingIndicator="Loading..."
      >
        Search
      </LoadingButton>
      </Box>

      {weatherT.city && (
        <Box sx={{mt:2, display: "grid", gap: 2, textAlign:"center"}}>
          
          <Typography variant='h4' component="h2">
              {weatherT.city}, {weatherT.country}
          </Typography>
          <Box
            component="img"
            alt={weatherT.conditionText}
            src={weatherT.icon}
            sx={{margin: "0 auto"}}
          />
            <Typography variant='h5' component="h3">
              {weatherT.temp} °C
            </Typography>
            <Typography variant='h6' component="h4">
              {weatherT.conditionText} °C
            </Typography>
          </Box>
      )}

      <Typography
        textAlign="center"
        sx={{ mt: 2, fontSize: "10px" }}
        >
        Powered by:{" "}
        <a
        href='https://www.weatherapi.com/'
        title='Weather API'
        >
          WeatherAPI.com
        </a>
      </Typography>
    </Container>
  )
}

export default App
