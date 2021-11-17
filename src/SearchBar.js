import { useState, useEffect, useContext } from "react";
//import Pet from "./Pet"
import ThemeContext from "./ThemeContext";
import useBreedList from "./useBreedList";
import Results from './Results'

const ANIMALS =["bird", "dog", "reptile","cat", "rabbit"]
const SearchBar = () =>{

const [location, setLocation] = useState("");
const [animal, setAnimal] = useState("")
const [breed, setBreed] = useState("")
const [pets, setPets] = useState([])
const [breeds] = useBreedList(animal);
const [theme, setTheme] = useContext(ThemeContext);

useEffect(() => {
    requestPets();
}, [])

async function requestPets(){
    const res = await fetch(
        `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    console.log(json);

    setPets(json.pets);
}

    return(
        <div className= "search-params">
            <form
            onSubmit={e=>{
            e.preventDefault();
            requestPets();
            }}
            >                
                <lable htmlFor="location">
                    Location
                    <input id="location" 
                    onChange={(e) =>setLocation(e.target.value)}
                    value={location} 
                    placeholder="location"/>
                </lable>
                <lable htmlFor="animal">
                    Animals
                    <select
                    id="animal"
                    value={animal}
                    onChange={e => setAnimal(e.target.value)}
                    onBlur={e => setAnimal(e.target.value)}
                    >
                    <option />
                    {ANIMALS.map((animal)=>(
                            <option value={animal} key={animal}>
                                {animal}
                                </option>
                        ) )
                    }
                </select>
                </lable>

                <lable htmlFor="breed">
                    Breeds
                    <select
                    id="breed"
                    value={breed}
                    onChange={e => setBreed(e.target.value)}
                    onBlur={e => setBreed(e.target.value)}
                    >
                    <option />
                    {breeds.map((breed)=>(
                            <option value={breed} key={breed}>
                                {breed}
                                </option>
                        ) )
                    }
                </select>
                </lable>
                <lable htmlFor="theme">
                    Theme
                    <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    onBlur={(e) => setTheme(e.target.value)}
                    >
                        <option value="darkblue">Dark Blue</option>
                        <option value="peru">Peru</option>
                        <option value="red">Red</option>
                        <option value="lightorange">Light Orange</option>
                    </select>

                </lable>
                <button style={{ backgroundColor: theme }}>Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    )
}

export default SearchBar;