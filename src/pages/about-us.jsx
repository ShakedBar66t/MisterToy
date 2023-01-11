import GoogleMap from "../cmps/google-map";
import Login from "../cmps/login";
import { MyChart } from "../cmps/my-chartA";
import { MyForm } from "../cmps/my-form";

export function AboutUs(){
    return (
        <section className="about-container">
            <h2>About us</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At obcaecati labore sed saepe, modi commodi expedita non suscipit vero tenetur?</p>
            {/* <h1>Google Map</h1> */}
            <GoogleMap/>
            {/* <MyForm/> */}
            {/* <MyChart/> */}
            {/* <Login /> */}
        </section>
    )
}