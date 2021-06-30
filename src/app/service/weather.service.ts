import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private serviceUrl = environment.weatherserviceurl + "/pincode";
  //private serviceUrl = "http://dataservice.accuweather.com/currentconditions/v1/560066?apikey=soBCKvJmo1WgDcwMHzH6dPCu2aihXBiz";
  basicHeaders = new HttpHeaders()
                 .set('Content-Type', 'application/json;charset=UTF-8')
                 .set("Access-Control-Allow-Origin", "*")
                 .set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
                 .set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  constructor(private httpClient: HttpClient) { }

  getWeatherInfo(pincode: Number) {
    const requestparams = new HttpParams()
      .set('pincode', String(pincode))
    return this.httpClient.get(this.serviceUrl, { headers: this.basicHeaders, params: requestparams, responseType: 'json' });
  }

  getInfo() {
    return this.httpClient.get(this.serviceUrl, { headers: this.basicHeaders,responseType: 'json' });
  }
}
