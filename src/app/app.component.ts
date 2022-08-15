import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import data from '../assets/data/products.json';

export type City = {
  temp_celcius:string;
  temp_min:string;
  temp_max:string;
  temp_feels_like:string;
  name:string;
  humidity:number
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  WeatherData:any;
  arabCapitals = []
  europeanCapitals = []
  arabCities = ['Riyadh','Amman','Tripoli','Kuwait City','Cairo','Rabat','Doha',"Sanaa",'Abu Dhabi','Manama','Tunis','Khartoum','Muscat','Damascus','Algiers','Baghdad','Djibouti','Nouakchott','Mogadishu','Beirut']
  europeanCities = ['Berlin','Oslo','Stockholm','London','Rome','Dublin','Helsinki',"Madrid",'Amsterdam','Bucharest','Bratislava','Riga','Athens','Warsaw','Tirana','Minsk','Vienna','Tallinn','Luxembourg','Podgorica']

  productList: Product[] = new Array<Product>();
  jsonData = data as Array<any>;
  direction = "";

  public isCollapsed = false;

  isNavCollapse = false;
  @HostListener('window:scroll', []) onScroll() {
    if (this.scroll.getScrollPosition()[1] > 70) {
      this.isNavCollapse = true;
    } else {
      this.isNavCollapse = false;
    }
  }

  constructor(private scroll: ViewportScroller) { 
    type city = {
      name: string;
      age: number;
    };
  }

  ngOnInit() {
    
    for (let i = 0; i < 9; i++) {
      let product = new Product(this.jsonData[i]);
      this.productList.push(product);
    }

    this.WeatherData = {
      main : {},
      isDay: true
    };
    
  




    for (let i = 0; i < this.arabCities.length; i++) {
      this.getWeatherData(this.arabCities[i]);
      this.getWeatherData(this.europeanCities[i]);
    }

    console.log(this.WeatherData);
  }

  
  getWeatherData(city:string){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=ff1bc4683fc7325e9c57e586c20cc03e')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})

    // let data = JSON.parse('{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":297.15,"feels_like":297.4,"temp_min":297.15,"temp_max":297.15,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":3.6,"deg":300},"clouds":{"all":20},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}');
    // this.setWeatherData(data);
  }
  

  setWeatherData(data){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    
    let city =  {} as City;
    city.temp_celcius = this.WeatherData.temp_celcius;
    city.temp_min = this.WeatherData.temp_min;
    city.temp_max = this.WeatherData.temp_max;
    city.temp_feels_like = this.WeatherData.temp_feels_like;
    city.name = this.WeatherData.name;
    city.humidity = this.WeatherData.main.humidity;

   
    if(this.arabCities.includes(city.name)){
      this.arabCapitals.push(city);
      console.log("Arab City :"+city.name)
    }else{
      this.europeanCapitals.push(city)
      console.log("European City :"+city.name)
    }
  
   
    
    
  }





  onWheel(event: WheelEvent): void {
    if (event.deltaY > 0) this.scrollToRight();
    else this.scrollToLeft();
  }

  scrollToLeft(): void {
    document.getElementById('scroll-1').scrollLeft -= 400;
  }

  scrollToRight(): void {
    document.getElementById('scroll-1')!.scrollLeft += 400;
  }
}

class Product {
  title: string;
  type: string;
  description: string;
  price: number;
  rating: number;
  image: string;

  constructor(product: any = {}) {
    this.title = product.title;
    this.type = product.type;
    this.description = product.description;
    this.price = product.price;
    this.rating = product.rating;
    this.image = 'https://alcodesbase.blob.core.windows.net/generic/sections-default-image.png';
  }
}





