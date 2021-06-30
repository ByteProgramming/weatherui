import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from 'src/app/service/weather.service';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { pincodeList } from 'src/app/pincodeList';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  @Input() name: string;

  data = {};
  form: FormGroup;
  submitted : boolean = false;
  isRefresh : boolean = false;
  isRainy : boolean  = false;
  weatherIcon : Number;
  pincodeList: string[] = pincodeList;
  suggestions: string[] = [];

  constructor(private weatherService : WeatherService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      pincode: [],
      isRefresh : []
     });
     this.isRefresh = false;
     this.isRainy = false;
     this.data = {};
     this.submitted=false;
     this.weatherIcon = 0;

  }

  get fc() { return this.form.controls; }

  ongetData(){
    this.weatherService.getInfo().subscribe((data: any[])=>{  
      this.data = data;
      console.log(data);  
     });
}
    onEnter(pincode : Number){
       // const pincode = this.form.controls.pincode.value;
       if(!pincode){
         alert("select pincode please");
         return;
       }
       this.submitted = false;
       this.suggestions=[];
       this.weatherIcon = 0;
        this.weatherService.getWeatherInfo(pincode).subscribe((data: any[])=>{  
          this.data = data;
          this.submitted = true;
          this.weatherIcon = data['weatherIcon'];
          console.log(this.weatherIcon);  
        });
  }

  onRefresh() {  
    this.isRefresh = this.form.controls.isRefresh.value;
    if(this.isRefresh){
    setInterval(() => {         
      
      console.log("refresh"); 
      const pincode = this.form.controls.pincode.value;
      
      this.weatherService.getWeatherInfo(pincode).subscribe((data: any[])=>{  
        this.data = data;
        console.log(data);  
      });
    }, 5000);
  
   }
  } 

  suggest() {
    this.suggestions=[];
    const pincode = this.form.controls.pincode.value;
    this.suggestions = this.pincodeList
      .filter(c => c.startsWith(pincode));
  }

}
